const mongoose = require('../../src/database/')

module.exports.clearCollections = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports.disconnect = async () => {
    mongoose.disconnect();
} 