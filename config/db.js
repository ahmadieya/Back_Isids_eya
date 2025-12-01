const mongoose = require('mongoose');
module.exports.connectToMongo = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://localhost:27017/isids')
    .then(
        () => { console.log("connect to db") }
    )
        .catch((err) => {
            console.log(err);
        });
}