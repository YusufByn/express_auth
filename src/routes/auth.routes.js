// importation de Router via express, de nos controller et de notre logique d'authenticate
import { Router } from 'express';
import { registerContoller, loginController, porfileController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

// on stock Router dans une variable router
const router = Router();

// route pour s'enregistrer
router.post('/register', registerContoller)

// route pour se login
router.post('/login', loginController)

// afficher son profil
router.get('/profil', authenticate, porfileController)


// exportation de router
export default router;