import express from 'express';
import Recipe from '../models/Recipe.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get all approved recipes (public)
router.get('/', async (req, res) => {
    try {
        const { cuisine, category, search, featured } = req.query;

        let query = { isApproved: true };

        if (cuisine) query.cuisine = cuisine;
        if (category) query.category = category;
        if (featured === 'true') query.isFeatured = true;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const recipes = await Recipe.find(query)
            .populate('createdBy', 'name avatar')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: recipes.length,
            recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching recipes',
            error: error.message
        });
    }
});

// Get single recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('createdBy', 'name avatar email')
            .populate('comments.user', 'name avatar')
            .populate('ratings.user', 'name');

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.json({
            success: true,
            recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching recipe',
            error: error.message
        });
    }
});

// Create new recipe (authenticated users)
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const recipeData = {
            ...req.body,
            createdBy: req.user._id
        };

        const recipe = await Recipe.create(recipeData);

        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating recipe',
            error: error.message
        });
    }
});

// Update recipe (owner or admin)
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check if user is owner or admin
        if (recipe.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You can only edit your own recipes'
            });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Recipe updated successfully',
            recipe: updatedRecipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating recipe',
            error: error.message
        });
    }
});

// Delete recipe (owner or admin)
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check if user is owner or admin
        if (recipe.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own recipes'
            });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting recipe',
            error: error.message
        });
    }
});

// Toggle favorite
router.post('/:id/favorite', isAuthenticated, async (req, res) => {
    try {
        const user = req.user;
        const recipeId = req.params.id;

        const isFavorited = user.favorites.includes(recipeId);

        if (isFavorited) {
            user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
        } else {
            user.favorites.push(recipeId);
        }

        await user.save();

        res.json({
            success: true,
            message: isFavorited ? 'Removed from favorites' : 'Added to favorites',
            isFavorited: !isFavorited
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error toggling favorite',
            error: error.message
        });
    }
});

// Rate recipe
router.post('/:id/rate', isAuthenticated, async (req, res) => {
    try {
        const { rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check if user already rated
        const existingRating = recipe.ratings.find(
            r => r.user.toString() === req.user._id.toString()
        );

        if (existingRating) {
            existingRating.rating = rating;
        } else {
            recipe.ratings.push({
                user: req.user._id,
                rating
            });
        }

        await recipe.save();

        res.json({
            success: true,
            message: 'Rating submitted successfully',
            averageRating: recipe.averageRating
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error rating recipe',
            error: error.message
        });
    }
});

// Add comment
router.post('/:id/comment', isAuthenticated, async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        recipe.comments.push({
            user: req.user._id,
            text: text.trim()
        });

        await recipe.save();

        // Populate the new comment
        await recipe.populate('comments.user', 'name avatar');

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: recipe.comments[recipe.comments.length - 1]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding comment',
            error: error.message
        });
    }
});

export default router;
