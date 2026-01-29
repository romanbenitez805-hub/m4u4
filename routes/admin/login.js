const express = require('express');
const router = express.Router();
const usuariosModel = require('../../modelos/usuariosModelos.js'); // ajustá la ruta si tu modelo está en otra carpeta

// Mostrar formulario de login
router.get('/', (req, res) => {
  res.render('admin/login', {
    usuario: req.session.usuario,
    error: false
  });
});

// Capturar datos del formulario y validar contra la BD
router.post('/', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if (user) {
      // Guardar datos en sesión
      req.session.id_usuario = user.id;
      req.session.usuario = user.usuario;

      // Redirigir al panel admin
      res.redirect('/admin');
    } else {
      // Si no existe, mostrar error
      res.render('admin/login', {
        error: true,
        usuario: null
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/login', {
      error: true,
      usuario: null
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;

