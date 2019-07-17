const admin = require('../config/admin')

module.exports = app => {
    // app.post('/signup', app.api.user.save)
    // app.post('/signin', app.api.auth.signin)
    // app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        // .all(app.config.passport.authenticate())
        .get(app.api.user.get)
        .post(app.api.user.save)//admin()

    app.route('/users/:id')
        // .all(app.config.passport.authenticate())
        .delete(app.api.user.remove)//admin()
        .put(app.api.user.save)//admin()

    app.route('/categories')
        // .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(app.api.category.save)//admin()

    app.route('/categories/tree')
        // .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)//admin()
        .delete(app.api.category.remove)//admin()

    app.route('/articles')
        // .all(app.config.passport.authenticate())
        .get(app.api.articles.get)
        .post(app.api.articles.save)//admin()

    app.route('/articles/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.articles.getById)
        .put(app.api.articles.save)//admin()
        .delete(admin(app.api.articles.remove))

    app.route('/categories/:id/articles')
        // .all(app.config.passport.authenticate())
        .get(app.api.articles.getByIdCategory)

    app.route('/stats')
        // .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}