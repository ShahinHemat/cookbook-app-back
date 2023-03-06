CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cookbooks (
  cookbook_id SERIAL PRIMARY KEY,
  cookbook_name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  picture BYTEA,
  description TEXT
);

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY,
  recipe_name VARCHAR(255) NOT NULL,
  cookbook_id INTEGER REFERENCES cookbooks(cookbook_id) ON DELETE CASCADE,
  ingredients TEXT[],
  directions TEXT[]
);

-- Insert a new user with email and password
INSERT INTO users (user_name, email, password) 
VALUES ('Lise', 'lise.en@online.no', 'lise123');

-- Insert a new cookbook for the user 'Lise'
INSERT INTO cookbooks (cookbook_name, user_id, picture, description) 
VALUES ('Spanish Fiesta', 1, NULL, 'A collection of delicious Spanish recipes.');

INSERT INTO cookbooks (cookbook_name, user_id, picture, description) 
VALUES ('Mexican Dreams', 1, NULL, 'A collection of spicy Mexican recipes.');

-- Insert new recipes in the 'Spanish Fiesta' cookbook
INSERT INTO recipes (recipe_name, cookbook_id, ingredients, directions) 
VALUES ('Paella', 1, '{"rice", "chicken", "shrimp", "mussels", "tomatoes", "peppers", "onions", "garlic", "saffron", "olive oil"}', '{"1. Heat oil in a large paella pan over medium heat...", "2. Add chicken and cook for 5 minutes...", "3. Add shrimp and cook for 2 minutes...", "4. Stir in the rice, vegetables, and saffron...", "5. Add broth and bring to a boil...", "6. Reduce heat and simmer until the rice is cooked..." }');

INSERT INTO recipes (recipe_name, cookbook_id, ingredients, directions) 
VALUES ('Gazpacho', 1, '{"tomatoes", "cucumbers", "bell peppers", "garlic", "bread", "olive oil", "vinegar", "water", "salt", "pepper"}', '{"1. Soak bread in water for 10 minutes...", "2. Blend vegetables, garlic, and bread...", "3. Add olive oil and vinegar...", "4. Season with salt and pepper...", "5. Chill in the refrigerator..." }');

INSERT INTO recipes (recipe_name, cookbook_id, ingredients, directions) 
VALUES ('Tortilla Española', 1, '{"potatoes", "onions", "eggs", "olive oil", "salt", "pepper"}', '{"1. Heat oil in a large skillet over medium heat...", "2. Add potatoes and onions...", "3. Whisk eggs in a bowl and season with salt and pepper...", "4. Add the egg mixture to the skillet...", "5. Cook until set on the bottom...", "6. Flip the tortilla with a plate...", "7. Cook until set on the other side..." }');


SELECT r.recipe_name, r.ingredients, r.directions
FROM recipes r
JOIN cookbooks c ON c.cookbook_id = r.cookbook_id
JOIN users u ON u.user_id = c.user_id
WHERE c.cookbook_name = 'Spanish Fiesta' AND u.user_name = 'Lise';

-- Adding unique constraints to username and email 
ALTER TABLE users ADD CONSTRAINT unique_user_email UNIQUE (user_name, email);
