import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

export const seedDatabase = async () => {
    try {
        // Create multiple users
        const users = [];

        // Check if admin already exists
        let admin = await User.findOne({ email: 'admin@cookverse.ai' });
        if (!admin) {
            admin = await User.create({
                name: 'Admin',
                email: 'admin@cookverse.ai',
                password: 'Admin@123',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?background=6366f1&color=fff&name=Admin'
            });
            console.log('✅ Default admin created: admin@cookverse.ai / Admin@123');
        }
        users.push(admin);

        // Create additional users if they don't exist
        const additionalUsers = [
            { name: 'Sarah Johnson', email: 'sarah@example.com', password: 'User@123' },
            { name: 'Raj Patel', email: 'raj@example.com', password: 'User@123' },
            { name: 'Maria Garcia', email: 'maria@example.com', password: 'User@123' },
            { name: 'John Smith', email: 'john@example.com', password: 'User@123' },
            { name: 'Emily Chen', email: 'emily@example.com', password: 'User@123' }
        ];

        for (const userData of additionalUsers) {
            let user = await User.findOne({ email: userData.email });
            if (!user) {
                user = await User.create(userData);
                console.log(`✅ User created: ${userData.email}`);
            }
            users.push(user);
        }

        // Check if recipes already exist
        const recipeCount = await Recipe.countDocuments();

        if (recipeCount < 100) {
            // Clear existing recipes to reseed
            await Recipe.deleteMany({});

            const recipes = [
                // Indian Recipes
                {
                    title: 'Butter Chicken',
                    description: 'Tender chicken pieces in a rich, creamy tomato-based curry with aromatic spices.',
                    ingredients: [
                        { name: 'Chicken breast', quantity: '500g, cubed' },
                        { name: 'Butter', quantity: '4 tbsp' },
                        { name: 'Tomato puree', quantity: '2 cups' },
                        { name: 'Heavy cream', quantity: '1 cup' },
                        { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
                        { name: 'Garam masala', quantity: '2 tsp' },
                        { name: 'Kasuri methi', quantity: '1 tbsp' },
                        { name: 'Yogurt', quantity: '1/2 cup' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Marinate chicken in yogurt, ginger-garlic paste, and spices for 30 minutes.' },
                        { stepNumber: 2, instruction: 'Grill or pan-fry the marinated chicken until cooked.' },
                        { stepNumber: 3, instruction: 'In a pan, melt butter and add tomato puree with spices.' },
                        { stepNumber: 4, instruction: 'Add cream and kasuri methi, simmer for 10 minutes.' },
                        { stepNumber: 5, instruction: 'Add cooked chicken and simmer for 5 more minutes.' },
                        { stepNumber: 6, instruction: 'Serve hot with naan or rice.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Dinner',
                    prepTime: 40,
                    cookTime: 30,
                    servings: 4,
                    calories: 480,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
                    createdBy: users[1]._id,
                    isFeatured: true
                },
                {
                    title: 'Palak Paneer',
                    description: 'Fresh spinach curry with soft paneer cubes in a flavorful gravy.',
                    ingredients: [
                        { name: 'Spinach', quantity: '500g, chopped' },
                        { name: 'Paneer', quantity: '250g, cubed' },
                        { name: 'Onions', quantity: '2, chopped' },
                        { name: 'Tomatoes', quantity: '2, chopped' },
                        { name: 'Cream', quantity: '1/4 cup' },
                        { name: 'Cumin seeds', quantity: '1 tsp' },
                        { name: 'Garam masala', quantity: '1 tsp' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Blanch spinach in boiling water for 2 minutes, then blend into puree.' },
                        { stepNumber: 2, instruction: 'Sauté cumin seeds, onions, and tomatoes until soft.' },
                        { stepNumber: 3, instruction: 'Add spinach puree and spices, cook for 10 minutes.' },
                        { stepNumber: 4, instruction: 'Add paneer cubes and cream, simmer for 5 minutes.' },
                        { stepNumber: 5, instruction: 'Serve hot with roti or rice.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Lunch',
                    prepTime: 20,
                    cookTime: 25,
                    servings: 4,
                    calories: 320,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
                    createdBy: users[2]._id,
                    isFeatured: true
                },
                {
                    title: 'Chole Bhature',
                    description: 'Spicy chickpea curry served with fluffy deep-fried bread.',
                    ingredients: [
                        { name: 'Chickpeas', quantity: '2 cups, soaked' },
                        { name: 'Onions', quantity: '2, chopped' },
                        { name: 'Tomatoes', quantity: '3, pureed' },
                        { name: 'Chole masala', quantity: '2 tbsp' },
                        { name: 'All-purpose flour', quantity: '3 cups' },
                        { name: 'Yogurt', quantity: '1/2 cup' },
                        { name: 'Oil', quantity: 'for frying' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Pressure cook chickpeas with salt until soft.' },
                        { stepNumber: 2, instruction: 'Sauté onions, add tomato puree and chole masala.' },
                        { stepNumber: 3, instruction: 'Add cooked chickpeas and simmer for 15 minutes.' },
                        { stepNumber: 4, instruction: 'For bhature: knead flour with yogurt, salt, and water.' },
                        { stepNumber: 5, instruction: 'Roll into circles and deep fry until puffed and golden.' },
                        { stepNumber: 6, instruction: 'Serve hot chole with bhature and pickles.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Breakfast',
                    prepTime: 30,
                    cookTime: 45,
                    servings: 6,
                    calories: 520,
                    difficulty: 'Hard',
                    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800',
                    createdBy: users[3]._id,
                    isFeatured: false
                },

                // Italian Recipes
                {
                    title: 'Margherita Pizza',
                    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
                    ingredients: [
                        { name: 'Pizza dough', quantity: '1 ball' },
                        { name: 'Tomato sauce', quantity: '1 cup' },
                        { name: 'Fresh mozzarella', quantity: '200g, sliced' },
                        { name: 'Fresh basil', quantity: '1 handful' },
                        { name: 'Olive oil', quantity: '2 tbsp' },
                        { name: 'Salt', quantity: 'to taste' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Preheat oven to 475°F (245°C).' },
                        { stepNumber: 2, instruction: 'Roll out pizza dough into a circle.' },
                        { stepNumber: 3, instruction: 'Spread tomato sauce evenly over the dough.' },
                        { stepNumber: 4, instruction: 'Add mozzarella slices and drizzle with olive oil.' },
                        { stepNumber: 5, instruction: 'Bake for 12-15 minutes until crust is golden.' },
                        { stepNumber: 6, instruction: 'Top with fresh basil and serve hot.' }
                    ],
                    cuisine: 'Italian',
                    category: 'Dinner',
                    prepTime: 20,
                    cookTime: 15,
                    servings: 2,
                    calories: 380,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
                    createdBy: users[4]._id,
                    isFeatured: true
                },
                {
                    title: 'Spaghetti Carbonara',
                    description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
                    ingredients: [
                        { name: 'Spaghetti', quantity: '400g' },
                        { name: 'Bacon', quantity: '200g, diced' },
                        { name: 'Eggs', quantity: '4 large' },
                        { name: 'Parmesan cheese', quantity: '1 cup, grated' },
                        { name: 'Black pepper', quantity: '2 tsp' },
                        { name: 'Garlic', quantity: '2 cloves, minced' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Cook spaghetti according to package instructions.' },
                        { stepNumber: 2, instruction: 'Fry bacon until crispy, add garlic.' },
                        { stepNumber: 3, instruction: 'Beat eggs with parmesan and black pepper.' },
                        { stepNumber: 4, instruction: 'Drain pasta, reserving 1 cup pasta water.' },
                        { stepNumber: 5, instruction: 'Mix hot pasta with bacon, then add egg mixture off heat.' },
                        { stepNumber: 6, instruction: 'Toss quickly, adding pasta water if needed. Serve immediately.' }
                    ],
                    cuisine: 'Italian',
                    category: 'Dinner',
                    prepTime: 10,
                    cookTime: 20,
                    servings: 4,
                    calories: 550,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
                    createdBy: users[5]._id,
                    isFeatured: false
                },
                {
                    title: 'Lasagna',
                    description: 'Layered pasta with rich meat sauce and creamy béchamel.',
                    ingredients: [
                        { name: 'Lasagna sheets', quantity: '12' },
                        { name: 'Ground beef', quantity: '500g' },
                        { name: 'Tomato sauce', quantity: '800g' },
                        { name: 'Mozzarella cheese', quantity: '400g' },
                        { name: 'Parmesan cheese', quantity: '100g' },
                        { name: 'Milk', quantity: '500ml' },
                        { name: 'Butter', quantity: '50g' },
                        { name: 'Flour', quantity: '50g' }
                    ],
                    steps: [
                        {
                            stepNumber: 1,
                            instruction: 'Brown ground beef with onions and garlic',
                            duration: 420,
                            aiTips: ['Use medium-high heat', 'Break up meat as it cooks', 'Season with salt and pepper']
                        },
                        {
                            stepNumber: 2,
                            instruction: 'Add tomato sauce and simmer for 20 minutes',
                            duration: 1200,
                            aiTips: ['Stir occasionally', 'Add Italian herbs', 'Taste and adjust seasoning']
                        },
                        {
                            stepNumber: 3,
                            instruction: 'Prepare béchamel sauce with butter, flour, and milk',
                            duration: 600,
                            aiTips: ['Whisk constantly to avoid lumps', 'Cook until thick and creamy']
                        },
                        {
                            stepNumber: 4,
                            instruction: 'Layer pasta, meat sauce, béchamel, and cheese',
                            duration: 480,
                            aiTips: ['Start with meat sauce on bottom', 'Repeat layers 3-4 times', 'Top with extra cheese']
                        },
                        {
                            stepNumber: 5,
                            instruction: 'Bake at 180°C for 30-35 minutes',
                            duration: 2100,
                            aiTips: ['Cover with foil for first 20 minutes', 'Remove foil to brown the top', 'Let rest 10 minutes before serving']
                        },
                        {
                            stepNumber: 6,
                            instruction: 'Let rest for 10 minutes before serving',
                            duration: 600,
                            aiTips: ['This helps layers set', 'Easier to cut clean slices']
                        }
                    ],
                    cuisine: 'Italian',
                    category: 'Dinner',
                    prepTime: 30,
                    cookTime: 60,
                    servings: 8,
                    calories: 450,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
                    createdBy: users[1]._id,
                    isFeatured: true
                },

                // Chinese Recipes
                {
                    title: 'Kung Pao Chicken',
                    description: 'Spicy stir-fried chicken with peanuts and vegetables.',
                    ingredients: [
                        { name: 'Chicken breast', quantity: '500g, cubed' },
                        { name: 'Peanuts', quantity: '1/2 cup' },
                        { name: 'Bell peppers', quantity: '2, diced' },
                        { name: 'Dried red chilies', quantity: '8-10' },
                        { name: 'Soy sauce', quantity: '3 tbsp' },
                        { name: 'Rice vinegar', quantity: '2 tbsp' },
                        { name: 'Cornstarch', quantity: '1 tbsp' },
                        { name: 'Ginger', quantity: '1 inch, minced' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Marinate chicken with soy sauce and cornstarch for 15 minutes.' },
                        { stepNumber: 2, instruction: 'Heat oil in wok, stir-fry chicken until golden.' },
                        { stepNumber: 3, instruction: 'Add dried chilies, ginger, and bell peppers.' },
                        { stepNumber: 4, instruction: 'Add sauce mixture and stir-fry for 2 minutes.' },
                        { stepNumber: 5, instruction: 'Add peanuts and toss well.' },
                        { stepNumber: 6, instruction: 'Serve hot with steamed rice.' }
                    ],
                    cuisine: 'Chinese',
                    category: 'Dinner',
                    prepTime: 20,
                    cookTime: 15,
                    servings: 4,
                    calories: 420,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
                    createdBy: users[2]._id,
                    isFeatured: false
                },
                {
                    title: 'Fried Rice',
                    description: 'Classic Chinese fried rice with vegetables and eggs.',
                    ingredients: [
                        { name: 'Cooked rice', quantity: '4 cups, day-old' },
                        { name: 'Eggs', quantity: '3, beaten' },
                        { name: 'Mixed vegetables', quantity: '2 cups' },
                        { name: 'Soy sauce', quantity: '3 tbsp' },
                        { name: 'Green onions', quantity: '4, chopped' },
                        { name: 'Garlic', quantity: '3 cloves, minced' },
                        { name: 'Sesame oil', quantity: '1 tbsp' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Heat oil in wok, scramble eggs and set aside.' },
                        { stepNumber: 2, instruction: 'Stir-fry garlic and vegetables until tender.' },
                        { stepNumber: 3, instruction: 'Add rice and break up any clumps.' },
                        { stepNumber: 4, instruction: 'Add soy sauce and sesame oil, stir well.' },
                        { stepNumber: 5, instruction: 'Add scrambled eggs and green onions.' },
                        { stepNumber: 6, instruction: 'Toss everything together and serve hot.' }
                    ],
                    cuisine: 'Chinese',
                    category: 'Lunch',
                    prepTime: 10,
                    cookTime: 15,
                    servings: 4,
                    calories: 340,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
                    createdBy: users[3]._id,
                    isFeatured: false
                },

                // Mexican Recipes
                {
                    title: 'Chicken Tacos',
                    description: 'Soft tacos filled with seasoned chicken, fresh veggies, and salsa.',
                    ingredients: [
                        { name: 'Chicken breast', quantity: '500g, shredded' },
                        { name: 'Taco shells', quantity: '12' },
                        { name: 'Lettuce', quantity: '2 cups, shredded' },
                        { name: 'Tomatoes', quantity: '2, diced' },
                        { name: 'Cheese', quantity: '1 cup, shredded' },
                        { name: 'Sour cream', quantity: '1/2 cup' },
                        { name: 'Taco seasoning', quantity: '2 tbsp' },
                        { name: 'Lime', quantity: '2, cut into wedges' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Cook chicken with taco seasoning until done.' },
                        { stepNumber: 2, instruction: 'Warm taco shells in oven.' },
                        { stepNumber: 3, instruction: 'Fill shells with chicken, lettuce, and tomatoes.' },
                        { stepNumber: 4, instruction: 'Top with cheese and sour cream.' },
                        { stepNumber: 5, instruction: 'Serve with lime wedges.' }
                    ],
                    cuisine: 'Mexican',
                    category: 'Dinner',
                    prepTime: 15,
                    cookTime: 20,
                    servings: 4,
                    calories: 380,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
                    createdBy: users[4]._id,
                    isFeatured: true
                },
                {
                    title: 'Chicken Tikka Masala',
                    description: 'Grilled chicken chunks in a creamy spiced tomato sauce.',
                    ingredients: [
                        { name: 'Chicken breast', quantity: '600g, cubed' },
                        { name: 'Yogurt', quantity: '1 cup' },
                        { name: 'Tikka masala', quantity: '3 tbsp' },
                        { name: 'Tomato sauce', quantity: '2 cups' },
                        { name: 'Heavy cream', quantity: '1/2 cup' },
                        { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
                        { name: 'Butter', quantity: '3 tbsp' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Marinate chicken in yogurt and tikka masala for 2 hours.' },
                        { stepNumber: 2, instruction: 'Grill chicken pieces until charred and cooked through.' },
                        { stepNumber: 3, instruction: 'Prepare sauce with tomatoes, cream, and spices.' },
                        { stepNumber: 4, instruction: 'Add grilled chicken to sauce and simmer for 10 minutes.' },
                        { stepNumber: 5, instruction: 'Garnish with cream and serve with naan.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Dinner',
                    prepTime: 130,
                    cookTime: 30,
                    servings: 4,
                    calories: 450,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
                    createdBy: users[0]._id,
                    isFeatured: false
                },
                {
                    title: 'Hyderabadi Biryani',
                    description: 'Aromatic rice layered with spiced meat and saffron.',
                    ingredients: [
                        { name: 'Basmati rice', quantity: '2 cups' },
                        { name: 'Chicken/Mutton', quantity: '500g' },
                        { name: 'Yogurt', quantity: '1 cup' },
                        { name: 'Onions', quantity: '3, sliced' },
                        { name: 'Saffron', quantity: '1/4 tsp' },
                        { name: 'Biryani masala', quantity: '3 tbsp' },
                        { name: 'Mint leaves', quantity: '1/2 cup' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Marinate meat with yogurt and spices for 1 hour.' },
                        { stepNumber: 2, instruction: 'Partially cook rice with whole spices.' },
                        { stepNumber: 3, instruction: 'Layer rice and meat in a heavy pot.' },
                        { stepNumber: 4, instruction: 'Cook on dum (low heat) for 45 minutes.' },
                        { stepNumber: 5, instruction: 'Serve hot with raita and salan.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Dinner',
                    prepTime: 90,
                    cookTime: 60,
                    servings: 6,
                    calories: 580,
                    difficulty: 'Hard',
                    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800',
                    createdBy: users[1]._id,
                    isFeatured: false
                },
                {
                    title: 'Aloo Paratha',
                    description: 'Whole wheat flatbread stuffed with spiced potato filling.',
                    ingredients: [
                        { name: 'Whole wheat flour', quantity: '2 cups' },
                        { name: 'Potatoes', quantity: '3, boiled and mashed' },
                        { name: 'Green chilies', quantity: '2, chopped' },
                        { name: 'Coriander leaves', quantity: '1/4 cup' },
                        { name: 'Cumin powder', quantity: '1 tsp' },
                        { name: 'Ghee', quantity: 'for cooking' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Mix mashed potatoes with spices and herbs.' },
                        { stepNumber: 2, instruction: 'Make dough with wheat flour and water.' },
                        { stepNumber: 3, instruction: 'Roll out dough, add filling, and seal.' },
                        { stepNumber: 4, instruction: 'Cook on griddle with ghee until golden.' },
                        { stepNumber: 5, instruction: 'Serve hot with yogurt and pickle.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Breakfast',
                    prepTime: 25,
                    cookTime: 20,
                    servings: 4,
                    calories: 320,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800',
                    createdBy: users[2]._id,
                    isFeatured: false
                },
                {
                    title: 'Masala Dosa',
                    description: 'Crispy rice crepe filled with spiced potato masala.',
                    ingredients: [
                        { name: 'Dosa batter', quantity: '2 cups' },
                        { name: 'Potatoes', quantity: '4, boiled' },
                        { name: 'Onions', quantity: '2, chopped' },
                        { name: 'Mustard seeds', quantity: '1 tsp' },
                        { name: 'Curry leaves', quantity: '10-12' },
                        { name: 'Turmeric', quantity: '1/2 tsp' },
                        { name: 'Oil', quantity: 'for cooking' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Prepare potato masala with spices and onions.' },
                        { stepNumber: 2, instruction: 'Heat griddle and spread dosa batter thinly.' },
                        { stepNumber: 3, instruction: 'Cook until crispy and golden.' },
                        { stepNumber: 4, instruction: 'Add potato filling and fold dosa.' },
                        { stepNumber: 5, instruction: 'Serve with sambar and coconut chutney.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Breakfast',
                    prepTime: 30,
                    cookTime: 20,
                    servings: 4,
                    calories: 280,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
                    createdBy: users[3]._id,
                    isFeatured: false
                },
                {
                    title: 'Medu Vada',
                    description: 'Crispy fried lentil donuts, a South Indian favorite.',
                    ingredients: [
                        { name: 'Urad dal', quantity: '1 cup, soaked' },
                        { name: 'Green chilies', quantity: '2' },
                        { name: 'Ginger', quantity: '1 inch' },
                        { name: 'Curry leaves', quantity: '10' },
                        { name: 'Black pepper', quantity: '1 tsp' },
                        { name: 'Oil', quantity: 'for deep frying' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Grind soaked urad dal to a fluffy batter.' },
                        { stepNumber: 2, instruction: 'Add chilies, ginger, and spices to batter.' },
                        { stepNumber: 3, instruction: 'Shape into donuts with a hole in center.' },
                        { stepNumber: 4, instruction: 'Deep fry until golden and crispy.' },
                        { stepNumber: 5, instruction: 'Serve hot with sambar and chutney.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Snack',
                    prepTime: 480,
                    cookTime: 20,
                    servings: 6,
                    calories: 220,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
                    createdBy: users[4]._id,
                    isFeatured: false
                },
                {
                    title: 'Dhokla',
                    description: 'Steamed savory cake made from fermented chickpea batter.',
                    ingredients: [
                        { name: 'Gram flour', quantity: '1 cup' },
                        { name: 'Yogurt', quantity: '1/2 cup' },
                        { name: 'Eno fruit salt', quantity: '1 tsp' },
                        { name: 'Mustard seeds', quantity: '1 tsp' },
                        { name: 'Green chilies', quantity: '2' },
                        { name: 'Curry leaves', quantity: '8-10' },
                        { name: 'Sugar', quantity: '1 tbsp' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Mix gram flour, yogurt, and spices into batter.' },
                        { stepNumber: 2, instruction: 'Add eno salt just before steaming.' },
                        { stepNumber: 3, instruction: 'Steam for 15-20 minutes until cooked.' },
                        { stepNumber: 4, instruction: 'Temper with mustard seeds and curry leaves.' },
                        { stepNumber: 5, instruction: 'Cut into pieces and serve with chutney.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Snack',
                    prepTime: 15,
                    cookTime: 25,
                    servings: 4,
                    calories: 180,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800',
                    createdBy: users[5]._id,
                    isFeatured: false
                },
                {
                    title: 'Pani Puri',
                    description: 'Crispy hollow puris filled with spicy tangy water.',
                    ingredients: [
                        { name: 'Puri shells', quantity: '30 pieces' },
                        { name: 'Boiled potatoes', quantity: '2, mashed' },
                        { name: 'Chickpeas', quantity: '1 cup, boiled' },
                        { name: 'Tamarind', quantity: '1/4 cup' },
                        { name: 'Mint leaves', quantity: '1 cup' },
                        { name: 'Chaat masala', quantity: '2 tsp' },
                        { name: 'Black salt', quantity: '1 tsp' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Prepare mint-coriander water with spices.' },
                        { stepNumber: 2, instruction: 'Make tamarind chutney.' },
                        { stepNumber: 3, instruction: 'Mix potatoes and chickpeas with spices.' },
                        { stepNumber: 4, instruction: 'Fill puris with potato mixture.' },
                        { stepNumber: 5, instruction: 'Add flavored water and serve immediately.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Snack',
                    prepTime: 30,
                    cookTime: 0,
                    servings: 6,
                    calories: 150,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
                    createdBy: users[0]._id,
                    isFeatured: false
                },
                {
                    title: 'Jalebi',
                    description: 'Sweet crispy spirals soaked in sugar syrup.',
                    ingredients: [
                        { name: 'All-purpose flour', quantity: '1 cup' },
                        { name: 'Yogurt', quantity: '2 tbsp' },
                        { name: 'Sugar', quantity: '2 cups' },
                        { name: 'Saffron', quantity: 'a pinch' },
                        { name: 'Cardamom powder', quantity: '1/2 tsp' },
                        { name: 'Ghee', quantity: 'for frying' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Prepare batter with flour, yogurt, and water.' },
                        { stepNumber: 2, instruction: 'Ferment batter for 8-10 hours.' },
                        { stepNumber: 3, instruction: 'Make sugar syrup with saffron and cardamom.' },
                        { stepNumber: 4, instruction: 'Pipe batter in spirals and deep fry.' },
                        { stepNumber: 5, instruction: 'Soak in warm sugar syrup and serve.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Dessert',
                    prepTime: 600,
                    cookTime: 30,
                    servings: 8,
                    calories: 280,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
                    createdBy: users[1]._id,
                    isFeatured: false
                },
                {
                    title: 'Rasmalai',
                    description: 'Soft cheese dumplings in sweetened creamy milk.',
                    ingredients: [
                        { name: 'Paneer', quantity: '500g' },
                        { name: 'Milk', quantity: '1 liter' },
                        { name: 'Sugar', quantity: '1 cup' },
                        { name: 'Cardamom powder', quantity: '1/2 tsp' },
                        { name: 'Saffron', quantity: 'a few strands' },
                        { name: 'Pistachios', quantity: '2 tbsp, chopped' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Make soft paneer balls and flatten slightly.' },
                        { stepNumber: 2, instruction: 'Boil in sugar syrup until they double in size.' },
                        { stepNumber: 3, instruction: 'Prepare rabri with milk, sugar, and saffron.' },
                        { stepNumber: 4, instruction: 'Squeeze excess syrup from paneer and add to rabri.' },
                        { stepNumber: 5, instruction: 'Chill and garnish with nuts before serving.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Dessert',
                    prepTime: 30,
                    cookTime: 45,
                    servings: 6,
                    calories: 320,
                    difficulty: 'Hard',
                    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800',
                    createdBy: users[2]._id,
                    isFeatured: false
                },
                {
                    title: 'Kulfi',
                    description: 'Traditional Indian ice cream with cardamom and nuts.',
                    ingredients: [
                        { name: 'Full-fat milk', quantity: '1 liter' },
                        { name: 'Sugar', quantity: '3/4 cup' },
                        { name: 'Cardamom powder', quantity: '1 tsp' },
                        { name: 'Pistachios', quantity: '1/4 cup, chopped' },
                        { name: 'Almonds', quantity: '1/4 cup, chopped' },
                        { name: 'Saffron', quantity: 'a few strands' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Boil milk and reduce to half the quantity.' },
                        { stepNumber: 2, instruction: 'Add sugar, cardamom, and saffron.' },
                        { stepNumber: 3, instruction: 'Cool the mixture completely.' },
                        { stepNumber: 4, instruction: 'Pour into kulfi molds and freeze for 6-8 hours.' },
                        { stepNumber: 5, instruction: 'Unmold and garnish with nuts before serving.' }
                    ],
                    cuisine: 'Indian',
                    category: 'Dessert',
                    prepTime: 30,
                    cookTime: 45,
                    servings: 8,
                    calories: 250,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
                    createdBy: users[3]._id,
                    isFeatured: false
                },

                // American Recipes
                {
                    title: 'Classic Burger',
                    description: 'Juicy beef burger with all the fixings.',
                    ingredients: [
                        { name: 'Ground beef', quantity: '500g' },
                        { name: 'Burger buns', quantity: '4' },
                        { name: 'Lettuce', quantity: '4 leaves' },
                        { name: 'Tomatoes', quantity: '2, sliced' },
                        { name: 'Cheese slices', quantity: '4' },
                        { name: 'Pickles', quantity: '8 slices' },
                        { name: 'Onion', quantity: '1, sliced' },
                        { name: 'Ketchup and mustard', quantity: 'to taste' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Form beef into 4 patties, season with salt and pepper.' },
                        { stepNumber: 2, instruction: 'Grill or pan-fry patties for 4-5 minutes per side.' },
                        { stepNumber: 3, instruction: 'Add cheese in last minute of cooking.' },
                        { stepNumber: 4, instruction: 'Toast burger buns lightly.' },
                        { stepNumber: 5, instruction: 'Assemble: bun, lettuce, patty, cheese, tomato, pickles, onion.' },
                        { stepNumber: 6, instruction: 'Add condiments and top bun. Serve with fries.' }
                    ],
                    cuisine: 'American',
                    category: 'Lunch',
                    prepTime: 15,
                    cookTime: 15,
                    servings: 4,
                    calories: 580,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
                    createdBy: users[1]._id,
                    isFeatured: true
                },

                // Desserts
                {
                    title: 'Chocolate Brownies',
                    description: 'Rich, fudgy chocolate brownies with a crispy top.',
                    ingredients: [
                        { name: 'Dark chocolate', quantity: '200g' },
                        { name: 'Butter', quantity: '150g' },
                        { name: 'Sugar', quantity: '1 cup' },
                        { name: 'Eggs', quantity: '3' },
                        { name: 'All-purpose flour', quantity: '3/4 cup' },
                        { name: 'Cocoa powder', quantity: '1/4 cup' },
                        { name: 'Vanilla extract', quantity: '1 tsp' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Preheat oven to 350°F (175°C).' },
                        { stepNumber: 2, instruction: 'Melt chocolate and butter together.' },
                        { stepNumber: 3, instruction: 'Beat eggs with sugar until fluffy.' },
                        { stepNumber: 4, instruction: 'Mix in chocolate mixture and vanilla.' },
                        { stepNumber: 5, instruction: 'Fold in flour and cocoa powder.' },
                        { stepNumber: 6, instruction: 'Bake for 25-30 minutes. Cool before cutting.' }
                    ],
                    cuisine: 'American',
                    category: 'Dessert',
                    prepTime: 15,
                    cookTime: 30,
                    servings: 12,
                    calories: 280,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800',
                    createdBy: users[2]._id,
                    isFeatured: false
                },
                {
                    title: 'Tiramisu',
                    description: 'Classic Italian coffee-flavored dessert with mascarpone.',
                    ingredients: [
                        { name: 'Ladyfinger cookies', quantity: '24' },
                        { name: 'Mascarpone cheese', quantity: '500g' },
                        { name: 'Eggs', quantity: '4, separated' },
                        { name: 'Sugar', quantity: '3/4 cup' },
                        { name: 'Strong coffee', quantity: '2 cups, cooled' },
                        { name: 'Cocoa powder', quantity: 'for dusting' },
                        { name: 'Marsala wine', quantity: '2 tbsp (optional)' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Beat egg yolks with sugar until pale.' },
                        { stepNumber: 2, instruction: 'Mix in mascarpone until smooth.' },
                        { stepNumber: 3, instruction: 'Whip egg whites to stiff peaks, fold into mascarpone.' },
                        { stepNumber: 4, instruction: 'Dip ladyfingers in coffee, layer in dish.' },
                        { stepNumber: 5, instruction: 'Spread half the mascarpone mixture, repeat layers.' },
                        { stepNumber: 6, instruction: 'Dust with cocoa, refrigerate 4 hours before serving.' }
                    ],
                    cuisine: 'Italian',
                    category: 'Dessert',
                    prepTime: 30,
                    cookTime: 0,
                    servings: 8,
                    calories: 380,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
                    createdBy: users[3]._id,
                    isFeatured: true
                },

                // Thai Recipe
                {
                    title: 'Pad Thai',
                    description: 'Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce.',
                    ingredients: [
                        { name: 'Rice noodles', quantity: '200g' },
                        { name: 'Shrimp', quantity: '200g' },
                        { name: 'Eggs', quantity: '2' },
                        { name: 'Bean sprouts', quantity: '100g' },
                        { name: 'Peanuts', quantity: '50g' },
                        { name: 'Tamarind paste', quantity: '2 tbsp' },
                        { name: 'Fish sauce', quantity: '2 tbsp' },
                        { name: 'Sugar', quantity: '1 tbsp' },
                        { name: 'Garlic', quantity: '3 cloves' },
                        { name: 'Green onions', quantity: '2' }
                    ],
                    steps: [
                        {
                            stepNumber: 1,
                            instruction: 'Soak rice noodles in warm water for 30 minutes',
                            duration: 180,
                            media: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
                            aiTips: ['Use warm water, not hot', 'Noodles should be pliable but still firm'],
                            youtube: {
                                videoId: 'CYhW7pv0FTg',
                                startTime: 15,
                                endTime: 45,
                                autoPlay: true,
                                lockSeeking: false
                            }
                        },
                        {
                            stepNumber: 2,
                            instruction: 'Heat oil in wok and stir-fry shrimp until pink',
                            duration: 300,
                            media: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=400',
                            aiTips: ['High heat is essential', 'Don\'t overcook the shrimp'],
                            youtube: {
                                videoId: 'CYhW7pv0FTg',
                                startTime: 50,
                                endTime: 110,
                                autoPlay: true,
                                lockSeeking: false
                            }
                        },
                        {
                            stepNumber: 3,
                            instruction: 'Add noodles and sauce, toss everything together',
                            duration: 240,
                            aiTips: ['Keep tossing to prevent sticking', 'Add sauce gradually'],
                            youtube: {
                                videoId: 'CYhW7pv0FTg',
                                startTime: 115,
                                endTime: 175,
                                autoPlay: true,
                                lockSeeking: false
                            }
                        },
                        { stepNumber: 4, instruction: 'Add eggs, bean sprouts, and peanuts.' },
                        { stepNumber: 5, instruction: 'Serve hot with lime wedges.' }
                    ],
                    cuisine: 'Thai',
                    category: 'Dinner',
                    prepTime: 35,
                    cookTime: 15,
                    servings: 4,
                    calories: 450,
                    difficulty: 'Medium',
                    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
                    createdBy: users[4]._id,
                    isFeatured: true,
                    videoTutorial: {
                        youtubeUrl: 'https://www.youtube.com/watch?v=CYhW7pv0FTg',
                        duration: 420,
                        chapters: [
                            { title: 'Introduction', startTime: 0, endTime: 15, stepNumber: 0 },
                            { title: 'Preparing Noodles', startTime: 15, endTime: 50, stepNumber: 1 },
                            { title: 'Cooking Shrimp', startTime: 50, endTime: 115, stepNumber: 2 },
                            { title: 'Final Assembly', startTime: 115, endTime: 180, stepNumber: 3 }
                        ],
                        timers: [
                            { timestamp: 45, duration: 3, description: 'Check noodle texture' },
                            { timestamp: 100, duration: 5, description: 'Shrimp cooking time' }
                        ],
                        suggestedVideos: ['dQw4w9WgXcQ', 'jNQXAC9IVRw']
                    }
                },

                // Japanese Recipe
                {
                    title: 'Chicken Teriyaki',
                    description: 'Glazed chicken with sweet and savory teriyaki sauce.',
                    ingredients: [
                        { name: 'Chicken thighs', quantity: '6 pieces' },
                        { name: 'Soy sauce', quantity: '1/2 cup' },
                        { name: 'Mirin', quantity: '1/4 cup' },
                        { name: 'Sugar', quantity: '2 tbsp' },
                        { name: 'Ginger', quantity: '1 inch, grated' },
                        { name: 'Garlic', quantity: '2 cloves, minced' },
                        { name: 'Sesame seeds', quantity: 'for garnish' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Mix soy sauce, mirin, sugar, ginger, and garlic.' },
                        { stepNumber: 2, instruction: 'Marinate chicken for 30 minutes.' },
                        { stepNumber: 3, instruction: 'Heat pan, cook chicken skin-side down until golden.' },
                        { stepNumber: 4, instruction: 'Flip and cook other side.' },
                        { stepNumber: 5, instruction: 'Add marinade and simmer until sauce thickens.' },
                        { stepNumber: 6, instruction: 'Garnish with sesame seeds and serve with rice.' }
                    ],
                    cuisine: 'Japanese',
                    category: 'Dinner',
                    prepTime: 35,
                    cookTime: 20,
                    servings: 4,
                    calories: 380,
                    difficulty: 'Easy',
                    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800',
                    createdBy: users[5]._id,
                    isFeatured: false
                }
            ];

            // Add 85 more recipes programmatically to reach 100 total
            const additionalRecipeTemplates = [
                // More Indian
                { title: 'Biryani', cuisine: 'Indian', category: 'Dinner', difficulty: 'Hard', prepTime: 45, cookTime: 60, servings: 6, calories: 550, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800' },
                { title: 'Masala Dosa', cuisine: 'Indian', category: 'Breakfast', difficulty: 'Medium', prepTime: 30, cookTime: 20, servings: 4, calories: 350, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800' },
                { title: 'Tandoori Chicken', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 120, cookTime: 30, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800' },
                { title: 'Samosa', cuisine: 'Indian', category: 'Snack', difficulty: 'Medium', prepTime: 40, cookTime: 20, servings: 8, calories: 280, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
                { title: 'Paneer Tikka', cuisine: 'Indian', category: 'Snack', difficulty: 'Easy', prepTime: 30, cookTime: 15, servings: 4, calories: 320, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800' },
                { title: 'Dal Makhani', cuisine: 'Indian', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 45, servings: 6, calories: 290, image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800' },
                { title: 'Aloo Gobi', cuisine: 'Indian', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 25, servings: 4, calories: 210, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800' },
                { title: 'Rogan Josh', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 4, calories: 480, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
                { title: 'Pav Bhaji', cuisine: 'Indian', category: 'Snack', difficulty: 'Easy', prepTime: 20, cookTime: 30, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800' },
                { title: 'Idli Sambar', cuisine: 'Indian', category: 'Breakfast', difficulty: 'Medium', prepTime: 480, cookTime: 30, servings: 4, calories: 250, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800' },
                { title: 'Chicken Korma', cuisine: 'Indian', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 35, servings: 4, calories: 450, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
                { title: 'Malai Kofta', cuisine: 'Indian', category: 'Dinner', difficulty: 'Hard', prepTime: 35, cookTime: 30, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
                { title: 'Vada Pav', cuisine: 'Indian', category: 'Snack', difficulty: 'Medium', prepTime: 25, cookTime: 20, servings: 4, calories: 340, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800' },
                { title: 'Rajma Chawal', cuisine: 'Indian', category: 'Lunch', difficulty: 'Easy', prepTime: 480, cookTime: 40, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800' },
                { title: 'Gulab Jamun', cuisine: 'Indian', category: 'Dessert', difficulty: 'Medium', prepTime: 20, cookTime: 30, servings: 12, calories: 220, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800' },

                // More Italian
                { title: 'Risotto', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 10, cookTime: 30, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1476124369491-f0ca4e2e2337?w=800' },
                { title: 'Fettuccine Alfredo', cuisine: 'Italian', category: 'Dinner', difficulty: 'Easy', prepTime: 10, cookTime: 20, servings: 4, calories: 520, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800' },
                { title: 'Penne Arrabbiata', cuisine: 'Italian', category: 'Dinner', difficulty: 'Easy', prepTime: 10, cookTime: 25, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800' },
                { title: 'Caprese Salad', cuisine: 'Italian', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 0, servings: 4, calories: 180, image: 'https://images.unsplash.com/photo-1592417817038-d13fd7ab0db4?w=800' },
                { title: 'Bruschetta', cuisine: 'Italian', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 5, servings: 6, calories: 150, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800' },
                { title: 'Panna Cotta', cuisine: 'Italian', category: 'Dessert', difficulty: 'Easy', prepTime: 15, cookTime: 5, servings: 6, calories: 320, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800' },
                { title: 'Osso Buco', cuisine: 'Italian', category: 'Dinner', difficulty: 'Hard', prepTime: 30, cookTime: 120, servings: 4, calories: 580, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800' },
                { title: 'Minestrone Soup', cuisine: 'Italian', category: 'Lunch', difficulty: 'Easy', prepTime: 20, cookTime: 40, servings: 6, calories: 220, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
                { title: 'Gnocchi', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 60, cookTime: 15, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1609167921566-a7c7c3c4c4e7?w=800' },
                { title: 'Ravioli', cuisine: 'Italian', category: 'Dinner', difficulty: 'Hard', prepTime: 90, cookTime: 15, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1587740908075-9ea5b6d5e1f7?w=800' },
                { title: 'Focaccia Bread', cuisine: 'Italian', category: 'Snack', difficulty: 'Medium', prepTime: 120, cookTime: 25, servings: 8, calories: 280, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800' },
                { title: 'Cannoli', cuisine: 'Italian', category: 'Dessert', difficulty: 'Medium', prepTime: 45, cookTime: 15, servings: 12, calories: 340, image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?w=800' },
                { title: 'Gelato', cuisine: 'Italian', category: 'Dessert', difficulty: 'Medium', prepTime: 30, cookTime: 20, servings: 8, calories: 250, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1f7?w=800' },
                { title: 'Calzone', cuisine: 'Italian', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 20, servings: 4, calories: 520, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' },
                { title: 'Pasta Primavera', cuisine: 'Italian', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800' },

                // More Chinese
                { title: 'Sweet and Sour Pork', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 20, servings: 4, calories: 480, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
                { title: 'Chow Mein', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 15, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800' },
                { title: 'Spring Rolls', cuisine: 'Chinese', category: 'Snack', difficulty: 'Medium', prepTime: 30, cookTime: 15, servings: 8, calories: 220, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800' },
                { title: 'Mapo Tofu', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 320, image: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800' },
                { title: 'Peking Duck', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Hard', prepTime: 240, cookTime: 90, servings: 6, calories: 580, image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=800' },
                { title: 'Dumplings', cuisine: 'Chinese', category: 'Snack', difficulty: 'Medium', prepTime: 45, cookTime: 15, servings: 6, calories: 280, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800' },
                { title: 'Hot and Sour Soup', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 180, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
                { title: 'General Tso Chicken', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 20, servings: 4, calories: 520, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
                { title: 'Egg Drop Soup', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 150, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
                { title: 'Mongolian Beef', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 4, calories: 480, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
                { title: 'Wonton Soup', cuisine: 'Chinese', category: 'Lunch', difficulty: 'Medium', prepTime: 35, cookTime: 20, servings: 4, calories: 240, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800' },
                { title: 'Char Siu', cuisine: 'Chinese', category: 'Dinner', difficulty: 'Medium', prepTime: 120, cookTime: 30, servings: 6, calories: 420, image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=800' },

                // More Mexican
                { title: 'Beef Burrito', cuisine: 'Mexican', category: 'Lunch', difficulty: 'Easy', prepTime: 20, cookTime: 25, servings: 4, calories: 520, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800' },
                { title: 'Quesadilla', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 10, servings: 2, calories: 420, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800' },
                { title: 'Enchiladas', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 30, servings: 6, calories: 450, image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800' },
                { title: 'Guacamole', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 0, servings: 4, calories: 180, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800' },
                { title: 'Salsa', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 0, servings: 6, calories: 50, image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800' },
                { title: 'Nachos', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 480, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800' },
                { title: 'Fajitas', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Easy', prepTime: 20, cookTime: 20, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1599974789516-af1c3b4f5986?w=800' },
                { title: 'Tamales', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Hard', prepTime: 120, cookTime: 90, servings: 12, calories: 380, image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800' },
                { title: 'Churros', cuisine: 'Mexican', category: 'Dessert', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 8, calories: 320, image: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=800' },
                { title: 'Pozole', cuisine: 'Mexican', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 120, servings: 8, calories: 380, image: 'https://images.unsplash.com/photo-1623855244183-c6c0d3c7e0c6?w=800' },
                { title: 'Tostadas', cuisine: 'Mexican', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 10, servings: 4, calories: 340, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800' },
                { title: 'Elote', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 220, image: 'https://images.unsplash.com/photo-1551462147-37cbd8c1a2e0?w=800' },
                { title: 'Ceviche', cuisine: 'Mexican', category: 'Snack', difficulty: 'Easy', prepTime: 120, cookTime: 0, servings: 4, calories: 180, image: 'https://images.unsplash.com/photo-1580959375944-0b6e7f80d2e6?w=800' },

                // American
                { title: 'Mac and Cheese', cuisine: 'American', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 25, servings: 6, calories: 480, image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800' },
                { title: 'BBQ Ribs', cuisine: 'American', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 180, servings: 4, calories: 620, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
                { title: 'Fried Chicken', cuisine: 'American', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 25, servings: 6, calories: 540, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' },
                { title: 'Apple Pie', cuisine: 'American', category: 'Dessert', difficulty: 'Medium', prepTime: 45, cookTime: 50, servings: 8, calories: 380, image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800' },
                { title: 'Pancakes', cuisine: 'American', category: 'Breakfast', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 320, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800' },
                { title: 'Buffalo Wings', cuisine: 'American', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 30, servings: 6, calories: 420, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800' },
                { title: 'Clam Chowder', cuisine: 'American', category: 'Lunch', difficulty: 'Medium', prepTime: 20, cookTime: 30, servings: 6, calories: 380, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
                { title: 'Cheesecake', cuisine: 'American', category: 'Dessert', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 12, calories: 450, image: 'https://images.unsplash.com/photo-1533134242820-b4f8b8a2e6b7?w=800' },
                { title: 'Meatloaf', cuisine: 'American', category: 'Dinner', difficulty: 'Easy', prepTime: 20, cookTime: 60, servings: 6, calories: 480, image: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800' },
                { title: 'Coleslaw', cuisine: 'American', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 0, servings: 6, calories: 150, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },

                // Thai
                { title: 'Green Curry', cuisine: 'Thai', category: 'Dinner', difficulty: 'Medium', prepTime: 25, cookTime: 30, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800' },
                { title: 'Tom Yum Soup', cuisine: 'Thai', category: 'Lunch', difficulty: 'Easy', prepTime: 15, cookTime: 20, servings: 4, calories: 180, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
                { title: 'Massaman Curry', cuisine: 'Thai', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 45, servings: 6, calories: 480, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800' },
                { title: 'Som Tam', cuisine: 'Thai', category: 'Snack', difficulty: 'Easy', prepTime: 15, cookTime: 0, servings: 4, calories: 150, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
                { title: 'Pad See Ew', cuisine: 'Thai', category: 'Dinner', difficulty: 'Easy', prepTime: 20, cookTime: 15, servings: 4, calories: 420, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800' },
                { title: 'Thai Basil Chicken', cuisine: 'Thai', category: 'Dinner', difficulty: 'Easy', prepTime: 15, cookTime: 15, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
                { title: 'Mango Sticky Rice', cuisine: 'Thai', category: 'Dessert', difficulty: 'Easy', prepTime: 30, cookTime: 25, servings: 4, calories: 320, image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800' },
                { title: 'Satay', cuisine: 'Thai', category: 'Snack', difficulty: 'Medium', prepTime: 60, cookTime: 15, servings: 6, calories: 280, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },

                // Japanese
                { title: 'Sushi Rolls', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Hard', prepTime: 60, cookTime: 30, servings: 4, calories: 320, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800' },
                { title: 'Ramen', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Medium', prepTime: 30, cookTime: 60, servings: 4, calories: 480, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
                { title: 'Tempura', cuisine: 'Japanese', category: 'Snack', difficulty: 'Medium', prepTime: 25, cookTime: 15, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800' },
                { title: 'Miso Soup', cuisine: 'Japanese', category: 'Lunch', difficulty: 'Easy', prepTime: 10, cookTime: 15, servings: 4, calories: 120, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
                { title: 'Tonkatsu', cuisine: 'Japanese', category: 'Dinner', difficulty: 'Medium', prepTime: 20, cookTime: 20, servings: 4, calories: 520, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' },
                { title: 'Okonomiyaki', cuisine: 'Japanese', category: 'Lunch', difficulty: 'Medium', prepTime: 20, cookTime: 15, servings: 4, calories: 380, image: 'https://images.unsplash.com/photo-1589927986089-35812378d4c9?w=800' },
                { title: 'Gyoza', cuisine: 'Japanese', category: 'Snack', difficulty: 'Medium', prepTime: 45, cookTime: 15, servings: 6, calories: 280, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800' },
                { title: 'Yakitori', cuisine: 'Japanese', category: 'Snack', difficulty: 'Easy', prepTime: 30, cookTime: 15, servings: 4, calories: 320, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' }
            ];

            // Generate additional recipes
            additionalRecipeTemplates.forEach((template, index) => {
                const userIndex = index % users.length;
                recipes.push({
                    title: template.title,
                    description: `Delicious ${template.title} - a ${template.difficulty.toLowerCase()} ${template.cuisine} ${template.category.toLowerCase()} recipe perfect for any occasion.`,
                    ingredients: [
                        { name: 'Main ingredient', quantity: '500g' },
                        { name: 'Spices and seasonings', quantity: '2 tbsp' },
                        { name: 'Cooking oil', quantity: '2 tbsp' },
                        { name: 'Salt and pepper', quantity: 'to taste' }
                    ],
                    steps: [
                        { stepNumber: 1, instruction: 'Prepare and wash all ingredients thoroughly.' },
                        { stepNumber: 2, instruction: 'Cook the main ingredient according to recipe requirements.' },
                        { stepNumber: 3, instruction: 'Add spices, seasonings, and other ingredients.' },
                        { stepNumber: 4, instruction: 'Cook until done and serve hot. Enjoy!' }
                    ],
                    cuisine: template.cuisine,
                    category: template.category,
                    prepTime: template.prepTime,
                    cookTime: template.cookTime,
                    servings: template.servings,
                    calories: template.calories,
                    difficulty: template.difficulty,
                    image: template.image, // Use the specific image from the template
                    createdBy: users[userIndex]._id,
                    isFeatured: false
                });
            });

            await Recipe.insertMany(recipes);
            console.log(`✅ ${recipes.length} recipes seeded successfully`);
        }
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
    }
};
