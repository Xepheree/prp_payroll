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
        Schema::create('attendance_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('attendance_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('attendance_date');

            $table->decimal('work_hours', 4, 2)
                ->default(0);

            $table->decimal('overtime_hours', 4, 2)
                ->default(0);

            $table->timestamps();

            $table->unique([
                'attendance_id',
                'employee_id',
                'attendance_date',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_items');
    }
};
