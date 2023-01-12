const db = require('./../models');

// create Account Model
const Bank = db.accounts;

// 1. add Bank
const addBank = async (req, res) => {
    console.log(req.body);
    try {
        const { account_number, creation_date, bonuses, client_id, bank_id } = req.body;

        const data = { account_number, creation_date, bonuses, client_id, bank_id };

        // Create account in our database
        await Bank.create(data);

        res.status(201).json({ created: true });

    } catch (err) {
        console.log(err);
    }
};

// 2. get all accounts
const getAllBanks = async (req, res) => {

    const accounts = await Bank.findAll({
        attributes: ['account_number', 'creation_date', 'bonuses', 'client_id', 'bank_id']
    });

    res.status(200).send(accounts);
};

// 3. get single account
const getBank = async (req, res) => {
    try {
        const id = req.params.id;

        const account = await Bank.findOne({ where: { id } });

        if (account) {
            return res.status(200).json({ account });
        }

        res.status(400).send(`Not Found Bank by id: ${account_id}`);

    } catch (err) {
        console.log(err);
    }
};

// 4. update Bank
const updateBank = async (req, res) => {
    const id = req.body.id;

    await Bank.update(req.body, { where: { id } });

    res.status(201).json({ updated: true });

};

// 6. delete Bank
const deleteBank = async (req, res) => {
    const id = req.params.id;

    await Bank.destroy({ where: { id } });

    res.status(201).json({ deleted: true });
};


module.exports = {
    addBank, getAllBanks, getBank, updateBank, deleteBank
};
