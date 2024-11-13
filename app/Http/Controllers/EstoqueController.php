<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EstoqueController extends Controller
{
    public function index()
    {
        $estoques = DB::select(
            'SELECT * FROM estoques WHERE deleted_at IS NULL'
        );

        return Inertia::render('Estoque/Index', [
            'estoques' => $estoques
        ]);
    }

    public function create()
    {       return Inertia::render('Estoque/Create');
    }

    public function edit($id)
    {
        $estoque = DB::selectOne(
            'SELECT * FROM estoques WHERE deleted_at IS NULL AND id = :id',
            ['id' => $id]
        );

        return Inertia::render('Estoque/Edit', [
            'produto' => $estoque
        ]);
    }

    public function destroy($id)
    {
        DB::update('
        UPDATE estoques 
        SET deleted_at = NOW() 
        WHERE id = :id AND deleted_at IS NULL', ['id' => $id]);
    }
}
