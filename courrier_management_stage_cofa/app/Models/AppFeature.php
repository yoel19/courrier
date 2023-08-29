<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AppFeature
 *
 * @property int $id
 * @property string $label
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppFeature whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AppFeature extends Model
{
    use HasFactory;
}
