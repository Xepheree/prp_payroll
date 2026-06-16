<?php

namespace Database\Seeders;

use App\Models\Truck;
use Illuminate\Database\Seeder;

class TruckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Truck::insert([
            [
                'plate' => 'ABC-1234',
                'alias' => 'Truck 1',
                'make' => 'isuzu',
                'category' => 'wingvan',
                'status' => 'ready',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'plate' => 'DEF-5678',
                'alias' => 'Truck 2',
                'make' => 'isuzu',
                'category' => 'dropside',
                'status' => 'ready',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'plate' => 'GHI-9012',
                'alias' => 'Truck 3',
                'make' => 'stc',
                'category' => 'trailer',
                'status' => 'ready',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'plate' => 'JKL-3456',
                'alias' => 'Truck 4',
                'make' => 'isuzu',
                'category' => 'wingvan',
                'status' => 'for repair',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'plate' => 'MNO-7890',
                'alias' => 'Truck 5',
                'make' => 'stc',
                'category' => 'dropside',
                'status' => 'on trip',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}