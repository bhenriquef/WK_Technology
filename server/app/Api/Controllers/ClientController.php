<?php

namespace App\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\Response;

class ClientController extends Controller
{
    // use Response;

    private $clientRepository;

    public function __construct(ClientRepository $clientRepository)
    {
        $this->clientRepository = $clientRepository;
    }

    public function all()
    {
        $data = $this->clientRepository->all();

        return $data;
    }

    public function store(){
        $data = request('data');
        
        try{
            $data = $this->clientRepository->create($data);
        } catch(\Exception $e){
            return ['response' => 401, 'message' => 'Erro ao cadastrar cliente'];
        }

        return ['response' => 200, 'message' => 'Cliente cadastrado com sucesso', 'data' => $data];
    }
}
