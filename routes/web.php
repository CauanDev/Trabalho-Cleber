<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EstoqueController;
use App\Http\Controllers\FuncionariosController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\ReservasController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Aqui você pode registrar as rotas da aplicação. Todas as rotas serão
| atribuídas ao middleware "web".
|
*/

// ========================== ROTAS DE ESTOQUE ==========================

Route::get('/estoque', [EstoqueController::class, 'index'])->name('estoque');

/*
    Rotas para edição de produtos no estoque.
    - A rota GET retorna a página de edição.
    - A rota PUT faz a atualização do produto.
*/
Route::get('/edit-estoque/{id}', [EstoqueController::class, 'edit']);
Route::put('/editar-produto', [EstoqueController::class, 'update']);

/*
    Rotas para adicionar um produto ao estoque.
    - A rota GET retorna a página de criação do produto.
    - A rota POST adiciona o produto no estoque.
*/
Route::post('/store-produto', [EstoqueController::class, 'store']);
Route::get('/criar-produto', [EstoqueController::class, 'create']);

// Remover um produto do estoque
Route::get('/remove-estoque/{id}', [EstoqueController::class, 'destroy']);

// ========================== ROTAS DE MENU ==========================

Route::get('/menu', [MenuController::class, 'index'])->name('menu');

/*
    Rotas para edição de produtos no cardápio.
    - A rota GET retorna a página de edição do produto do cardápio.
    - A rota PUT atualiza as informações do produto.
*/
Route::get('/edit-menu/{id}', [MenuController::class, 'edit']);
Route::put('/editar-menu', [MenuController::class, 'update']);

/*
    Rotas para adicionar um produto ao cardápio.
    - A rota GET retorna a página de criação de um novo produto para o cardápio.
    - A rota POST adiciona o produto ao cardápio.
*/
Route::get('/criar-produto-cardapio', [MenuController::class, 'create']);
Route::post('/store-produto-cardapio', [MenuController::class, 'store']);

/*
    Remover um produto do cardápio.
    - A rota GET remove um produto do cardápio pelo ID.
*/
Route::get('/remove-menu/{id}', [MenuController::class, 'destroy']);

// ========================== ROTAS DE PEDIDOS ==========================

Route::get('/pedidos', [PedidosController::class, 'index'])->name('pedidos');

/*
    Rotas para criação e edição de pedidos.
    - A rota GET retorna a página de criação de pedido.
    - A rota POST cria um novo pedido.
    - A rota GET permite editar um pedido.
    - A rota PUT atualiza os dados do pedido.
*/
Route::get('/criar-pedido', [PedidosController::class, 'create']);
Route::post('/store-pedido', [PedidosController::class, 'store']);
Route::get('/edit-pedidos/{id}', [PedidosController::class, 'edit']);
Route::put('/editar-pedido', [PedidosController::class, 'update']);

/*
    Alterar o status de um pedido.
    - A rota POST altera o status de um pedido.
*/
Route::post('/alterar-status/{id}', [PedidosController::class, 'alterarStatus']);


/*
    Remover um Pedido.
    - A rota GET remove um Pedido pelo ID.
*/
Route::get('/remove-pedidos/{id}', [PedidosController::class, 'destroy']);


// ========================== ROTAS DE FUNCIONÁRIOS ==========================

Route::get('/funcionarios', [FuncionariosController::class, 'index'])->name('funcionarios');

/*
    Rotas para edição de funcionários.
    - A rota GET retorna a página de edição do funcionário.
    - A rota PUT atualiza os dados do funcionário.
*/
Route::get('/edit-funcionarios/{id}', [FuncionariosController::class, 'edit']);
Route::put('/editar-funcionarios', [FuncionariosController::class, 'update']);

/*
    Rotas para adicionar um funcionário.
    - A rota GET retorna a página de criação de um novo funcionário.
    - A rota POST adiciona o novo funcionário.
*/
Route::get('/criar-funcionario', [FuncionariosController::class, 'create']);
Route::post('/store-funcionario', [FuncionariosController::class, 'store']);

/*
    Remover um funcionário.
    - A rota GET remove um funcionário pelo ID.
*/
Route::get('/remove-funcionarios/{id}', [FuncionariosController::class, 'destroy']);

// ========================== ROTAS DE MESAS ==========================

Route::get('/mesas', [MesaController::class, 'index'])->name('mesas');

/*
    Rotas para edição de mesas.
    - A rota GET retorna a página de edição da mesa.
    - A rota PUT atualiza os dados da mesa.
*/
Route::get('/edit-mesas/{id}', [MesaController::class, 'edit']);
Route::put('/editar-mesa', [MesaController::class, 'update']);

/*
    Rotas para adicionar uma mesa.
    - A rota GET retorna a página de criação de uma nova mesa.
    - A rota POST adiciona a nova mesa.
*/
Route::get('/criar-mesa', [MesaController::class, 'create']);
Route::post('/store-mesa', [MesaController::class, 'store']);

/*
    Remover uma mesa.
    - A rota GET remove uma mesa pelo ID.
*/
Route::get('/remove-mesas/{id}', [MesaController::class, 'destroy']);

// ========================== ROTAS DE RESERVAS ==========================

Route::get('/reservas', [ReservasController::class, 'index'])->name('reservas');

/*
    Rotas para edição de reservas.
    - A rota GET retorna a página de edição de reserva.
    - A rota PUT atualiza os dados da reserva.
*/
Route::get('/edit-reservas/{id}', [ReservasController::class, 'edit']);
Route::put('/editar-reserva', [ReservasController::class, 'update']);

/*
    Rotas para adicionar uma reserva.
    - A rota GET retorna a página de criação de uma nova reserva.
    - A rota POST adiciona a nova reserva.
*/
Route::get('/criar-reserva', [ReservasController::class, 'create']);
Route::post('/store-reserva', [ReservasController::class, 'store']);

/*
    Remover uma reserva.
    - A rota GET remove uma reserva pelo ID.
*/
Route::get('/remove-reservas/{id}', [ReservasController::class, 'destroy']);
