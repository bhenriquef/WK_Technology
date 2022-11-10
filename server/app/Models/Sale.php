<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Eloquent as Model;
use Carbon\Carbon;

class Sale extends Model
{
    public $table = 'sales';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sale_date',
        'total_price',
        'client_id',
    ];

    protected $casts = [
        'id' => 'integer',
        'sale_date' => 'datetime',
        'total_price' => 'float',
        'client_id' => 'integer',
    ];


    public static $rules = [
        'sale_date' => 'required',
        'total_price' => 'required',
        'client_id' => 'required',
    ];

    /**
     * The accessors to append to the model's array form
     *
     * @var array
     */
    protected $appends = [
        'readable_created_at',
        'readable_updated_at',
        'readable_sale_date',
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

    public function getReadableSaleDateAttribute()
    {
        return is_null($this->sale_date)? null : Carbon::parse($this->sale_date)->format('d/m/Y H:i');
    }

}
