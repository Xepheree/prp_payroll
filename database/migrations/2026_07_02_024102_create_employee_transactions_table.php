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
        Schema::create('employee_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('type', [
                'payroll',
                'deduction',
                'adjustment',
                'payment',
                'bonus',
            ]);

            // Positive = Employee owes company
            // Negative = Company owes employee
            $table->decimal('amount', 12, 2);

            $table->string('description');

            $table->foreignId('payroll_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('deduction_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_transactions');
    }
};
