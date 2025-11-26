// import de l'app, de mon tableau env dans le fichier 
// et de mes fonctions dans le fichier index dans db
import app from "./app.js";
import { env } from "./config/env.js";
import { testConnection, pool } from "./db/index.js";


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

// // condition 
// // si -> ce fichier est exécuté directement depuis al ligne de commande alors execute le reste
// // import meta url = sert a savoir quel fichier est entrain d'etre execute
// // processargv1 sera remplacé par le fichier execute dcp 
// // import meta url = url menant vers server.js === file://server.js grossomodo
// if (import.meta.url === `file://${process.argv[1]}`) {
//     // fonction pr tester la connexion sql
//     // si ca fonctionne il execute le then sinon le catch abec l'error qui stop le program avec msg
//     // d'erreur
//     // then = quand la promise a reussi execute ca
//     testConnection.then(()=>{
//         // console log de test
//         console.log('test terminé');
//         // on return ferme la connexion sql
//         return pool.end();
//     })

//     .catch((error)=>{
//         console.error('test manuel echoué', error);
//         process.exit(1)
//     })
// }

start();