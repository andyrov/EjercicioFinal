function adminMiddleware (req, res, next) {
    if (req.session.userLogged.rol != 1) {
        return res.send('Necesitas permiso para realizar cambios');
    }
    next();
}

module.exports = adminMiddleware;