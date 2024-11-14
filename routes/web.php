<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EstoqueController;
use App\Http\Controllers\FuncionariosController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\ReservasController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/estoque',[EstoqueController::class,'index']);
Route::get('/edit-produto/{id}', [EstoqueController::class, 'edit']);
Route::delete('/remove-produto/{id}', [EstoqueController::class, 'destroy']);
Route::post('/create-produto', [EstoqueController::class, 'create']);
Route::post('/update-produto', [EstoqueController::class, 'update']);
Route::post('/store-produto', [EstoqueController::class, 'store']);

Route::get('/pedidos', [PedidosController::class, 'index']);
Route::get('/menu', [MenuController::class, 'index']);
Route::get('/funcionarios', [FuncionariosController::class, 'index']);
Route::get('/reservas', [ReservasController::class, 'index']);