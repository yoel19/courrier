<?php

namespace Database\Seeders;

use App\Helpers\PhoneHelper;
use App\Models\FiscalRegion;
use App\Models\Office;
use App\Models\OfficeType;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run(): void
    {
        $usersData = [
            ['phone' => "90000000", 'role' => 'super_admin'],
            ['phone' => "90000010", 'role' => 'admin'],
            ['phone' => "90000020", 'role' => 'secretary'],
            ['phone' => "90000030", 'role' => 'service_chief'],
        ];

        foreach ($usersData as $userData) {
            $user = User::factory()->state([
                'phone' => PhoneHelper::normalizeTgPhone($userData['phone']),
                'username' => $userData['role'],
            ])->create();

            $user->roles()->attach($userData['role'], [
                'start_at' => Carbon::now(),
                'assign_by' => '0000-A',
            ]);
        }
    }
}
