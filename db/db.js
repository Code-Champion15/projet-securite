const mongoose = require('mongoose');

module.exports.connectToMongoDB = () => {
    mongoose.set('strictQuery', false);

    const dbUrl = process.env.MONGO_URI;

    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connexion réussie à MongoDB.'))
        .catch((error) => {
            console.error('Echec de connexion à MongoDB :', error.message);
            process.exit(1);
        });
};
