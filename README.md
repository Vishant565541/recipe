# CookVerse AI - Recipe Sharing Platform

A modern, full-stack recipe sharing platform powered by AI, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### User Features
- 🔐 **Authentication**: Secure user registration and login with JWT
- 📖 **Recipe Browsing**: Browse and search recipes by cuisine, category, and keywords
- ⭐ **Favorites**: Save your favorite recipes
- 💬 **Comments & Ratings**: Rate and comment on recipes
- 📝 **Recipe Creation**: Create and share your own recipes
- 🤖 **AI Assistant**: Get cooking help from AI chatbot
- 🎯 **AI Recipe Generator**: Generate recipes based on available ingredients

### Admin Features
- 📊 **Analytics Dashboard**: View platform statistics
- 👥 **User Management**: Manage users, block/unblock accounts
- 📚 **Recipe Moderation**: Feature/unfeature recipes, delete inappropriate content
- 🔍 **Content Oversight**: Monitor all platform activity

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Framer Motion** - Animations
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

## Project Structure

```
cookverse-ai/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── recipe.routes.js
│   │   ├── user.routes.js
│   │   ├── admin.routes.js
│   │   └── ai.routes.js
│   ├── utils/
│   │   └── seedData.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── RecipeCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── RecipeDetail.jsx
    │   │   ├── CreateRecipe.jsx
    │   │   ├── UserDashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AIChat.jsx
    │   │   └── AIRecipeGenerator.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cookverse-ai
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Default Credentials

The application comes with a default admin account:

- **Email**: admin@cookverse.ai
- **Password**: Admin@123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Recipes
- `GET /api/recipes` - Get all recipes (with filters)
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe (auth required)
- `PUT /api/recipes/:id` - Update recipe (auth required)
- `DELETE /api/recipes/:id` - Delete recipe (auth required)
- `POST /api/recipes/:id/favorite` - Toggle favorite (auth required)
- `POST /api/recipes/:id/rate` - Rate recipe (auth required)
- `POST /api/recipes/:id/comment` - Add comment (auth required)

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/my-recipes` - Get user's recipes
- `GET /api/users/favorites` - Get user's favorites

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/block` - Block/unblock user
- `GET /api/admin/recipes` - Get all recipes
- `PUT /api/admin/recipes/:id/approve` - Approve/unapprove recipe
- `PUT /api/admin/recipes/:id/feature` - Feature/unfeature recipe
- `DELETE /api/admin/recipes/:id` - Delete recipe
- `GET /api/admin/analytics` - Get analytics data

### AI
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/generate-recipe` - Generate recipe from ingredients
- `POST /api/ai/substitute` - Get ingredient substitutes
- `POST /api/ai/nutrition` - Analyze nutrition

## Features in Detail

### Recipe Management
- Create recipes with ingredients, steps, images, and metadata
- Edit and delete your own recipes
- Browse recipes by cuisine, category, difficulty
- Search recipes by title and description

### Social Features
- Rate recipes (1-5 stars)
- Comment on recipes
- Save recipes to favorites
- View other users' profiles

### AI Integration
- **AI Chat**: Ask cooking questions and get instant answers
- **Recipe Generator**: Input ingredients and get AI-generated recipes
- **Ingredient Substitution**: Find alternatives for ingredients
- **Nutrition Analysis**: Get nutritional information for recipes

### Admin Panel
- View platform statistics and analytics
- Manage users (block, delete)
- Moderate recipes (feature, delete)
- Monitor comments and activity

## Database Schema

### User Model
- name, email, password (hashed)
- role (user/admin)
- avatar
- favorites (array of recipe IDs)
- isBlocked
- createdAt

### Recipe Model
- title, description
- ingredients (array of {name, quantity})
- steps (array of {stepNumber, instruction})
- cuisine, category, difficulty
- prepTime, cookTime, servings, calories
- image
- createdBy (user reference)
- isApproved, isFeatured
- ratings (array of {user, rating})
- comments (array of {user, text, createdAt})
- createdAt, updatedAt

## Development

### Seeding Database
The application automatically seeds the database with:
- Default admin user
- Sample recipes

To manually seed:
```bash
cd backend
npm run seed
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm start
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
