<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiHttpResponses
{
    /**
     * success response method.
     *
     * @param $result
     * @param string|null $message
     * @param int $code
     * @return JsonResponse
     */
    protected function sendResponse($result, ?string $message = 'Successfully', int $code = 200): JsonResponse
    {
        return response()->json(
            [
                'success' => true,
                'message' => $message,
                'data' => $result,
            ], $code);
    }

    /**
     * return error response.
     *
     * @param $error
     * @param array $errorMessages
     * @param int $code
     * @return JsonResponse
     */
    protected function sendError($error, array $errorMessages = [], int $code = 404): JsonResponse
    {
        return response()->json(
            [
                'success' => false,
                'message' => $error,
                'data' => $errorMessages,
            ], $code);
    }
}
