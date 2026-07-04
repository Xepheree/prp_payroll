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
        Schema::table('payroll_items', function (Blueprint $table) {
            $table->decimal('outstanding_balance', 12, 2)->default(0)->after('net_pay');
            $table->decimal('balance_recovery', 12, 2)->default(0)->after('outstanding_balance');
            $table->decimal('salary_released', 12, 2)->default(0)->after('balance_recovery');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payroll_items', function (Blueprint $table) {
            //
        });
    }
};
