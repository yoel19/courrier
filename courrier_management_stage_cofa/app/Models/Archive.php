<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Archive
 *
 * @property int $id
 * @property string $added_by_user_id
 * @property string $updated_by_user_id
 * @property string $label
 * @property string $reason
 * @property string|null $sender
 * @property string|null $receiver
 * @property string|null $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Archive newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Archive newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Archive query()
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereAddedByUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereReceiver($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereSender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereUpdatedByUserId($value)
 * @property string $added_by_username
 * @property string $updated_by_username
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereAddedByUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Archive whereUpdatedByUsername($value)
 * @mixin \Eloquent
 */
class Archive extends Model
{
    use HasFactory;
}
