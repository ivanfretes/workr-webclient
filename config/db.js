const mongoose = require('mongoose');
const config = require('config');

const URI = config.get('mongoURI2');

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology : true,
            useFindAndModify : false
        });
        console.log('MongoDB Connected...')
    } catch (error) {
        console.log(error.message)
        console.log('its no ok')
        console.log(error)
        process.exit(1);
    }
}


module.exports = connectDB
