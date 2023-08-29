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
        Schema::create('couriers', function (Blueprint $table) {
            $table->id();

            $table->string('added_by_user_id');
            $table->string('updated_by_user_id');

            $table->string('label');
            $table->string('reason');

            $table->string('sender')->nullable();
            $table->string('receiver')->nullable();

            $table->string('type')->nullable(); //out, in

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('couriers');
    }
};
