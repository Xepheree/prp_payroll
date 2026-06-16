<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::insert([
            [
                'name' => 'ABC Logistics Corporation',
                'specialization' => 'Logistics and Distribution',
                'contact_person_name' => 'Michael Reyes',
                'contact_person_number' => '09171234567',
                'address' => '123 Logistics Ave, Quezon City',
                'details' => 'Nationwide logistics and cargo distribution services.',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Prime Retail Solutions',
                'specialization' => 'Retail Supply Chain',
                'contact_person_name' => 'Anna Cruz',
                'contact_person_number' => '09181234567',
                'address' => '45 Commerce Street, Makati City',
                'details' => 'Retail distribution and inventory management services.',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Metro Food Distributors',
                'specialization' => 'Food Distribution',
                'contact_person_name' => 'Jose Santos',
                'contact_person_number' => '09191234567',
                'address' => '88 Warehouse Road, Pasig City',
                'details' => 'Supplier and distributor of food products across Luzon.',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Golden Manufacturing Inc.',
                'specialization' => 'Manufacturing',
                'contact_person_name' => 'Karen Garcia',
                'contact_person_number' => '09201234567',
                'address' => '200 Industrial Park, Laguna',
                'details' => 'Manufacturing and industrial production company.',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Pacific Trading Corporation',
                'specialization' => 'Import and Export',
                'contact_person_name' => 'Richard Lim',
                'contact_person_number' => '09211234567',
                'address' => '500 Port Area, Manila',
                'details' => 'Import, export, and trading operations throughout Southeast Asia.',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}