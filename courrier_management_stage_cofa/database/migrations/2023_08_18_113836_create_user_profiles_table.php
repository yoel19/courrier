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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();

            $table->string('username');
            $table->foreign('username')
                ->references('username')
                ->on('users');

            $table->string('profile_ref');
            $table->foreign('profile_ref')
                ->references('ref')
                ->on('profiles');

            $table->timestamp('start_at');
            $table->timestamp('end_at')->nullable();

            $table->string('assign_by')->nullable();
            $table->string('update_by')->nullable();

            $table->timestamp('disabled_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
