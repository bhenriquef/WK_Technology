<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Eloquent as Model;
use Carbon\Carbon;

class Client extends Model
{
    public $table = 'clients';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'cpf',
        'cep',
        'street',
        'district',
        'complement',
        'number',
        'city',
        'birthday',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'email' => 'string',
        'cpf' => 'string',
        'cep' => 'string',
        'street' => 'string',
        'district' => 'string',
        'complement' => 'string',
        'number' => 'string',
        'city' => 'string',
        'birthday' => 'datetime',
    ];


    public static $rules = [
        'name' => 'required',
        'email' => 'required',
        'cpf' => 'required',
        'cep' => 'required',
        'street' => 'required',
        'district' => 'required',
        'complement' => 'required',
        'number' => 'required',
        'city' => 'required',
        'birthday' => 'required',
    ];

    /**
     * The accessors to append to the model's array form
     *
     * @var array
     */
    protected $appends = [
        'readable_created_at',
        'readable_updated_at',
        'readable_birthday',
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

    public function getReadableBirthdayAttribute()
    {
        return is_null($this->birthday)? null : Carbon::parse($this->birthday)->format('d/m/Y');
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
