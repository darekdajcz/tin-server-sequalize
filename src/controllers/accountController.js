const db = require('./../models');

// create Account Model
const Account = db.accounts;

// 1. add Account
const addAccount = async (req, res) => {
    console.log(req.body);
    try {
        const { account_number, creation_date, bonuses, client_id, bank_id } = req.body;

        const data = { account_number, creation_date, bonuses, client_id, bank_id };

        // Create account in our database
        await Account.create(data);

        res.status(201).json({ created: true });

    } catch (err) {
        console.log(err);
    }
};

// 2. get all accounts
const getAllAccounts = async (req, res) => {

    const accounts = await Account.findAll({
        attributes: ['id', 'account_number', 'creation_date', 'bonuses', 'client_id', 'bank_id']
    });

    res.status(200).send(accounts);
};

// 3. get single account
const getAccount = async (req, res) => {
    try {
        const id = req.params.id;

        const account = await Account.findOne({ where: { id } });

        if (account) {
            return res.status(200).json({ account });
        }

        res.status(400).send(`Not Found Account by id: ${account_id}`);

    } catch (err) {
        console.log(err);
    }
};

// 4. update Account
const updateAccount = async (req, res) => {
    const id = req.body.id;

    await Account.update(req.body, { where: { id } });

    res.status(201).json({ updated: true });

};

// 6. delete Account
const deleteAccount = async (req, res) => {
    const id = req.params.id;

    await Account.destroy({ where: { id } });

    res.status(201).json({ deleted: true });
};


module.exports = {
    addAccount, getAllAccounts, getAccount, updateAccount, deleteAccount
};
