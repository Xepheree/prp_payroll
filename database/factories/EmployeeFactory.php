<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'designation' => fake()->randomElement([
                'driver',
                'helper',
                'checker',
                'dispatcher',
            ]),
            'rate' => fake()->randomElement([
                500,
                600,
                700,
                800,
                900,
                1000,
            ]),
            'ot_rate' => fake()->randomElement([
                70,
                80,
                100,
            ]),
            'trip_rate' => fake()->randomElement([
                100,
                120,
                150,
                200,
            ]),
            'status' => 'active',
            'image' => null,
        ];
    }
}
