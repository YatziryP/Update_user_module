const express = require("express");
const Controller = require("./controller");
const { auth } = require("firebase-admin");

const router = express.Router();

function addUser(req, res) {
    const { auth } = req;
    const {
        email,
        password,
        displayName
    } = req.body;

    Controller.addUser({
        auth,
        email,
        password,
        displayName
    })
    .then((result) => res.send(result))
    .catch((error) => res.send(error))

}

function getUser(req, res) {
    const { auth } = req;
    const { email } = req.body;

    Controller.getUser({
        auth,
        email
})
    .then((result) => res.send(result))
    .catch((error) => res.send(error))
}

// /users post agregar
// /users pacth actualizar
// /user deldete eliminar
// /users get obtener

function updateUser(req, res) {
    const { auth } = req;
    const { email, displayName, password } = req.body;
    if (password === "") {
        delete req.body.password;
    }
    Controller.updateUser({
        auth,
        email,
        displayName,
        password: req.body.password
    })

    .then((result) => res.send(result))
    .catch((err) => res.status(500).json(`Error interno ${err}`));
}

router.post("/", addUser)
router.get("/get-user", getUser)
router.patch('/user', updateUser)

module.exports = router