module.exports = app => {
    const Stat = app.mongoDb.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => res.json(stat))
    }

    return { Stat, get }
}