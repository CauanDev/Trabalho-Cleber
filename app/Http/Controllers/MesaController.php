<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MesaController extends Controller
{
    public function index()
    {
        $mesas = DB::select(
            'SELECT * FROM mesas WHERE deleted_at IS NULL'
        );

        $message = session('message');

        return Inertia::render('Mesas/Index', [
            'mesas' => $mesas,
            'message' => $message
        ]);
    }

    public function create()
    {
        return Inertia::render('Mesas/Create');
    }

    public function store(Request $request)
    {
        $agendado = filter_var($request->agendado, FILTER_VALIDATE_BOOLEAN);

        try {
            DB::insert(
                'INSERT INTO mesas (status, agendado, created_at, updated_at) 
            VALUES (:status, :agendado, NOW(), NOW())',
                [
                    'status' => $request->status,
                    'agendado' => false,
                ]
            );
            return redirect()->route('mesas')->with('message', 'Mesa Cadastrada com Sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('mesas')->with('message', 'Erro ao Criar Mesa! ' . $th->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            DB::update('
            UPDATE mesas 
            SET deleted_at = NOW() 
            WHERE id = :id AND deleted_at IS NULL', ['id' => $id]);

            return redirect()->route('mesas')->with('message', 'Mesa Deletado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('mesas')->with('message', 'Erro ao Deletar Mesa!'.$th->getMessage());
        }
    }

    public function edit($id)
    {
        $mesa = DB::selectOne(
            'SELECT *
             FROM mesas
             WHERE id = :mesa_id AND deleted_at IS NULL',
            ['mesa_id' => $id]
        );

        return Inertia::render('Mesas/Edit',[
            'mesa' => $mesa
        ]);

    }
    
    public function update(Request $request)
    {
        try {
            DB::update('
                UPDATE mesas 
                SET 
                    status = :status, 
                    agendado = :agendado, 
                    updated_at = NOW() 
                WHERE id = :id AND deleted_at IS NULL',
                [
                    'status' => $request->status,
                    'agendado' => $request->agendado,
                    'id' => $request->id
                ]
            );
    
            return redirect()->route('mesas')->with('message', 'Mesa Atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('mesas')->with('message', 'Erro ao Atualizar Mesa! '.$th->getMessage());
        }
    }
    
}
