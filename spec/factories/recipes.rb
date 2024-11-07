FactoryBot.define do
  factory :recipe do
    title { Faker::Food.dish }
    ingredients { Faker::Food.ingredient }
    instructions { Faker::Food.description }
    cooking_time { rand(10..60) }
    servings { rand(1..6) }
    difficulty { %w[Easy Medium Hard].sample }
  end
end