<?php

namespace App\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\SaleRepository;
use Illuminate\Support\Facades\Response;
use App\Models\SaleProducts;
use App\Models\Sale;

class SaleController extends Controller
{
    // use Response;

    private $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function all()
    {
        $data = Sale::selectRaw('sales.*, clients.name as client_name')
            ->leftJoin('clients', 'sales.client_id', '=', 'clients.id')
            ->get()->toArray();

        return $data;
    }

    public function store(){
        $data = request('data');
        $products = $data['products'];
        $data['sale']['total_price'] = $data['total'];
        
        try{
            $data = $this->saleRepository->create($data['sale']);

            foreach($products as $index => $value){
                
                SaleProducts::create([
                    'sale_id' => $data->id,
                    'product_id' => $value['id'],
                    'quantity' => $value['quantity'],
                ]);
            }
        } catch(\Exception $e){
            return ['response' => 401, 'message' => 'Erro ao cadastrar venda'];
        }

        return ['response' => 200, 'message' => 'Venda cadastrada com sucesso', 'data' => $data];
    }
}
