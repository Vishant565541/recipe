import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Enhanced AI service for demonstration
const mockAIService = {
    chat: async (message) => {
        const lowerMessage = message.toLowerCase();

        // Recipe-specific responses
        if (lowerMessage.includes('pasta')) {
            return 'To make pasta: 1) Boil salted water (4-6 quarts for 1 lb pasta), 2) Add pasta and stir occasionally, 3) Cook for 8-12 minutes until al dente, 4) Reserve 1 cup pasta water before draining, 5) Toss with your sauce and add pasta water to adjust consistency. For best results, salt the water generously - it should taste like the sea!';
        }

        if (lowerMessage.includes('butter chicken')) {
            return 'Butter Chicken ingredients: 500g chicken breast (cubed), 4 tbsp butter, 2 cups tomato puree, 1 cup heavy cream, 2 tbsp ginger-garlic paste, 2 tsp garam masala, 1 tbsp kasuri methi, 1/2 cup yogurt. Marinate chicken in yogurt and spices for 30 minutes, grill until cooked, then simmer in a creamy tomato sauce with butter and cream. Serve with naan or rice!';
        }

        if (lowerMessage.includes('rice') && (lowerMessage.includes('cook') || lowerMessage.includes('long'))) {
            return 'Cooking rice: White rice takes 15-18 minutes, Brown rice takes 40-45 minutes, Basmati rice takes 12-15 minutes. Use a 2:1 water-to-rice ratio for white rice, 2.5:1 for brown rice. Bring to a boil, reduce heat to low, cover, and simmer. Let it rest for 5-10 minutes after cooking for fluffy results!';
        }

        if (lowerMessage.includes('biryani')) {
            return 'Biryani is a layered rice dish! Cook basmati rice 70% done, marinate meat in yogurt and spices, layer rice and meat in a pot, add saffron milk and fried onions, seal with dough, and cook on dum (low heat) for 45 minutes. The key is the aromatic spices and the dum cooking technique!';
        }

        if (lowerMessage.includes('chicken') && !lowerMessage.includes('butter')) {
            return 'Chicken cooking tips: Chicken breast takes 15-20 minutes at 375°F, thighs take 25-30 minutes. Always cook to internal temp of 165°F. For juicy chicken: brine it, don\'t overcook, and let it rest 5-10 minutes before cutting. Season generously and sear for golden color!';
        }

        if (lowerMessage.includes('steak') || lowerMessage.includes('beef')) {
            return 'Perfect steak: 1) Bring to room temp, 2) Season generously with salt & pepper, 3) Sear in hot pan 3-4 min per side for medium-rare, 4) Let rest 5-10 minutes. Use a meat thermometer: 130°F for medium-rare, 140°F for medium. Don\'t forget to rest the meat!';
        }

        if (lowerMessage.includes('eggs') || lowerMessage.includes('omelette')) {
            return 'Egg cooking guide: Scrambled eggs - low heat, constant stirring, 2-3 minutes. Fried eggs - medium heat, 3-4 minutes. Omelette - medium-high heat, 2-3 minutes. Boiled eggs - 6 min for soft, 10 min for hard. Always use fresh eggs and don\'t overcook!';
        }

        if (lowerMessage.includes('bake') || lowerMessage.includes('cake')) {
            return 'Baking tips: Preheat oven for 10-15 minutes, measure ingredients precisely, room temperature ingredients mix better, don\'t overmix batter, use middle rack, and test doneness with a toothpick. Most cakes bake at 350°F for 25-35 minutes. Let cool completely before frosting!';
        }

        if (lowerMessage.includes('bread')) {
            return 'Bread making basics: Mix flour, water, yeast, and salt. Knead for 10 minutes until smooth and elastic. Let rise 1-2 hours until doubled. Shape, let rise again 30-60 minutes. Bake at 425°F for 25-35 minutes until golden and hollow-sounding when tapped. Cool before slicing!';
        }

        if (lowerMessage.includes('pizza')) {
            return 'Pizza perfection: Make dough with flour, water, yeast, salt, and olive oil. Let rise 1-2 hours. Stretch thin, add sauce and toppings (less is more!). Bake at highest temp (500°F+) for 10-15 minutes until crust is golden and cheese bubbles. Use a pizza stone for crispy crust!';
        }

        if (lowerMessage.includes('soup') || lowerMessage.includes('broth')) {
            return 'Great soup starts with good stock! Sauté aromatics (onions, garlic, celery), add broth and main ingredients, simmer 20-45 minutes. Season at the end. For creamy soups, blend and add cream. For clear soups, skim foam regularly. Always taste and adjust seasoning!';
        }

        if (lowerMessage.includes('curry')) {
            return 'Curry cooking: Toast whole spices first for depth, sauté onions until golden, add ginger-garlic paste, then ground spices. Add tomatoes and cook until oil separates. Add protein/vegetables and simmer in coconut milk or yogurt. Finish with fresh herbs. Cook low and slow for best flavor!';
        }

        if (lowerMessage.includes('salad')) {
            return 'Perfect salad: Use fresh, crisp greens. Wash and dry thoroughly. Add variety - different textures, colors, and flavors. Dress just before serving. For vinaigrette: 3 parts oil to 1 part acid (vinegar/lemon). Season with salt, pepper, and herbs. Toss gently!';
        }

        // Cooking techniques
        if (lowerMessage.includes('sauté') || lowerMessage.includes('fry')) {
            return 'Sautéing technique: Use medium-high heat, heat pan first, add oil/butter, wait until shimmering, add ingredients in single layer, don\'t overcrowd, flip/stir occasionally. For crispy results, don\'t move food too much. Pat ingredients dry before sautéing!';
        }

        if (lowerMessage.includes('grill') || lowerMessage.includes('bbq')) {
            return 'Grilling tips: Preheat grill 10-15 minutes, clean grates, oil grates to prevent sticking, create two-zone fire (hot and cool sides), use tongs not forks, let meat rest after grilling. For perfect grill marks, don\'t move food for 3-4 minutes!';
        }

        if (lowerMessage.includes('roast')) {
            return 'Roasting guide: Preheat oven, use high heat (400-450°F) for vegetables and crispy skin, lower heat (325-375°F) for large meats. Don\'t overcrowd pan. Flip vegetables halfway. Use meat thermometer for doneness. Let meat rest 10-15 minutes before carving!';
        }

        if (lowerMessage.includes('steam')) {
            return 'Steaming technique: Bring water to boil in steamer, place food in basket (don\'t touch water), cover tightly, steam until tender. Vegetables: 3-7 minutes, Fish: 8-10 minutes, Dumplings: 10-15 minutes. Steaming preserves nutrients and natural flavors!';
        }

        // Ingredients and substitutions
        if (lowerMessage.includes('substitute') || lowerMessage.includes('replace')) {
            return 'Common substitutions: Butter → oil/ghee, Milk → almond/soy milk, Eggs → flax eggs (1 tbsp flax + 3 tbsp water), Sugar → honey/maple syrup, Flour → almond/coconut flour, Cream → coconut cream. What specific ingredient do you need to substitute?';
        }

        if (lowerMessage.includes('spice') || lowerMessage.includes('season')) {
            return 'Essential spices: Salt, black pepper, garlic powder, onion powder, paprika, cumin, oregano, basil, thyme, cinnamon. For Indian: turmeric, coriander, cumin, garam masala. For Mexican: cumin, chili powder, oregano. Toast whole spices before grinding for maximum flavor!';
        }

        if (lowerMessage.includes('herb')) {
            return 'Fresh herbs guide: Basil, parsley, cilantro - add at end. Rosemary, thyme, oregano - can cook longer. Store in water like flowers or wrap in damp paper towel. Dried herbs are 3x stronger than fresh. Chop just before using for maximum flavor!';
        }

        if (lowerMessage.includes('oil')) {
            return 'Cooking oils: Olive oil - low-medium heat, salads. Vegetable/Canola - high heat, frying. Coconut oil - medium heat, baking. Sesame oil - finishing, Asian dishes. Avocado oil - high heat, versatile. Store in cool, dark place. Don\'t reuse oil more than 2-3 times!';
        }

        // Nutrition and health
        if (lowerMessage.includes('nutrition') || lowerMessage.includes('healthy') || lowerMessage.includes('calorie')) {
            return 'Healthy cooking tips: Use lean proteins, load up on vegetables, choose whole grains, limit added sugars and salt, use healthy fats (olive oil, avocado), steam or grill instead of frying, control portions. A balanced plate: 1/2 vegetables, 1/4 protein, 1/4 whole grains!';
        }

        if (lowerMessage.includes('protein')) {
            return 'Protein sources: Chicken breast (31g per 100g), Salmon (25g), Eggs (13g per 100g), Greek yogurt (10g), Lentils (9g), Tofu (8g), Quinoa (4g). Aim for 0.8g protein per kg body weight daily. Combine plant proteins for complete amino acid profile!';
        }

        if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan')) {
            return 'Plant-based protein: Lentils, chickpeas, black beans, tofu, tempeh, quinoa, nuts, seeds. For B12: nutritional yeast, fortified foods. For iron: dark leafy greens with vitamin C. For omega-3: flaxseeds, chia seeds, walnuts. Variety is key for complete nutrition!';
        }

        if (lowerMessage.includes('gluten')) {
            return 'Gluten-free alternatives: Rice, quinoa, buckwheat, corn, potatoes. Flours: almond, coconut, rice, chickpea. Always check labels - gluten hides in sauces, broths, and processed foods. Use xanthan gum as binder in baking. Cross-contamination matters for celiac disease!';
        }

        // Kitchen tips and techniques
        if (lowerMessage.includes('knife') || lowerMessage.includes('cut') || lowerMessage.includes('chop')) {
            return 'Knife skills: Keep knives sharp (safer than dull!), use proper cutting board, curl fingers when holding food, use rocking motion for chopping, slice with smooth strokes. Basic cuts: dice (cubes), julienne (matchsticks), chiffonade (ribbons). Practice makes perfect!';
        }

        if (lowerMessage.includes('temperature') || lowerMessage.includes('temp')) {
            return 'Safe cooking temperatures: Chicken/Turkey 165°F, Ground meat 160°F, Pork 145°F, Beef steaks 145°F (medium-rare), Fish 145°F. Use meat thermometer for accuracy. Let meat rest 3-10 minutes before cutting. Bacteria dies above 140°F!';
        }

        if (lowerMessage.includes('store') || lowerMessage.includes('storage')) {
            return 'Food storage: Refrigerate within 2 hours, use airtight containers, label with dates. Fridge: 35-40°F, Freezer: 0°F or below. Cooked food lasts 3-4 days refrigerated, 2-3 months frozen. Raw meat: 1-2 days fridge, 3-12 months freezer. When in doubt, throw it out!';
        }

        if (lowerMessage.includes('meal prep')) {
            return 'Meal prep success: Plan weekly menu, shop once, prep on Sunday, use containers, cook in batches, freeze portions. Prep vegetables, cook grains and proteins, portion snacks. Cooked food lasts 3-4 days refrigerated. Label everything with dates!';
        }

        // Timing and planning
        if (lowerMessage.includes('how long') || lowerMessage.includes('time')) {
            return 'General cooking times: Vegetables 5-15 min, Chicken breast 15-20 min, Fish 10-15 min, Rice 15-45 min, Pasta 8-12 min, Baked goods 20-40 min. Always use timer and check doneness. Altitude and equipment affect timing. What are you cooking?';
        }

        if (lowerMessage.includes('beginner') || lowerMessage.includes('start') || lowerMessage.includes('learn')) {
            return 'Beginner cooking tips: Start with simple recipes, read recipe fully before starting, prep all ingredients first (mise en place), invest in basic tools (good knife, cutting board, pans), don\'t be afraid to make mistakes, taste as you go, and have fun! What would you like to cook first?';
        }

        // Default response with helpful suggestions
        if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('?')) {
            return 'I can help with cooking questions! Ask me about: specific recipes (pasta, chicken, rice, curry), cooking techniques (grilling, roasting, sautéing), ingredients and substitutions, nutrition and healthy eating, food storage, or general cooking tips. What would you like to know?';
        }

        // Fallback response
        return `Great question! Here are some cooking tips: 1) Always taste as you cook, 2) Don't overcrowd the pan, 3) Let meat rest after cooking, 4) Season in layers. What specific recipe or technique are you interested in? I can help with recipes, cooking methods, ingredients, nutrition, and more!`;
    },

    generateRecipe: async (ingredients) => {
        return {
            title: `Delicious ${ingredients[0]} Recipe`,
            description: `A wonderful dish featuring ${ingredients.join(', ')}`,
            ingredients: ingredients.map((ing, i) => ({
                name: ing,
                quantity: `${i + 1} cup${i > 0 ? 's' : ''}`
            })),
            steps: [
                { stepNumber: 1, instruction: 'Prepare all ingredients and wash them thoroughly.' },
                { stepNumber: 2, instruction: 'Heat oil in a pan over medium heat.' },
                { stepNumber: 3, instruction: `Add ${ingredients[0]} and cook until tender.` },
                { stepNumber: 4, instruction: 'Add remaining ingredients and mix well.' },
                { stepNumber: 5, instruction: 'Season with salt, pepper, and your favorite spices.' },
                { stepNumber: 6, instruction: 'Cook for 10-15 minutes and serve hot.' }
            ],
            prepTime: 15,
            cookTime: 25,
            servings: 4,
            calories: 350
        };
    },

    getSubstitute: async (ingredient) => {
        const substitutes = {
            'butter': 'coconut oil, olive oil, or ghee',
            'milk': 'almond milk, soy milk, or oat milk',
            'egg': 'flax egg (1 tbsp flax + 3 tbsp water), chia egg, or applesauce',
            'sugar': 'honey, maple syrup, or stevia',
            'flour': 'almond flour, coconut flour, or oat flour',
            'cream': 'coconut cream or cashew cream',
            'cheese': 'nutritional yeast or cashew cheese',
            'default': 'Try using similar ingredients with comparable texture and flavor profiles'
        };

        return substitutes[ingredient.toLowerCase()] || substitutes.default;
    },

    analyzeNutrition: async (recipe) => {
        return {
            calories: Math.floor(Math.random() * 300) + 200,
            protein: Math.floor(Math.random() * 20) + 10 + 'g',
            carbs: Math.floor(Math.random() * 40) + 20 + 'g',
            fat: Math.floor(Math.random() * 15) + 5 + 'g',
            fiber: Math.floor(Math.random() * 8) + 2 + 'g',
            healthScore: Math.floor(Math.random() * 30) + 70,
            tips: [
                'Rich in vitamins and minerals',
                'Good source of protein',
                'Contains healthy fats',
                'High in dietary fiber'
            ]
        };
    }
};

