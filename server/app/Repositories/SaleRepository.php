<?php

namespace App\Repositories;

use App\Models\Sale;

/**
 * Class CompanyRepository
 * @package App\Repositories
 * @version February 6, 2020, 2:53 pm UTC
*/

class SaleRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'sale_date',
        'total_price',
        'client_id',
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
        return Sale::class;
    }
}
