const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/guardar', (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect('/admin');
});

router.get('/admin', (req, res) => {
  res.render('admin', { nombre: req.session.nombre });
});

module.exports = router;

