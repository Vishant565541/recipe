import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected for seeding'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const seedRecipes = async () => {
    try {
        // Get admin user
        const admin = await User.findOne({ email: 'admin@cookverse.ai' });
        if (!admin) {
            console.error('❌ Admin user not found. Please run seedData.js first.');
            process.exit(1);
        }

        // Update all recipes to add timers and AI tips
        const recipes = await Recipe.find({});

        console.log(`📝 Found ${recipes.length} recipes to update...`);

        for (const recipe of recipes) {
            let updated = false;

            // Update each step to add duration and AI tips if missing
            recipe.steps = recipe.steps.map((step, index) => {
                // Only update if duration is missing or 0
                if (!step.duration || step.duration === 0) {
                    updated = true;

                    // Assign reasonable durations based on step content
                    let duration = 300; // default 5 minutes
                    const instruction = step.instruction.toLowerCase();

                    if (instruction.includes('marinate') || instruction.includes('soak') || instruction.includes('rest')) {
                        duration = instruction.includes('30') ? 1800 : instruction.includes('15') ? 900 : 600;
                    } else if (instruction.includes('bake') || instruction.includes('roast')) {
                        duration = instruction.includes('45') ? 2700 : instruction.includes('30') ? 1800 : 1200;
                    } else if (instruction.includes('simmer') || instruction.includes('cook')) {
                        duration = instruction.includes('20') ? 1200 : instruction.includes('15') ? 900 : instruction.includes('10') ? 600 : 480;
                    } else if (instruction.includes('boil')) {
                        duration = 600;
                    } else if (instruction.includes('fry') || instruction.includes('sauté')) {
                        duration = 360;
                    } else if (instruction.includes('mix') || instruction.includes('combine') || instruction.includes('add')) {
                        duration = 180;
                    } else if (instruction.includes('chop') || instruction.includes('dice') || instruction.includes('prepare')) {
                        duration = 240;
                    }

                    step.duration = duration;
                }

                // Add AI tips if missing
                if (!step.aiTips || step.aiTips.length === 0) {
                    updated = true;
                    const instruction = step.instruction.toLowerCase();
                    const tips = [];

                    // Generate contextual AI tips
                    if (instruction.includes('heat') || instruction.includes('oil')) {
                        tips.push('Use medium-high heat for best results');
                    }
                    if (instruction.includes('stir') || instruction.includes('mix')) {
                        tips.push('Stir gently to avoid breaking ingredients');
                    }
                    if (instruction.includes('season')) {
                        tips.push('Taste and adjust seasoning as needed');
                    }
                    if (instruction.includes('cook') || instruction.includes('fry')) {
                        tips.push('Don\'t overcrowd the pan');
                    }
                    if (instruction.includes('simmer')) {
                        tips.push('Keep heat low and stir occasionally');
                    }
                    if (instruction.includes('bake')) {
                        tips.push('Preheat oven for even cooking');
                    }
                    if (instruction.includes('marinate')) {
                        tips.push('Refrigerate while marinating for food safety');
                    }
                    if (instruction.includes('boil')) {
                        tips.push('Add salt to water for better flavor');
                    }
                    if (instruction.includes('serve')) {
                        tips.push('Garnish for better presentation');
                    }

                    // Add at least one generic tip if no specific tips
                    if (tips.length === 0) {
                        tips.push('Follow the timing carefully for best results');
                    }

                    step.aiTips = tips;
                }

                return step;
            });

            if (updated) {
                await recipe.save();
                console.log(`✅ Updated: ${recipe.title}`);
            } else {
                console.log(`⏭️  Skipped: ${recipe.title} (already has timers)`);
            }
        }

        console.log('\n🎉 All recipes updated with timers and AI tips!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating recipes:', error);
        process.exit(1);
    }
};

seedRecipes();
