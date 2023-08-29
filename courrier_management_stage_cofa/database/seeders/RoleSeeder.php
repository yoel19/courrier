<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $roles = [
            array(
                'ref' => 'super_admin',
                'name' => 'Super Administrateur',
                'assignable' => false,
            ),
            array(
                'ref' => 'admin',
                'name' => 'Administrateur',
                'assignable' => true,
            ),
            array(
                'ref' => 'secretary',
                'name' => 'Sécrétaire',
                'assignable' => true,
            ),
            array(
                'ref' => 'service_chief',
                'name' => 'Chef de service',
                'assignable' => true,
            ),
        ];

        foreach ($roles as $role) {
            $old = Profile::whereRef($role['ref'])->first();

            if ($old == null) {
                Profile::create($role);
            } else {
                $old->update($role);
                $old->save();
            }

        }
    }
}
