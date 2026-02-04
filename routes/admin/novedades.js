var express = require('express');
var router = express.router();
var novedadesmodel = require('/../modelos/novedadesModel');

router.get('/', async function(req, res, next) {
    
    var novedades = await novedadesModel.getNovedades();
    
    
    res.renderder('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

module.exports = router;
    