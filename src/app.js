// appel de mes middlewares et d'express ainsi que mes router
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/auth.routes.js';

// création de mon app
const app = express();

// petite route de test
app.get('/test', (req, res)=>{
    console.log('la route de test est ok');
    res.send('route de test ok');
})

// route parent pour l'auth
app.use('/api/auth', authRoute);

// config de l'app
// autorisation du cors(cross orign etc)
app.use(cors());
// parser en json
app.use(express.json());
// logger les requetes http(le format dev qui le permet)
app.use(morgan('dev'));

// si y'a une erreur on envoie une erreur 500 
// ca capture tout type d'erreur
app.use((err, res) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'erreur server'
    });
});

export default app;