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
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->decimal('salario', 10, 2); 
            $table->enum('sexo', ['Masculino', 'Feminino', 'Outro']);  
            $table->softDeletes(); 
            $table->timestamps(); 
        });

        // Inserindo registros de funcionários
        DB::table('funcionarios')->insert([
            [
                'nome' => 'João Silva',
                'salario' => 2500.00,
                'sexo' => 'Masculino',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Maria Oliveira',
                'salario' => 3000.50,
                'sexo' => 'Feminino',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Alex Santos',
                'salario' => 2800.75,
                'sexo' => 'Masculino',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Fernanda Lima',
                'salario' => 3200.00,
                'sexo' => 'Feminino',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Rafael Costa',
                'salario' => 2600.00,
                'sexo' => 'Outro',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funcionarios');
    }
};
