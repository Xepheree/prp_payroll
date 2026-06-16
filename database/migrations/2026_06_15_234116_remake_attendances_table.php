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
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);

            $table->dropUnique([
                'employee_id',
                'attendance_date',
            ]);

            $table->dropColumn([
                'employee_id',
                'attendance_date',
                'work_hours',
            ]);

            $table->date('period_start');
            $table->date('period_end');

            $table->enum('status', [
                'draft',
                'published',
            ])->default('draft');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
