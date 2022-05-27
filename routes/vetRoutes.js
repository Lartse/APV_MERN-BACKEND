import express from "express";
import { 
    registrar,
    perfil, 
    confirmar, 
    autenticar,
    comprobarToken,
    nuevoPassword,
    olvidePassword,
    actualizarPerfil,
    actualizarPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Public
router.post('/', registrar)
router.post('/login', autenticar)
router.post('/olvide-password', olvidePassword)
router.get('/confirmar/:token', confirmar)

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

//Private
router.get('/admin', checkAuth, perfil)
router.put('/admin/:id', checkAuth, actualizarPerfil)
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router;