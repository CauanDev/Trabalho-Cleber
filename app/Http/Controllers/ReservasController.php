<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReservasController extends Controller
{
    public function index()
    {
        $reservas = DB::select(
            'SELECT * FROM reservas WHERE deleted_at IS NULL'
        );

        $mesas = DB::select(
            'SELECT * FROM mesas WHERE deleted_at IS NULL'
        );
        $message = session('message');

        return Inertia::render('Reservas/Index', [
            'reservas' => $reservas,
            'mesas' => $mesas,
            'message' => $message
        ]);
    }

    public function create()
    {
        $mesas = DB::select(
            'SELECT * FROM mesas WHERE deleted_at IS NULL AND status = \'Disponível\' AND agendado = false'
        );


        return Inertia::render('Reservas/Create', [
            'mesas' => $mesas
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::insert('
                INSERT INTO reservas (mesa_id, quantidade_pessoas, data_agendado, created_at)
                VALUES (:mesa_id, :quantidadePessoas, :data_agendado, NOW())
            ', [
                'mesa_id' => $request->mesaId,
                'quantidadePessoas' => $request->quantidadePessoas,
                'data_agendado' => $request->dataReserva
            ]);

            // Atualizando a mesa para que não fique mais disponível
            DB::update('
                UPDATE mesas
                SET status = \'Reservada\', agendado = true, updated_at = NOW()
                WHERE id = :mesaId AND deleted_at IS NULL
            ', [
                'mesaId' => $request->mesaId
            ]);

            return redirect()->route('reservas')->with('message', 'Reserva criada com sucesso!');
        } catch (\Exception $e) {
            return redirect()->route('reservas')->with('message', 'Erro ao criar reserva: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $reserva = DB::select('SELECT * FROM reservas WHERE id = :id AND deleted_at IS NULL', ['id' => $id]);


            DB::update('
            UPDATE reservas
            SET deleted_at = NOW()
            WHERE id = :id AND deleted_at IS NULL
        ', ['id' => $id]);

            // Revertendo a mesa para o status anterior
            DB::update('
            UPDATE mesas
            SET status = \'Disponível\', agendado = false, updated_at = NOW()
            WHERE id = :mesaId AND deleted_at IS NULL
        ', ['mesaId' => $reserva[0]->mesa_id]);

            return redirect()->route('reservas')->with('message', 'Reserva removida com sucesso!');
        } catch (\Exception $e) {
            return redirect()->route('reservas')->with('message', 'Erro ao remover reserva: ' . $e->getMessage());
        }
    }
    
    public function edit($id)
    {
        $reserva = DB::selectOne(
            'SELECT *
             FROM reservas
             WHERE id = :id AND deleted_at IS NULL',
            ['id' => $id]
        );

        $mesas = DB::select(
            'SELECT * FROM mesas WHERE deleted_at IS NULL AND status = \'Disponível\' AND agendado = false'
        );

        return Inertia::render('Reservas/Edit', [
            'reserva' => $reserva,
            'mesas' =>  $mesas
        ]);
    }

    public function update(Request $request)
    {
        try {
            // Recupera a reserva existente
            $reserva = DB::selectOne('
                SELECT * 
                FROM reservas
                WHERE id = :id AND deleted_at IS NULL', 
                ['id' => $request->id]
            );
         
            // Atualiza os dados da reserva
            DB::update('
                UPDATE reservas
                SET mesa_id = :mesaId, quantidade_pessoas = :quantidadePessoas, data_agendado = :data_agendado, updated_at = NOW()
                WHERE id = :id AND deleted_at IS NULL
            ', [
                'mesaId' => $request->mesaId,
                'quantidadePessoas' => $request->quantidadePessoas,
                'data_agendado' => $request->dataReserva,
                'id' => $request->id
            ]);
    
            // Se a mesa foi alterada, atualizar o status da mesa
            if ($reserva->mesa_id !== $request->mesaId) {
                // Reverter o status da mesa antiga
                DB::update('
                    UPDATE mesas
                    SET status = \'Disponível\', agendado = false, updated_at = NOW()
                    WHERE id = :mesaId AND deleted_at IS NULL
                ', [
                    'mesaId' => $reserva->mesa_id
                ]);
    
                // Atualizar o status da nova mesa
                DB::update('
                    UPDATE mesas
                    SET status = \'Reservada\', agendado = true, updated_at = NOW()
                    WHERE id = :mesaId AND deleted_at IS NULL
                ', [
                    'mesaId' => $request->mesaId
                ]);
            }
    
            return redirect()->route('reservas')->with('message', 'Reserva atualizada com sucesso!');
        } catch (\Exception $e) {
            return redirect()->route('reservas')->with('message', 'Erro ao atualizar reserva: ' . $e->getMessage());
        }
    }
    
}
