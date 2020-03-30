const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { name, description } = req.body;
        const price = req.body.price.toUpperCase().trim().replace('R$', '');
        const placeId = req.params.id;

        await connection('dish').insert({
            name,
            description,
            price,
            placeId
        });

        return res.status(201).json({ message: 'Prato criado com sucesso!' });
    },

    async get(req, res) {
        const placeId = req.params.id;
        const dishes = await connection('dish').select('*').where('placeId', placeId);

        return res.status(200).json(dishes);
    }
}