<?php

namespace App\Http\Controllers\Api;

use App\Helpers\AppHelper;
use App\Helpers\PhoneHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiHttpResponses;
use DB;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Throwable;

class AuthController extends Controller
{
    use ApiHttpResponses;

    public function changePassword(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();

            $newPassword = $request->input('new-password');
            $oldPassword = $request->input('old-password');

            if (empty($newPassword) || empty($oldPassword)) {
                return $this->sendError("Données invalides", [], 403);
            }

            if (Hash::make($oldPassword) === $user->password) {
                $user->password = Hash::make($newPassword);
                $user->save();

                return $this->sendResponse(new UserResource($user->refresh()));
            }

            return $this->sendError("Ancien mot de passe incorrect", [], 403);
        } catch (Exception $e) {
            return $this->sendError('AuthController:changePasswordException:' . $e->getMessage());
        }
    }

    /**
     * @param $username
     * @return JsonResponse
     * @throws Throwable
     */
    public function sendOtp($username): JsonResponse
    {
        try {
            DB::beginTransaction();
            $user = User::firstWhere('username', $username);
            if ($user == null) {
                return $this->sendError('Matricule incorrect.');
            }
            $user->otp = AppHelper::generatePin();
            $user->save();

            $isOtpSent = PhoneHelper::sendSms('OTP', $user->phone, "Le Code de confirmation " . config('sms.from') . " est: " . $user->otp . ". Ne partagez ce code avec personne.", config('sms.from'));
            if (!$isOtpSent) {
                DB::rollBack();
                return $this->sendError('SMS not sent', [], 412);
            }

            DB::commit();

            $data = config('sms.sms_prod') ? ['phone' => $user->phone] : ['phone' => $user->phone, 'otp' => $user->otp];
            return $this->sendResponse($data, 'Otp was sent successfully ');
        } catch (Exception|Throwable $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

    private function logUserWithOtp(User $user): JsonResponse
    {
        //Avoid using same OTP to connect multiple times.
        /*$user->otp = null;
        $user->save();
        $user->tokens()->delete();
        */

        $token = $user->createToken(
            'auth_token for ' . $user->username
            , $user->enabledRoleRefs()
        )->plainTextToken;

        return $this->sendResponse([
            'token' => $token, 'type' => 'Bearer'
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        //Login with Phone & OTP
        if ($request->has('phone') && $request->has('otp')) {
            $user = User::firstWhere('phone', $request['phone']);

            if ($user == null) {
                return $this->sendError('Numéro de Téléphone invalide.');
            }
            if ($user->otp == $request->input('otp')) {
                return $this->logUserWithOtp($user);
            } else {
                return $this->sendError('Code OTP invalide.', [], 401);
            }
        }

        //Login with AgentId & OTP
        if ($request->has('username') && $request->has('otp')) {
            $user = User::firstWhere('username', $request['username']);

            if ($user == null) {
                return $this->sendError('Nom d\'utilisateur  invalide.');
            }
            if ($user->otp == $request->input('otp')) {
                return $this->logUserWithOtp($user);
            } else {
                return $this->sendError('Code OTP invalide.', [], 401);
            }
        }

        //Login with Email & Password
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::firstWhere('email', $request['email']);

            if ($user == null) {
                return $this->sendError('Email invalide.');
            }

            $token = $user->createToken(
                'auth_token for ' . $user->username
                , $user->enabledRoleRefs()
            )->plainTextToken;

            return $this->sendResponse([
                'token' => $token, 'type' => 'Bearer'
            ]);
        }

        //Login with Username & Password
        if (Auth::attempt($request->only('username', 'password'))) {
            $user = User::firstWhere('username', $request['username']);

            if ($user == null) {
                return $this->sendError('Email invalide.');
            }

            $token = $user->createToken(
                'auth_token for ' . $user->username
                , $user->enabledRoleRefs()
            )->plainTextToken;

            return $this->sendResponse([
                'token' => $token, 'type' => 'Bearer'
            ]);
        }

        return $this->sendError('Identifiants invalides.', [], 401);
    }

    public function authUser(): JsonResponse
    {
        try {
            $user = Auth::user();

            if ($user === null) {
                return $this->sendError('Utilisateur non authentifié', [], 401);
            }

            return $this->sendResponse(new UserResource(Auth::user()));
        } catch (Exception $e) {
            return $this->sendError('authUserException:' . $e->getMessage());
        }
    }

    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        try {
            if (Auth::user() == null) {
                return $this->sendError('User not found');
            }
            //Auth::user()->tokens()->delete();
            return $this->sendResponse(true, 'You have successfully logged out and the token was successfully deleted');

        } catch (Exception $e) {
            return $this->sendError('LogoutException:' . $e->getMessage());
        }
    }
}
