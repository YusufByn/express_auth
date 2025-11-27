// import de bcrypt, de jwt(gestion de token), connexion a mysql et variable d'environnement
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { pool } from '../db/index.js';
import { register } from '../services/auth.service.js';


export async function registerContoller(req, res, next){

    try{
        //appeler ma funciton qui contient ma logique de register
        const user = await register(req.body)

        // la reponse   
        return res.status(201).json({
            success: true,  
            message:"vous avez bien été enregistré",
            data: user
        });

   }catch(error){
        console.error('erreur lors de la creation du compte', error);
        next(error);
   }
   
}

export async function loginController(req, res, next) {
    try{
        // ma requete 
        const {email, password} = req.body;

        // declaration d'une variable rows, qui va executer un select dans la table user avec l'email du user
        // quand on fait pool.execute on y'a 2 tableau rows et fields et en declarant [rows]
        // on prend que rows et non fields
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        // declaration d'une variable user qui est égal a la position/key 0 dans le tableau rows
        // genre au premier element du tableau rows
        // permet de récupérer le premier utilisateur correspondant à l’email
        const user = rows[0];
        console.log(user);
        
        // si pas d'user
        if(!user){
            console.log('user introuvable');
            return res.status(401).json({
                error: 'user introuvable'
            })
        }

        // on compare le mdp fournis avec le mdp hash de la db 
        const match = await bcrypt.compare(password, user.password_hash);
        // ca revnoie un boolean si on laisse le console log
        console.log(match);
        // si pas de match donc si c'est pas identique on renvoie ca
        if(!match){
            console.log('mdp incorrect');
            return res.send(401).json({
                error: 'mdp incorrect'
            });
        }

        // on genere un token avec jwt 
        const token = jwt.sign(
            {sub: user.id, email: user.email},
            env.jwtSecret,
            { expiresIn: '1h'}
        )

        // on prepare l'envoie du token
        res.json(token)
        
    }catch(error){
        console.error('erreur lors du login', error);
        next(error)
    }
}

export async function porfileController(req, res) {
    console.log(req.user);
    res.json({user: req.user})
}

