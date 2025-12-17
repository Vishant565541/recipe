import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true }
    }],
    steps: [{
        stepNumber: { type: Number, required: true },
        instruction: { type: String, required: true },
        duration: { type: Number, default: 0 }, // in seconds, 0 means no timer
        media: { type: String }, // image or video URL
        aiTips: [{ type: String }], // AI-generated cooking tips
        youtube: {
            videoId: { type: String },
            startTime: { type: Number }, // Video start time for this step
            endTime: { type: Number },   // Video end time for this step
            autoPlay: { type: Boolean, default: true },
            lockSeeking: { type: Boolean, default: false }
        }
    }],
    cuisine: {
        type: String,
        required: [true, 'Cuisine type is required'],
        enum: ['Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'Thai', 'Japanese', 'Mediterranean', 'Other']
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage'],
        default: 'Lunch'
    },
    prepTime: {
        type: Number, // in minutes
        required: true
    },
    cookTime: {
        type: Number, // in minutes
        required: true
    },
    servings: {
        type: Number,
        required: true,
        min: 1
    },
    calories: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isApproved: {
        type: Boolean,
        default: true // Auto-approve for now, can be changed to false for moderation
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    videoTutorial: {
        youtubeUrl: { type: String },
        duration: { type: Number },
        chapters: [{
            title: { type: String },
            startTime: { type: Number },
            endTime: { type: Number },
            stepNumber: { type: Number }
        }],
        timers: [{
            timestamp: { type: Number },
            duration: { type: Number },
            description: { type: String }
        }],
        suggestedVideos: [{ type: String }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for average rating
recipeSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / this.ratings.length).toFixed(1);
});

// Update updatedAt on save
recipeSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Ensure virtuals are included in JSON
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
