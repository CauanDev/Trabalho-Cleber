<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menu = DB::select(
            'SELECT 
                menu.*
             FROM menu
             WHERE menu.deleted_at IS NULL'
        );

        $message = session('message');

        return Inertia::render('Menu/Index', [
            'menu' => $menu,
            'message' => $message
        ]);
    }

    public function create()
    {
        $estoque = DB::select(
            'SELECT * FROM produtos WHERE deleted_at IS NULL'
        );

        return Inertia::render('Menu/Create', [
            'estoque' => $estoque
        ]);
    }

    public function addItem($dados, $id)
    {
        // Acessa Procedure Criada no Laravel
        DB::select('SELECT insert_menu_items(:menu_id, :ingredientes)', [
            'menu_id' => $id,
            'ingredientes' => json_encode($dados),
        ]);
    }

    public function removeItem($id)
    {

        DB::select('SELECT soft_delete_menu_item(:item_id)', [
            'item_id' => $id,
        ]);
    }

    public function edit($id)
    {
        $menu = DB::select(
            'SELECT 
                menu.id AS menu_id, 
                menu.nome_do_produto, 
                menu.preco, 
                menu_itens.id AS item_id,
                menu_itens.produto_id,
                menu_itens.quantidade,
                produtos.nome AS produto_nome
             FROM menu
             LEFT JOIN menu_itens ON menu.id = menu_itens.menu_id
             LEFT JOIN produtos ON menu_itens.produto_id = produtos.id
             WHERE menu.deleted_at IS NULL AND menu_itens.deleted_at is NULL AND menu.id = :menu_id ',
            ['menu_id' => $id]
        );
    
        $menuData = null;
        if (count($menu) > 0) {
            $menuData = $menu[0];
            $menuData->ingredientes = [];

            foreach ($menu as $item) {
                $menuData->ingredientes[] = [
                    'item_id' => $item->item_id,
                    'id' => $item->produto_id,
                    'nome' => $item->produto_nome,
                    'quantidade' => $item->quantidade
                ];
            }
        }

        $estoque = DB::select(
            'SELECT * FROM produtos WHERE deleted_at IS NULL'
        );

        return Inertia::render('Menu/Edit', [
            'menu' => $menuData,
            'estoque' => $estoque
        ]);
    }

    public function destroy($id)
    {
        try {
            DB::update('
            UPDATE menu 
            SET deleted_at = NOW() 
            WHERE id = :id AND deleted_at IS NULL', ['id' => $id]);

            $this->removeItem($id);

            return redirect()->route('menu')->with('message', 'Produto Deletado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('menu')->with('message', 'Erro ao Deletar Produto!' . $th->getMessage());
        }
    }

    public function store(Request $request)
    {

        try {
            DB::insert(
                'INSERT INTO menu (nome_do_produto, preco, created_at) VALUES (:nome_do_produto, :preco, NOW())',
                [
                    'nome_do_produto' => $request->nome,
                    'preco' => $request->valor,
                ]
            );

            // Pegar o ID do último produto inserido
            $produtoId = DB::getPdo()->lastInsertId();
        
            $this->addItem($request->ingredientes, $produtoId);

            return redirect()->route('menu')->with('message', 'Produto Cadastrado com Sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('menu')->with('message', 'Erro ao Criar Produto! ' . $th->getMessage());
        }
    }

    public function update(Request $request)
    {

        try {
         
            DB::update(
                'UPDATE menu 
                SET nome_do_produto = :nome_do_produto, preco = :preco, updated_at = NOW() 
                WHERE id = :id AND deleted_at IS NULL',
                [
                    'id' => $request->id,
                    'nome_do_produto' => $request->nome,
                    'preco' => $request->valor,
                ]
            );

            // Remover os itens do menu
            $this->removeItem($request->id);
      
            $this->addItem($request->ingredientes, $request->id);


            return redirect()->route('menu')->with('message', 'Produto Atualizado com Sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('menu')->with('message', 'Erro ao Atualizar Produto! ' . $th->getMessage());
        }
    }
}
