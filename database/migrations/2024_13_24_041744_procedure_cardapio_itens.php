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
            CREATE OR REPLACE FUNCTION insert_menu_items(menu_id INTEGER, ingredientes JSON)
            RETURNS VOID AS $$
            DECLARE
                ingrediente JSON;
                produto_id INTEGER;
                quantidade INTEGER;
            BEGIN
                FOR ingrediente IN SELECT * FROM json_array_elements(ingredientes)
                LOOP
                    produto_id := (ingrediente->>\'id\')::INTEGER;
                    quantidade := (ingrediente->>\'quantidade\')::INTEGER;

                    INSERT INTO menu_itens (menu_id, produto_id, quantidade, created_at)
                    VALUES (menu_id, produto_id, quantidade, NOW());
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
        DB::unprepared('DROP FUNCTION IF EXISTS insert_menu_items(INTEGER, JSON)');
    }
};
