// outil des token -> jwt
import jwt from 'jsonwebtoken';
// variable d'env
import { env } from '../config/env.js';
// outil de connexion
import { pool } from '../db/index.js';

export async function authenticate(req, res, next){

    try{
        // recup le token
        const authorization = req.headers.authorization;
        const token = authorization.replace('Bearer ', '');
        // condition si pas de token
        if(!token){
            return res.status(401).json({
                error: 'pas de token'
            });
        }
        // verif du token avec verify
        // je le verifie par rapport au token secret dans le .env sur lequel il etait censé se baser
        const payload = jwt.verify(token, env.jwtSecret);
        // payload sub c'est equivalent a "l'id" du user
        console.log(payload.sub);
        

        // recpuere le user
        // select l'id le mail quand eske ca ete crée dans la table user ou l'id est egal a payload.sub
        const [rows] = await pool.execute('SELECT id, email, created_at FROM users WHERE id = ?', [payload.sub]);

        if(!rows[0]){
            return res.status(401).json({
                error: 'user inexistant',
            })
        }

        // on declare req.user et on dit qu'il est égal a rows[0] qui équivaut au premier element renvoyé par le tableau
        // rows sql, qui ici est l'id
        console.log(req.user, 'voici le req user')
        req.user = rows[0];
        // PASSE AU PROCHAIN MIDDLEWARE
        next();
    }catch(error){
        error.status=401;
        next(error);
    }
}