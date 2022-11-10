<?php

namespace App\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    // use Response;

    private $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function all()
    {
        $data = $this->productRepository->all();

        return $data;
    }

    public function store(){
        $data = request('data');
        
        try{
            $data = $this->productRepository->create($data);
        } catch(\Exception $e){
            return ['response' => 401, 'message' => 'Erro ao cadastrar produto'];
        }

        return ['response' => 200, 'message' => 'Produto cadastrado com sucesso', 'data' => $data];
    }
}
