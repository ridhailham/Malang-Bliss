<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wisata>
 */
class WisataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'image' => fake()->imageUrl(640, 480, 'nature', true, 'Faker'),
            'lokasi' => fake()->city(),
            'kontak' => fake()->phoneNumber(),
            'instagram' => '@' . fake()->word(),
            'deskripsi' => fake()->paragraph(),
            'harga' => fake()->randomNumber(5, true)
        ];
    }
}
