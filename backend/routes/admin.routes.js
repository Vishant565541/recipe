import express from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(isAuthenticated, isAdmin);

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        // Get recipe count for each user
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const recipeCount = await Recipe.countDocuments({ createdBy: user._id });
            return {
                ...user.toObject(),
                recipeCount
            };
        }));

        res.json({
            success: true,
            count: usersWithStats.length,
            users: usersWithStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent deleting admin users
        if (user.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot delete admin users'
            });
        }

        // Delete all recipes by this user
        await Recipe.deleteMany({ createdBy: user._id });

        await User.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'User and their recipes deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

// Block/Unblock user
router.put('/users/:id/block', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot block admin users'
            });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({
            success: true,
            message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
            isBlocked: user.isBlocked
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error blocking/unblocking user',
            error: error.message
        });
    }
});

// Get all recipes (including unapproved)
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate('createdBy', 'name email avatar')
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

// Approve/Unapprove recipe
router.put('/recipes/:id/approve', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        recipe.isApproved = !recipe.isApproved;
        await recipe.save();

        res.json({
            success: true,
            message: `Recipe ${recipe.isApproved ? 'approved' : 'unapproved'} successfully`,
            isApproved: recipe.isApproved
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error approving recipe',
            error: error.message
        });
    }
});

// Feature/Unfeature recipe
router.put('/recipes/:id/feature', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        recipe.isFeatured = !recipe.isFeatured;
        await recipe.save();

        res.json({
            success: true,
            message: `Recipe ${recipe.isFeatured ? 'featured' : 'unfeatured'} successfully`,
            isFeatured: recipe.isFeatured
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error featuring recipe',
            error: error.message
        });
    }
});

// Delete any recipe
router.delete('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

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

// Get analytics
router.get('/analytics', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalRecipes = await Recipe.countDocuments();
        const approvedRecipes = await Recipe.countDocuments({ isApproved: true });
        const featuredRecipes = await Recipe.countDocuments({ isFeatured: true });
        const blockedUsers = await User.countDocuments({ isBlocked: true });

        // Get recent users
        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        // Get recent recipes
        const recentRecipes = await Recipe.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        // Get cuisine distribution
        const cuisineStats = await Recipe.aggregate([
            { $group: { _id: '$cuisine', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            analytics: {
                totalUsers,
                totalRecipes,
                approvedRecipes,
                featuredRecipes,
                blockedUsers,
                pendingApproval: totalRecipes - approvedRecipes,
                recentUsers,
                recentRecipes,
                cuisineStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics',
            error: error.message
        });
    }
});

// Get all comments for moderation
router.get('/comments', async (req, res) => {
    try {
        const recipes = await Recipe.find({ 'comments.0': { $exists: true } })
            .populate('comments.user', 'name email avatar')
            .select('title comments');

        const allComments = [];
        recipes.forEach(recipe => {
            recipe.comments.forEach(comment => {
                allComments.push({
                    commentId: comment._id,
                    recipeId: recipe._id,
                    recipeTitle: recipe.title,
                    user: comment.user,
                    text: comment.text,
                    createdAt: comment.createdAt
                });
            });
        });

        allComments.sort((a, b) => b.createdAt - a.createdAt);

        res.json({
            success: true,
            count: allComments.length,
            comments: allComments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching comments',
            error: error.message
        });
    }
});

// Delete comment
router.delete('/comments/:recipeId/:commentId', async (req, res) => {
    try {
        const { recipeId, commentId } = req.params;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        recipe.comments = recipe.comments.filter(
            comment => comment._id.toString() !== commentId
        );

        await recipe.save();

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting comment',
            error: error.message
        });
    }
});

export default router;
