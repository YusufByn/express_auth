// import de l'app, de mon tableau env dans le fichier 
// et de mes fonctions dans le fichier index dans db
import app from "./app.js";
import { env } from "./config/env.js";
import { testConnection } from "./db/index.js";

// fonction try and catch pour démarrer le server
async function start(){
    try{
        // await psk function async, on utilise cette fonction pour avoir la petite requetes SQL 
        // quand c'est bon
        await testConnection();
        // lancement du serv avec le console.log
        app.listen(env.port, ()=>{
            console.log(`le server est pret et lancé sur le port suivant ${env.port}`);
        })
    }catch(error){
        // message d'erruer avec l'erreur
        console.error('lancement server impossible', error);
        // arret du programme
        process.exit(1);
    }
}

start();