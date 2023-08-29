<?php

namespace App\Http\Resources;

use App\Models\Profile;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

/**
 * @mixin Profile
 *
 */
class ProfileWithPivotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray(Request $request): array|JsonSerializable|Arrayable
    {
        return [
            'ref' => $this->ref,
            'name' => $this->name,
            'description' => $this->description,

            'assign_by' => $this->pivot->assign_by,
            'update_by' => $this->pivot->update_by,

            'start_at' => $this->pivot->start_at,
            'end_at' => $this->pivot->end_at,
            'disabled_at' => $this->pivot->disabled_at,
        ];
    }
}
