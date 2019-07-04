const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowlege_stats', { useNewUrlParser: true })
    .catch(e => console.log(e))