// AI Chat Assistant
router.post('/chat', isAuthenticated, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        const response = await mockAIService.chat(message);

        res.json({
            success: true,
            response,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing AI chat',
            error: error.message
        });
    }
});

// AI Recipe Generator
router.post('/generate-recipe', isAuthenticated, async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one ingredient'
            });
        }

        const recipe = await mockAIService.generateRecipe(ingredients);

        res.json({
            success: true,
            recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating recipe',
            error: error.message
        });
    }
});

// AI Ingredient Substitution
router.post('/substitute', isAuthenticated, async (req, res) => {
    try {
        const { ingredient } = req.body;

        if (!ingredient || ingredient.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Ingredient is required'
            });
        }

        const substitute = await mockAIService.getSubstitute(ingredient);

        res.json({
            success: true,
            ingredient,
            substitute
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error finding substitute',
            error: error.message
        });
    }
});

// AI Nutrition Analysis
router.post('/nutrition', isAuthenticated, async (req, res) => {
    try {
        const { recipe } = req.body;

        if (!recipe) {
            return res.status(400).json({
                success: false,
                message: 'Recipe data is required'
            });
        }

        const nutrition = await mockAIService.analyzeNutrition(recipe);

        res.json({
            success: true,
            nutrition
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error analyzing nutrition',
            error: error.message
        });
    }
});

// Get AI usage logs (Admin only)
router.get('/logs', isAuthenticated, isAdmin, async (req, res) => {
    try {
        // Mock AI usage data
        const logs = [
            {
                user: 'john@example.com',
                feature: 'AI Chat',
                timestamp: new Date(Date.now() - 3600000),
                query: 'How to cook pasta?'
            },
            {
                user: 'jane@example.com',
                feature: 'Recipe Generator',
                timestamp: new Date(Date.now() - 7200000),
                query: 'Generate recipe with chicken and rice'
            },
            {
                user: 'admin@cookverse.ai',
                feature: 'Nutrition Analysis',
                timestamp: new Date(Date.now() - 10800000),
                query: 'Analyze Butter Paneer'
            }
        ];

        res.json({
            success: true,
            count: logs.length,
            logs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching AI logs',
            error: error.message
        });
    }
});

export default router;
