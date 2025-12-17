import mongoose from 'mongoose';
import Recipe from './models/Recipe.js';
import dotenv from 'dotenv';

dotenv.config();

const resetRecipes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const count = await Recipe.countDocuments();
        console.log(`📊 Current recipe count: ${count}`);

        await Recipe.deleteMany({});
        console.log('🗑️  All recipes deleted');

        console.log('✅ Database reset complete. Restart the server to reseed with correct images.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

resetRecipes();
