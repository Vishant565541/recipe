import express from 'express';
import Recipe from '../models/Recipe.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        res.json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                avatar: req.user.avatar,
                favorites: req.user.favorites,
                createdAt: req.user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

// Update user profile
router.put('/profile', isAuthenticated, async (req, res) => {
    try {
        const { name, avatar } = req.body;

        const user = req.user;
        if (name) user.name = name;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

// Get user's own recipes
router.get('/my-recipes', isAuthenticated, async (req, res) => {
    try {
        const recipes = await Recipe.find({ createdBy: req.user._id })
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

// Get user's favorite recipes
router.get('/favorites', isAuthenticated, async (req, res) => {
    try {
        const user = await req.user.populate('favorites');

        res.json({
            success: true,
            count: user.favorites.length,
            recipes: user.favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching favorites',
            error: error.message
        });
    }
});

export default router;
