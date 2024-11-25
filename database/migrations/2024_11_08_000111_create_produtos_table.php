<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->integer('quantidade');
            $table->softDeletes();
            $table->timestamps();            
        });

        DB::table('produtos')->insert([
            ['nome' => 'Farinha de Trigo', 'quantidade' => 50, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Açúcar Refinado', 'quantidade' => 100, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Sal Marinho', 'quantidade' => 200, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Óleo de Soja', 'quantidade' => 30, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Fermento Biológico', 'quantidade' => 20, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Leite Integral', 'quantidade' => 60, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Chocolate em Pó', 'quantidade' => 40, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Manteiga Sem Sal', 'quantidade' => 70, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Ovo Caipira', 'quantidade' => 150, 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Creme de Leite', 'quantidade' => 80, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
