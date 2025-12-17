import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected for fixing timers'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const fixTimers = async () => {
    try {
        const recipes = await Recipe.find({});

        console.log(`📝 Found ${recipes.length} recipes to fix...`);

        for (const recipe of recipes) {
            let updated = false;

            recipe.steps = recipe.steps.map((step) => {
                const instruction = step.instruction.toLowerCase();
                let duration = 0;

                // Extract exact time from instruction text
                // Pattern: "X minutes" or "X min" or "X-Y minutes"
                const minuteMatch = instruction.match(/(\d+)(?:-(\d+))?\s*(?:minute|min)/i);
                const hourMatch = instruction.match(/(\d+)(?:-(\d+))?\s*(?:hour|hr)/i);
                const secondMatch = instruction.match(/(\d+)(?:-(\d+))?\s*(?:second|sec)/i);

                if (minuteMatch) {
                    // Use the first number if range (e.g., "30-35 minutes" → 30)
                    const minutes = parseInt(minuteMatch[1]);
                    duration = minutes * 60;
                    console.log(`  ⏱️  "${step.instruction}" → ${minutes} minutes (${duration}s)`);
                    updated = true;
                } else if (hourMatch) {
                    const hours = parseInt(hourMatch[1]);
                    duration = hours * 3600;
                    console.log(`  ⏱️  "${step.instruction}" → ${hours} hours (${duration}s)`);
                    updated = true;
                } else if (secondMatch) {
                    duration = parseInt(secondMatch[1]);
                    console.log(`  ⏱️  "${step.instruction}" → ${duration} seconds`);
                    updated = true;
                } else {
                    // No specific time mentioned - use smart defaults
                    if (instruction.includes('marinate') || instruction.includes('soak')) {
                        duration = 1800; // 30 minutes default
                    } else if (instruction.includes('bake') || instruction.includes('roast')) {
                        duration = 1800; // 30 minutes default
                    } else if (instruction.includes('simmer') || instruction.includes('cook')) {
                        duration = 600; // 10 minutes default
                    } else if (instruction.includes('boil')) {
                        duration = 600; // 10 minutes
                    } else if (instruction.includes('fry') || instruction.includes('sauté')) {
                        duration = 300; // 5 minutes
                    } else if (instruction.includes('rest') || instruction.includes('cool')) {
                        duration = 600; // 10 minutes
                    } else if (instruction.includes('mix') || instruction.includes('combine') || instruction.includes('add')) {
                        duration = 180; // 3 minutes
                    } else if (instruction.includes('chop') || instruction.includes('dice') || instruction.includes('prepare')) {
                        duration = 300; // 5 minutes
                    } else if (instruction.includes('serve') || instruction.includes('garnish')) {
                        duration = 60; // 1 minute
                    } else {
                        duration = 300; // 5 minutes default
                    }
                    console.log(`  ⏱️  "${step.instruction}" → ${duration / 60} minutes (default)`);
                }

                step.duration = duration;
                return step;
            });

            if (updated) {
                await recipe.save();
                console.log(`✅ Fixed: ${recipe.title}\n`);
            }
        }

        console.log('\n🎉 All recipe timers fixed to match instructions!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error fixing timers:', error);
        process.exit(1);
    }
};

fixTimers();
