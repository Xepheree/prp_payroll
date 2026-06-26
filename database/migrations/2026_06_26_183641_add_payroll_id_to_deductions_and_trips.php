<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('deductions', function (Blueprint $table) {
            $table->foreignId('payroll_id')
                ->nullable()
                ->after('employee_id')
                ->constrained()
                ->nullOnDelete();
        });

        Schema::table('trips', function (Blueprint $table) {
            $table->foreignId('payroll_id')
                ->nullable()
                ->after('helper_id')
                ->constrained()
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('deductions', function (Blueprint $table) {
            $table->dropConstrainedForeignId('payroll_id');
        });

        Schema::table('trips', function (Blueprint $table) {
            $table->dropConstrainedForeignId('payroll_id');
        });
    }
};
