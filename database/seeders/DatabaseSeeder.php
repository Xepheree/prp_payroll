<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\EmployeeSeeder;
use Database\Seeders\TruckSeeder;
use Database\Seeders\CompanySeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
   public function run(): void
{
    User::factory()->create([
        'name' => 'Patrick Perez',
        'email' => 'patrickperez.iformatlogic@gmail.com',
        'role' => 'superadmin',
        'password' => Hash::make('rekka4789'),
    ]);

    $this->call([
        EmployeeSeeder::class,
        TruckSeeder::class,
        CompanySeeder::class,
    ]);
}
}
