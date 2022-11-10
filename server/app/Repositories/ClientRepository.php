<?php

namespace App\Repositories;

use App\Models\Client;

/**
 * Class CompanyRepository
 * @package App\Repositories
 * @version February 6, 2020, 2:53 pm UTC
*/

class ClientRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
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

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Client::class;
    }
}
