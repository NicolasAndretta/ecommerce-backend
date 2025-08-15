import bcrypt from "bcrypt";

const plainPassword = "user1234@";
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds).then(hash => {
    console.log("Hash generado:", hash);
});


//este archivo nace de la necesidad de generar un hash de una contraseña por un error que no estoy pudiendo ver"

