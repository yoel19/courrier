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
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('username')->unique();

            $table->string('name');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();

            $table->string('gender')->nullable();
            $table->string('job_title')->nullable();

            $table->string('phone')->unique();
            $table->timestamp('phone_verified_at')->nullable();
            $table->integer('otp')->nullable();

            $table->string('search_slug')->nullable();

            $table->timestamp('last_connection')->nullable();

            $table->timestamp('disabled_at')->nullable();

            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
