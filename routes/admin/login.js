const express = require('express');
const router = express.Router();

// Mostrar formulario de login
router.get('/', (req, res) => {
  res.render('admin/login', { usuario: req.session.usuario });
});

// Capturar datos del formulario y guardarlos en sesión
router.post('/', (req, res) => {
  const { usuario } = req.body;   // el input del formulario
  req.session.usuario = usuario;  // guardar en sesión
  res.redirect('/admin/login');   // volver a la misma vista
});

module.exports = router;
