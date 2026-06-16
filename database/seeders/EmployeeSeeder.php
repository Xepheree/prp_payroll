<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employee::insert([
            [
                'name' => 'John Dela Cruz',
                'designation' => 'driver',
                'rate' => 650,
                'ot_rate' => 100,
                'status' => 'active',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mark Santos',
                'designation' => 'helper',
                'rate' => 550,
                'ot_rate' => 85,
                'status' => 'active',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Paul Reyes',
                'designation' => 'driver',
                'rate' => 700,
                'ot_rate' => 110,
                'status' => 'active',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Peter Cruz',
                'designation' => 'checker',
                'rate' => 600,
                'ot_rate' => 90,
                'status' => 'active',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maria Garcia',
                'designation' => 'dispatcher',
                'rate' => 750,
                'ot_rate' => 120,
                'status' => 'active',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}