<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();

            $table->date('trip_date');

            $table->foreignId('truck_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('driver_id')
                ->constrained('employees')
                ->cascadeOnDelete();

            $table->foreignId('helper_id')
                ->nullable()
                ->constrained('employees')
                ->nullOnDelete();

            $table->enum('trip_type', [
                'pickup',
                'transfer',
                'deliver',
            ]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
