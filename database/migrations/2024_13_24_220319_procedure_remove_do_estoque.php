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
            CREATE OR REPLACE FUNCTION atualizar_estoque_produtos(produtos JSON)
            RETURNS VOID AS $$
            DECLARE
                produto JSON;
                v_produto_id INTEGER;
                quantidade_pedido INTEGER;
                quantidade_menu INTEGER;
                produto_id_menu INTEGER;
                estoque_atual INTEGER;
            BEGIN
                FOR produto IN SELECT * FROM json_array_elements(produtos)
                LOOP
                    v_produto_id := (produto->>\'id\')::INTEGER;
                    quantidade_pedido := (produto->>\'quantidade\')::INTEGER;

                    FOR produto_id_menu, quantidade_menu IN
                        SELECT mi.produto_id, mi.quantidade
                        FROM menu_itens mi
                        WHERE mi.menu_id = v_produto_id
                    LOOP
                        UPDATE produtos
                        SET quantidade = quantidade - (quantidade_menu * quantidade_pedido)
                        WHERE id = produto_id_menu;
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
        DB::unprepared('DROP FUNCTION IF EXISTS atualizar_estoque_produtos(JSON)');
    }
};

