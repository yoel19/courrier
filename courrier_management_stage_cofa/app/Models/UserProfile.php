<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserProfile
 *
 * @property int $id
 * @property int $user_id
 * @property string $profile_ref
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereProfileRef($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUserId($value)
 * @property string $username
 * @property string $start_at
 * @property string|null $end_at
 * @property string|null $assign_by
 * @property string|null $update_by
 * @property string|null $disabled_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereAssignBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereDisabledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereEndAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereStartAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUpdateBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUsername($value)
 * @mixin \Eloquent
 */
class UserProfile extends Model
{
    use HasFactory;
}
