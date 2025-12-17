// Script to generate 100 diverse recipes for seeding
export const generate100Recipes = (users) => {
    const recipes = [];

    // Recipe templates with variations
    const recipeData = [
        // Indian Cuisine (20 recipes)
        { title: 'Butter Chicken', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 40, cookTime: 30, servings: 4, calories: 480 },
        { title: 'Palak Paneer', cuisine: 'Indian', category: 'Lunch', difficulty: 'Easy', prepTime: 20, cookTime: 25, servings: 4, calories: 320 },
        { title: 'Chole Bhature', cuisine: 'Indian', category: 'Breakfast', difficulty: 'Hard', prepTime: 30, cookTime: 45, servings: 6, calories: 520 },
        { title: 'Biryani', cuisine: 'Indian', category: 'Dinner', difficulty: 'Hard', prepTime: 45, cookTime: 60, servings: 6, calories: 550 },
        { title: 'Masala Dosa', cuisine: 'Indian', category: 'Breakfast', difficulty: 'Medium', prepTime: 30, cookTime: 20, servings: 4, calories: 350 },
        { title: 'Tandoori Chicken', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 120, cookTime: 30, servings: 4, calories: 420 },
        { title: 'Samosa', cuisine: 'Indian', category: 'Snack', difficulty: 'Medium', prepTime: 40, cookTime: 20, servings: 8, calories: 280 },
        { title: 'Paneer Tikka', cuisine: 'Indian', category: 'Snack', difficulty: 'Easy', prepTime: 30, cookTime: 15, servings: 4, calories: 320 },
        { title: 'Dal Makhani', cuisine: 'Indian', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 45, servings: 6, calories: 290 },
        { title: 'Aloo Gobi', cuisine: 'Indian', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 25, servings: 4, calories: 210 },
        { title: 'Rogan Josh', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 4, calories: 480 },
        { title: 'Pav Bhaji', cuisine: 'Indian', category: 'Snack', difficulty: 'Easy', prepTime: 20, cookTime: 30, servings: 4, calories: 380 },
        { title: 'Idli Sambar', cuisine: 'Indian', category: 'Breakfast', difficulty: 'Medium', prepTime: 480, cookTime: 30, servings: 4, calories: 250 },
        { title: 'Chicken Korma', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 35, servings: 4, calories: 450 },
        { title: 'Malai Kofta', cuisine: 'Indian', category: 'Dinner', difficulty: 'Hard', prepTime: 35, cookTime: 30, servings: 4, calories: 420 },
        { title: 'Vada Pav', cuisine: 'Indian', category: 'Snack', difficulty: 'Medium', prepTime: 25, cookTime: 20, servings: 4, calories: 340 },
        { title: 'Rajma Chawal', cuisine: 'Indian', category: 'Lunch', difficulty: 'Easy', prepTime: 480, cookTime: 40, servings: 4, calories: 380 },
        { title: 'Gulab Jamun', cuisine: 'Indian', category: 'Dessert', difficulty: 'Medium', prepTime: 20, cookTime: 30, servings: 12, calories: 220 },
        { title: 'Kheer', cuisine: 'Indian', category: 'Dessert', difficulty: 'Easy', prepTime: 10, cookTime: 40, servings: 6, calories: 280 },
        { title: 'Pani Puri', cuisine: 'Indian', category: 'Snack', difficulty: 'Medium', prepTime: 30, cookTime: 15, servings: 6, calories: 180 },

        // Italian Cuisine (20 recipes)
        { title: 'Margherita Pizza', cuisine: 'Italian', category: 'Dinner', difficulty: 'Easy', prepTime: 20, cookTime: 15, servings: 2, calories: 380 },
        { title: 'Spaghetti Carbonara', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 10, cookTime: 20, servings: 4, calories: 550 },
        { title: 'Lasagna', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 8, calories: 450 },
        { title: 'Risotto', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 10, cookTime: 30, servings: 4, calories: 380 },
        { title: 'Fettuccine Alfredo', cuisine: 'Italian', category: 'Dinner', difficulty: 'Easy', prepTime: 10, cookTime: 20, servings: 4, calories: 520 },
        { title: 'Penne Arrabbiata', cuisine: 'Italian', category: 'Dinner', difficulty: 'Easy', prepTime: 10, cookTime: 25, servings: 4, calories: 420 },
        { title: 'Caprese Salad', cuisine: 'Italian', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 0, servings: 4, calories: 180 },
        { title: 'Bruschetta', cuisine: 'Italian', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 5, servings: 6, calories: 150 },
        { title: 'Tiramisu', cuisine: 'Italian', category: 'Dessert', difficulty: 'Medium', prepTime: 30, cookTime: 0, servings: 8, calories: 380 },
        { title: 'Panna Cotta', cuisine: 'Italian', category: 'Dessert', difficulty: 'Easy', prepTime: 15, cookTime: 5, servings: 6, calories: 320 },
        { title: 'Osso Buco', cuisine: 'Italian', category: 'Dinner', difficulty: 'Hard', prepTime: 30, cookTime: 120, servings: 4, calories: 580 },
        { title: 'Minestrone Soup', cuisine: 'Italian', category: 'Lunch', difficulty: 'Easy', prepTime: 20, cookTime: 40, servings: 6, calories: 220 },
        { title: 'Gnocchi', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 60, cookTime: 15, servings: 4, calories: 380 },
        { title: 'Ravioli', cuisine: 'Italian', category: 'Dinner', difficulty: 'Hard', prepTime: 90, cookTime: 15, servings: 4, calories: 420 },
        { title: 'Focaccia Bread', cuisine: 'Italian', category: 'Snack', difficulty: 'Medium', prepTime: 120, cookTime: 25, servings: 8, calories: 280 },
        { title: 'Cannoli', cuisine: 'Italian', category: 'Dessert', difficulty: 'Medium', prepTime: 45, cookTime: 15, servings: 12, calories: 340 },
        { title: 'Gelato', cuisine: 'Italian', category: 'Dessert', difficulty: 'Medium', prepTime: 30, cookTime: 20, servings: 8, calories: 250 },
        { title: 'Calzone', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 20, servings: 4, calories: 520 },
        { title: 'Pasta Primavera', cuisine: 'Italian', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 380 },
        { title: 'Saltimbocca', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 4, calories: 450 },

        // Chinese Cuisine (15 recipes)
        { title: 'Kung Pao Chicken', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 4, calories: 420 },
        { title: 'Fried Rice', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 340 },
        { title: 'Sweet and Sour Pork', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 20, servings: 4, calories: 480 },
        { title: 'Chow Mein', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 15, servings: 4, calories: 380 },
        { title: 'Spring Rolls', cuisine: 'Chinese', category: 'Snack', difficulty: 'Medium', prepTime: 30, cookTime: 15, servings: 8, calories: 220 },
        { title: 'Mapo Tofu', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 320 },
        { title: 'Peking Duck', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Hard', prepTime: 240, cookTime: 90, servings: 6, calories: 580 },
        { title: 'Dumplings', cuisine: 'Chinese', category: 'Snack', difficulty: 'Medium', prepTime: 45, cookTime: 15, servings: 6, calories: 280 },
        { title: 'Hot and Sour Soup', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 180 },
        { title: 'General Tso Chicken', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 20, servings: 4, calories: 520 },
        { title: 'Egg Drop Soup', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 150 },
        { title: 'Mongolian Beef', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 4, calories: 480 },
        { title: 'Wonton Soup', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Medium', prepTime: 35, cookTime: 20, servings: 4, calories: 240 },
        { title: 'Char Siu', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 120, cookTime: 30, servings: 6, calories: 420 },
        { title: 'Congee', cuisine: 'Chinese', category: 'Breakfast', difficulty: 'Easy', prepTime: 10, cookTime: 60, servings: 4, calories: 220 },

        // Mexican Cuisine (15 recipes)
        { title: 'Chicken Tacos', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 380 },
        { title: 'Beef Burrito', cuisine: 'Mexican', category: 'Lunch', difficulty: 'Easy', prepTime: 20, cookTime: 25, servings: 4, calories: 520 },
        { title: 'Quesadilla', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 10, servings: 2, calories: 420 },
        { title: 'Enchiladas', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 30, servings: 6, calories: 450 },
        { title: 'Guacamole', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 0, servings: 4, calories: 180 },
        { title: 'Salsa', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 0, servings: 6, calories: 50 },
        { title: 'Nachos', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 480 },
        { title: 'Fajitas', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Easy', prepTime: 20, cookTime: 20, servings: 4, calories: 420 },
        { title: 'Tamales', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Hard', prepTime: 120, cookTime: 90, servings: 12, calories: 380 },
        { title: 'Churros', cuisine: 'Mexican', category: 'Dessert', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 8, calories: 320 },
        { title: 'Pozole', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 120, servings: 8, calories: 380 },
        { title: 'Tostadas', cuisine: 'Mexican', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 10, servings: 4, calories: 340 },
        { title: 'Elote', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 220 },
        { title: 'Ceviche', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 120, cookTime: 0, servings: 4, calories: 180 },
        { title: 'Tres Leches Cake', cuisine: 'Mexican', category: 'Dessert', difficulty: 'Medium', prepTime: 30, cookTime: 35, servings: 12, calories: 420 },

        // American Cuisine (10 recipes)
        { title: 'Classic Burger', cuisine: 'American', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 15, servings: 4, calories: 580 },
        { title: 'Mac and Cheese', cuisine: 'American', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 25, servings: 6, calories: 480 },
        { title: 'BBQ Ribs', cuisine: 'American', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 180, servings: 4, calories: 620 },
        { title: 'Fried Chicken', cuisine: 'American', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 25, servings: 6, calories: 540 },
        { title: 'Chocolate Brownies', cuisine: 'American', category: 'Dessert', difficulty: 'Easy', prepTime: 15, cookTime: 30, servings: 12, calories: 280 },
        { title: 'Apple Pie', cuisine: 'American', category: 'Dessert', difficulty: 'Medium', prepTime: 45, cookTime: 50, servings: 8, calories: 380 },
        { title: 'Pancakes', cuisine: 'American', category: 'Breakfast', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 320 },
        { title: 'Buffalo Wings', cuisine: 'American', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 30, servings: 6, calories: 420 },
        { title: 'Clam Chowder', cuisine: 'American', category: 'Lunch', difficulty: 'Medium', prepTime: 20, cookTime: 30, servings: 6, calories: 380 },
        { title: 'Cheesecake', cuisine: 'American', category: 'Dessert', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 12, calories: 450 },

        // Thai Cuisine (10 recipes)
        { title: 'Pad Thai', cuisine: 'Thai', category: 'Dinner', difficulty: 'Medium', prepTime: 35, cookTime: 15, servings: 4, calories: 450 },
        { title: 'Green Curry', cuisine: 'Thai', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 30, servings: 4, calories: 420 },
        { title: 'Tom Yum Soup', cuisine: 'Thai', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 180 },
        { title: 'Massaman Curry', cuisine: 'Thai', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 45, servings: 6, calories: 480 },
        { title: 'Som Tam', cuisine: 'Thai', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 0, servings: 4, calories: 150 },
        { title: 'Pad See Ew', cuisine: 'Thai', category: 'Dinner', difficulty: 'Easy', prepTime: 20, cookTime: 15, servings: 4, calories: 420 },
        { title: 'Thai Basil Chicken', cuisine: 'Thai', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 15, servings: 4, calories: 380 },
        { title: 'Mango Sticky Rice', cuisine: 'Thai', category: 'Dessert', difficulty: 'Easy', prepTime: 30, cookTime: 25, servings: 4, calories: 320 },
        { title: 'Satay', cuisine: 'Thai', category: 'Snack', difficulty: 'Medium', prepTime: 60, cookTime: 15, servings: 6, calories: 280 },
        { title: 'Larb', cuisine: 'Thai', category: 'Lunch', difficulty: 'Easy', prepTime: 20, cookTime: 10, servings: 4, calories: 320 },

        // Japanese Cuisine (10 recipes)
        { title: 'Chicken Teriyaki', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Easy', prepTime: 35, cookTime: 20, servings: 4, calories: 380 },
        { title: 'Sushi Rolls', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Hard', prepTime: 60, cookTime: 30, servings: 4, calories: 320 },
        { title: 'Ramen', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 4, calories: 480 },
        { title: 'Tempura', cuisine: 'Japanese', category: 'Snack', difficulty: 'Medium', prepTime: 25, cookTime: 15, servings: 4, calories: 380 },
        { title: 'Miso Soup', cuisine: 'Japanese', category: 'Lunch', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 120 },
        { title: 'Tonkatsu', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Medium', prepTime: 20, cookTime: 20, servings: 4, calories: 520 },
        { title: 'Okonomiyaki', cuisine: 'Japanese', category: 'Lunch', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 4, calories: 380 },
        { title: 'Gyoza', cuisine: 'Japanese', category: 'Snack', difficulty: 'Medium', prepTime: 45, cookTime: 15, servings: 6, calories: 280 },
        { title: 'Yakitori', cuisine: 'Japanese', category: 'Snack', difficulty: 'Easy', prepTime: 30, cookTime: 15, servings: 4, calories: 320 },
        { title: 'Matcha Ice Cream', cuisine: 'Japanese', category: 'Dessert', difficulty: 'Easy', prepTime: 20, cookTime: 15, servings: 6, calories: 240 },
    ];

    // Generate recipes with basic structure
    recipeData.forEach((data, index) => {
        const userIndex = index % users.length;
        const isFeatured = index < 15; // First 15 are featured

        recipes.push({
            title: data.title,
            description: `Delicious ${data.title} - a ${data.difficulty.toLowerCase()} ${data.cuisine} ${data.category.toLowerCase()} recipe perfect for any occasion.`,
            ingredients: [
                { name: 'Main ingredient', quantity: '500g' },
                { name: 'Spices', quantity: '2 tbsp' },
                { name: 'Oil', quantity: '2 tbsp' },
                { name: 'Salt', quantity: 'to taste' }
            ],
            steps: [
                { stepNumber: 1, instruction: 'Prepare all ingredients.' },
                { stepNumber: 2, instruction: 'Cook the main ingredient.' },
                { stepNumber: 3, instruction: 'Add spices and seasonings.' },
                { stepNumber: 4, instruction: 'Serve hot and enjoy!' }
            ],
            cuisine: data.cuisine,
            category: data.category,
            prepTime: data.prepTime,
            cookTime: data.cookTime,
            servings: data.servings,
            calories: data.calories,
            difficulty: data.difficulty,
            image: `https://images.unsplash.com/photo-${1500000000000 + index}?w=800`,
            createdBy: users[userIndex]._id,
            isFeatured: isFeatured
        });
    });

    return recipes;
};
