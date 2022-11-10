<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Eloquent as Model;
use Carbon\Carbon;

class Product extends Model
{
    public $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'price',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'price' => 'float',
    ];


    public static $rules = [
        'id' => 'required',
        'name' => 'required',
        'price' => 'required',
    ];

    /**
     * The accessors to append to the model's array form
     *
     * @var array
     */
    protected $appends = [
        'readable_created_at',
        'readable_updated_at',
    ];

        /**
     * Get created_at formatted as d/m/Y
     *
     * @return string
     */
    public function getReadableCreatedAtAttribute()
    {
        return is_null($this->created_at)? null : Carbon::parse($this->created_at)->format('d/m/Y');
    }
    
    /**
     * Get updated_at formatted as d/m/Y
     *
     * @return string
     */
    public function getReadableUpdatedAtAttribute()
    {
        return is_null($this->updated_at)? null : Carbon::parse($this->updated_at)->format('d/m/Y');
    }

}
