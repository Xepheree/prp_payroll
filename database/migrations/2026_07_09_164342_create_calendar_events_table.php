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
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('description')->nullable();

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->boolean('all_day')->default(true);

            $table->enum('visibility', [
                'public',
                'private',
                'custom',
            ])->default('public');

            $table->enum('recurrence_type', [
                'none',
                'daily',
                'weekly',
                'monthly',
                'yearly',
            ])->default('none');

            $table->unsignedTinyInteger('repeat_interval')->default(1);

            // Only used for monthly recurrences
            $table->enum('monthly_repeat_mode', [
                'day_of_month',
                'weekday_of_month',
            ])->nullable();

            $table->unsignedTinyInteger('week_of_month')->nullable();
            // 1 = First
            // 2 = Second
            // 3 = Third
            // 4 = Fourth
            // 5 = Last

            $table->unsignedTinyInteger('day_of_week')->nullable();
            // 0 = Sunday
            // 1 = Monday
            // ...
            // 5 = Friday
            // 6 = Saturday

            $table->enum('type', [
                'event',
                'holiday',
                'leave',
                'birthday',
                'announcement',
            ])->default('event');

            $table->string('color')->default('#3b82f6');

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};
