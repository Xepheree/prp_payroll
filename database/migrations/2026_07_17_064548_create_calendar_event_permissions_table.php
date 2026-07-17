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
        Schema::create('calendar_event_permissions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('calendar_event_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('permission_type', [
                'role',
                'user',
            ]);

            $table->string('permission_value');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_event_permissions');
    }
};
