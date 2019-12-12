const db = require('../models');

const { 
    // comprobarContrasenya,
    
    crearJWT,
     } = require('../servicios/autentificacion')

async function loginController(req, res) {

    try {

        const usuario = await db.Usuario.findOne({
            where: { email: req.body.email }
        });
        if (!usuario) throw new Error('No existe Usuario');

        const comprobarContrasenya = await db.Usuario.findOne({
            where: { contrasenya: req.body.contrasenya}
        }  
        );
        if (!comprobarContrasenya) throw new Error('Contraseña no valida');

        const dato = {
            nombre: usuario.nombre,
            email: usuario.email,
            id: usuario.id,
        };
        usuario.token = await crearJWT(dato);
        await usuario.save();

        res.json({
            message: 'login valido',
            usuario: dato,
            token: usuario.token
        });

    } catch (error){
        console.error(error);

        res.status(401).json({
            message: 'login invalido',
        });
    } 
}


module.exports = loginController;
