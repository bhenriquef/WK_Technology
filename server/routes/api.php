<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// clients
Route::group(['prefix' => 'clients'], function () {
    Route::get('/all',                                        ['as'=>'clients.create',  'uses'=>'App\Api\Controllers\ClientController@all']);
    Route::post('/store',                                             ['as'=>'clients.store',   'uses'=>'App\Api\Controllers\ClientController@store']);
});

// products
Route::group(['prefix' => 'products'], function () {
    Route::get('/all',                                        ['as'=>'products.create',  'uses'=>'App\Api\Controllers\ProductController@all']);
    Route::post('/store',                                             ['as'=>'products.store',   'uses'=>'App\Api\Controllers\ProductController@store']);
});

// sales
Route::group(['prefix' => 'sales'], function () {
    Route::get('/all',                                        ['as'=>'sales.create',  'uses'=>'App\Api\Controllers\SaleController@all']);
    Route::post('/store',                                             ['as'=>'sales.store',   'uses'=>'App\Api\Controllers\SaleController@store']);
});