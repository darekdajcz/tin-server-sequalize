const db = require('./../models');

// create Client Model
const Client = db.clients;

// 1. add Client
const addClient = async (req, res) => {
    try {
        const { pesel, first_name, surname, address, can_get_loan } = req.body;

        //Encrypt user password
        const data = { pesel, first_name, surname, address, can_get_loan };

        // Create client in our database
        await Client.create(data);

        res.status(201).json({ created: true });

    } catch (err) {
        console.log(err);
    }
};

// 2. get all users
const getAllClients = async (req, res) => {

    const clients = await Client.findAll({
        attributes: ['id', 'pesel', 'first_name', 'surname', 'address', 'can_get_loan']

    });

    res.status(200).send(clients);
};

// 3. get single user
const getClient = async (req, res) => {
    try {
        const id = req.params.id;

        const client = await Client.findOne({ where: { id } });

        if (client) {
            return res.status(200).json({ client });
        }

        res.status(400).send(`Not Found Client by id: ${id}`);

    } catch (err) {
        console.log(err);
    }
};

// 4. update Client
const updateClient = async (req, res) => {
    const id = req.body.id;

    const client = await Client.update(req.body, { where: { id } });

    res.status(201).json({ updated: true });

};

// 6. delete Client
const deleteClient = async (req, res) => {
    const id = req.params.id;

    await Client.destroy({ where: { id } });

    res.status(201).json({ deleted: true });
};


module.exports = {
    addClient, getAllClients, getClient, updateClient, deleteClient
};
