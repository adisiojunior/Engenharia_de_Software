const Rating = require('../models/Rating')

const create = async (req, res) => {
    const { stars, userId, description, serviceId } = req.body;

    try {
        const doc = await Rating.find({ stars, userId, description, serviceId })
        
        if (doc) {
            return res.status(409).send({ error: 'Duplicated rating' });
        }

        const rating = await Rating.create(req.body);

        return res.status(200).send({ rating });
    } catch (error) {
        return res.status(400).send({ error: 'Some error ocurred' })
    }
}

module.exports = { create }