
const express = require('express');
const router = express.Router();
const empleadosModel = require('../modelos/empleadosModel'); // nombre correcto

// Middleware para proteger la ruta
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta principal del panel admin
router.get('/', secured, async (req, res) => {
  try {
    const empleados = await empleadosModel.getEmpleados();
    res.render('admin', {
      nombre: req.session.usuario,
      empleados
    });
  } catch (error) {
    console.log(error);
    res.render('admin', {
      nombre: req.session.usuario,
      empleados: [],
      error: true
    });
  }
});

module.exports = router;
