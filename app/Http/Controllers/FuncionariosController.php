<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FuncionariosController extends Controller
{
    public function index()
    {
        $funcionarios = DB::select(
            'SELECT * FROM funcionarios WHERE deleted_at IS NULL'
        );

        $message = session('message');


        return Inertia::render('Funcionarios/Index', [
            'funcionarios' =>  $funcionarios,
            'message' =>   $message
        ]);
    }

    public function create()
    {
        return Inertia::render('Funcionarios/Create');
    }

    public function store(Request $request)
    {
        try {

            DB::insert(
                'INSERT INTO funcionarios (nome, sexo, salario, created_at) VALUES (:nome, :sexo, :salario, NOW())',
                [
                    'nome' => $request->nome,
                    'sexo' => $request->sexo,
                    'salario' => $request->salario,
                ]
            );

            return redirect()->route('funcionarios')->with('message', 'Funcionário criado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('funcionarios')->with('message', 'Erro ao Criar Funcionário! ' . $th->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            DB::update(
                'UPDATE funcionarios SET deleted_at = NOW() WHERE id = :id AND deleted_at IS NULL',
                ['id' => $id]
            );

            return redirect()->route('funcionarios')->with('message', 'Funcionário excluído com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('funcionarios')->with('message', 'Erro ao excluir Funcionário! ' . $th->getMessage());
        }
    }

    public function edit($id)
    {
        $funcionario = DB::selectOne(
            'SELECT * FROM funcionarios WHERE id = :id AND deleted_at IS NULL',
            ['id' => $id]
        );

        return Inertia::render('Funcionarios/Edit',[
            'funcionario'=>$funcionario
        ]);
    }

    public function update(Request $request)
    {
        try {
            DB::update(
                'UPDATE funcionarios 
                 SET nome = :nome, sexo = :sexo, salario = :salario, updated_at = NOW() 
                 WHERE id = :id AND deleted_at IS NULL',
                [
                    'nome' => $request->nome,
                    'sexo' => $request->sexo,
                    'salario' => $request->salario,
                    'id' => $request->id
                ]
            );
    
            return redirect()->route('funcionarios')->with('message', 'Funcionário atualizado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('funcionarios')->with('message', 'Erro ao atualizar Funcionário! ' . $th->getMessage());
        }
    }
    
}
