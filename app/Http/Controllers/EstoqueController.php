<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class EstoqueController extends Controller
{
    public function index()
    {
        $estoque = DB::select(
            'SELECT * FROM produtos WHERE deleted_at IS NULL'
        );

        $message = session('message');

        return Inertia::render('Estoque/Index', [
            'estoque' => $estoque,
            'message' => $message,
        ]);
    }


    public function create()
    {
        return Inertia::render('Estoque/Create');
    }

    public function edit($id)
    {
        // Se usar select, ele vai retornar um array, por isso utilizo selectOne
        $produto = DB::selectOne(
            'SELECT * FROM produtos WHERE deleted_at IS NULL AND id = :id',
            ['id' => $id]
        );

        return Inertia::render('Estoque/Edit', [
            'produto' => $produto
        ]);
    }

    public function store(Request $request)
    {

        try {
            DB::insert(
                'INSERT INTO produtos (nome, quantidade, created_at) VALUES (:nome, :quantidade, NOW())',
                [
                    'nome' => $request->nome,
                    'quantidade' => $request->quantidade,
                ]
            );
            return redirect()->route('estoque')->with('message', 'Produto Cadastrado com Sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('estoque')->with('message', 'Erro ao Criar Produto! '.$th->getMessage());
        }
    }


    public function update(Request $request)
    {
        try {
            DB::update(
                'UPDATE produtos SET nome = :nome, quantidade = :quantidade, updated_at = NOW() WHERE id = :id',
                [
                    'nome' => $request->nome,
                    'quantidade' => $request->quantidade,
                    'id' => $request->id,
                ]
            );
            return redirect()->route('estoque')->with('message', 'Produto Atualizar com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('estoque')->with('message', 'Erro ao Atualizar Produto!'.$th->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            DB::update('
            UPDATE produtos 
            SET deleted_at = NOW() 
            WHERE id = :id AND deleted_at IS NULL', ['id' => $id]);

            return redirect()->route('estoque')->with('message', 'Produto Deletado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('estoque')->with('message', 'Erro ao Deletar Produto!'.$th->getMessage());
        }
    }
}
