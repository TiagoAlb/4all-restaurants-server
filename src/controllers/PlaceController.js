const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { name } = req.body;

        await connection('place').insert({
            name
        });

        return res.status(201).json({ message: 'Lugar criado com sucesso!' });
    },

    async get(req, res) {
        const placeId = connection.ref('place.id');
        const subQuery = connection('dish').count('*').where('placeId', placeId).as('dishes_count');
        const places = await connection('place').select('*', subQuery);

        return res.status(200).json(places);
    },

    async getById(req, res) {
        const placeId = connection.ref('place.id');
        const subQuery = connection('dish').count('*').where('placeId', placeId).as('dishes_count');
        const places = await connection('place').select('*', subQuery).where('place.id', req.params.id);

        return res.status(200).json(places);
    }
}