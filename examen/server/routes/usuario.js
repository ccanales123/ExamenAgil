const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuarios', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Usuario.find({delete: false}, 'nick nombre apellidos correo rol ')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ delete: false }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });
});

app.get('/usuario/:nick', function(req, res) {
    let nickName = req.params.nick;
    Usuario.find({ nick: nickName}, 'nick nombre apellidos correo rol ')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios
            });

        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nick: body.nick,
        nombre: body.nombre,
        apellidos: body.apellidos,
        password: body.password,
        rol: body.rol,
        correo: body.correo,
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre' ,'apellidos', 'correo' ,'rol']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});


app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let cambiaEstadoDelete = {
        delete: true
    };

    Usuario.findByIdAndUpdate(id, cambiaEstadoDelete, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});



module.exports = app;