import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

// création de pool de connexion mysql
// (groupe de connnexion réutilisnales comme ca pas de nouvelle à chaque requete)
export const pool = mysql.createPool({
    // adresse de la db/server
    host: env.db.host,
    // le port sur lequel il y est
    port: env.db.port,
    // le pseudo/identifiant
    user: env.db.user,
    // le mdp
    password: env.db.password,
    // la base de données sur laquelle se connecter/créer
    database: env.db.database,
    // limite le nombre de connexion à 10
    connectionLimit: 10,
});

// function pour tester la connexion qui fait simplement un select now dans la console
// pool query permet de faire des requetes sql directement depuis l'app
export async function testConnection() {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log("connecté a mysql à", rows[0].now);
    
}