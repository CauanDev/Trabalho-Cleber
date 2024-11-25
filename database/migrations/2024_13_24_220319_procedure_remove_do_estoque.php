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
                -- Iterar sobre os produtos enviados no JSON
                FOR produto IN SELECT * FROM json_array_elements(produtos)
                LOOP
                    -- Obter o id e a quantidade do produto
                    v_produto_id := (produto->>\'id\')::INTEGER;
                    quantidade_pedido := (produto->>\'quantidade\')::INTEGER;

                    -- Iterar sobre as linhas do menu_itens para pegar os ingredientes associados ao produto
                    FOR produto_id_menu, quantidade_menu IN
                        SELECT mi.produto_id, mi.quantidade
                        FROM menu_itens mi
                        WHERE mi.menu_id = v_produto_id
                    LOOP
                        -- Subtrair a quantidade da tabela produtos
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

