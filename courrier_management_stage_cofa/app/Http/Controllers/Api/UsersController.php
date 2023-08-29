<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiHttpResponses;
use Illuminate\Http\JsonResponse;
use Throwable;

class UsersController extends Controller
{
    use ApiHttpResponses;

    public function searchUserByUsername($username): JsonResponse
    {
        try {
            $agent = User::whereUsername($username)->first();
            if ($agent === null) {
                return $this->sendError('User not found');
            }

            return $this->sendResponse(new UserResource($agent));
        } catch (Throwable $e) {
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

    /**
     * @param $search
     * @return JsonResponse
     */
    public function searchAgent($search): JsonResponse
    {
        try {
            $agents = User::where('search_slug', 'LIKE', '%' . $search . '%')->get();

            return $this->sendResponse(UserResource::collection($agents));
        } catch (Throwable $e) {
            return $this->sendError($e->getMessage(), [], 500);
        }
    }
}
