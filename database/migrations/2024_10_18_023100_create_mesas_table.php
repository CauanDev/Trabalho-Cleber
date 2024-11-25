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
        Schema::create('mesas', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable();
            $table->boolean('agendado')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('mesas')->insert([
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Disponível', 'agendado' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mesas');
    }
};
