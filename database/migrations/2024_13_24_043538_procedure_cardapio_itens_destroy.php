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
            CREATE OR REPLACE FUNCTION soft_delete_menu_item(item_id INTEGER)
            RETURNS VOID AS $$
            BEGIN
                UPDATE menu_itens
                SET deleted_at = NOW()
                WHERE menu_id = item_id AND deleted_at IS NULL;
            END;
            $$ LANGUAGE plpgsql;
        ');
    }
    
    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS soft_delete_menu_item(INTEGER)');
    }
    
};
