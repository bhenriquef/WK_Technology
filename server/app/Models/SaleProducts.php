<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Eloquent as Model;
use Carbon\Carbon;

class SaleProducts extends Model
{
    public $table = 'sale_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_id',
        'sale_id',
        'quantity',
    ];

    protected $casts = [
        'id' => 'integer',
        'product_id' => 'integer',
        'sale_id' => 'integer',
        'quantity' => 'float',
    ];


    public static $rules = [
        'product_id' => 'required',
        'sale_id' => 'required',
        'quantity' => 'required',
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
