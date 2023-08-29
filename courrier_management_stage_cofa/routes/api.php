<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'authUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //TODO
    Route::post('/change/password', [AuthController::class, 'changePassword']);

    Route::get('/find/{search}', [UsersController::class, 'searchAgent']);
    Route::get('/findByUsername/{username}', [UsersController::class, 'searchUserByUsername']);
});

Route::get('/sendOtp/{phone}', [AuthController::class, 'sendOtp']);

Route::post('/login', [AuthController::class, 'login']);
