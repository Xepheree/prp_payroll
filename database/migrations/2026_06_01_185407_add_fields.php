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


        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            $table->string('image')->nullable();

            $table->string('name');

            $table->string('specialization');

            $table->string('contact_person_name');
            $table->string('contact_person_number');

            $table->text('address');

            $table->text('details')->nullable();

            $table->timestamps();
        });

        Schema::create('trucks', function (Blueprint $table) {
            $table->id();

            $table->string('image')->nullable();

            $table->string('plate')->unique();

            $table->string('alias')->nullable();

            $table->string('make');

            $table->string('category');

            $table->enum('status', [
                'ready',
                'for repair',
                'unavailable',
                'on trip',
            ])->default('ready');

            $table->timestamps();
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
