<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

/**
 * @mixin User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray(Request $request): array|JsonSerializable|Arrayable
    {
        $roleNames = $this->enabledRoleRefs();

        return [
            'username' => $this->username,
            'name' => $this->name,
            'gender' => $this->gender,
            'job_title' => $this->job_title,
            'birth_date' => $this->birth_date,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'search_slug' => $this->search_slug,
            'last_connection' => $this->last_connection,
            'disabled_at' => $this->disabled_at,
            'roles' => ProfileWithPivotResource::collection($this->enabledRoles->all()),
            'role_names' => $roleNames,
        ];
    }
}
