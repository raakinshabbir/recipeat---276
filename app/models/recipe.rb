class Recipe < ApplicationRecord
  # Ensure you have the following attribute
  validates :name, presence: true
end

