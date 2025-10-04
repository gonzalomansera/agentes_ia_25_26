// IMPORTACIONES (SIEMPRE AL COMIENZO DE MI ARCHIVO)

import dotenv from "dotenv"


//CARGO LAS VARIABLES .ENV A ESTE FICHERO

dotenv.config();
//TODAS LAS VARIABLES SETAN EN process.env.NOMBRE_DE_LA_VARIABLE.


//mostrar por consola el valor de las variables de ENTORNO.

console.log("URL de acceso: ",process.env.url);
console.log("PORT: ", process.env.port);
console.log(`URL con Puerto: ${process.env.url}:${process.env.port}`);