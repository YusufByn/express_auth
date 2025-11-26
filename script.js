import { testConnection, pool } from "./src/db/index.js";


try{
    await testConnection();
    await pool.end();
    console.log('le server est pret a etre lancé!');
    process.exit(0);

}catch(error){

    console.error("co impossinle", error);
    process.exit(1);

}   