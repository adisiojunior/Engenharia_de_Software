const Service = require('../models/Service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create } = require('../models/Service');
const User = require('../models/User');
require('dotenv/config');

module.exports = {

    async create(req, res) {


        try {

            const user = await User.findById(req.userId).select('+password')   

            if (await Service.findOne({ name: req.name, street: req.street })) {
                return res.status(409).send({ error: `Serviço já existente` });
            }

            const service = await Service.create(req.body);
            
            user.services.push(service);
            user.save();

            return res.send({
                service
            });

        }
            catch (err) {
                return res.status(400).send({ error: 'Falha no cadastro do serviço ou comércio.' });
            }        
        
    }
}