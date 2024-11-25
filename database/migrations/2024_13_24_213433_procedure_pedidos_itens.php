<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::unprepared('
            CREATE OR REPLACE FUNCTION insert_pedido_items(pedido_id INTEGER, produtos JSON)
            RETURNS VOID AS $$
            DECLARE
                produto JSON;
                produto_id INTEGER;
                quantidade INTEGER;
                i INTEGER;
            BEGIN
                FOR produto IN SELECT * FROM json_array_elements(produtos)
                LOOP
                    produto_id := (produto->>\'id\')::INTEGER;
                    quantidade := (produto->>\'quantidade\')::INTEGER;
    
                    FOR i IN 1..quantidade LOOP
                        INSERT INTO pedidos_itens (pedido_id, produto_id, created_at)
                        VALUES (pedido_id, produto_id, NOW());
                    END LOOP;
                END LOOP;
            END;
            $$ LANGUAGE plpgsql;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS insert_pedido_items(INTEGER, JSON)');
    }
};


