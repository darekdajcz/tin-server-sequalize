const db = require('./../models');

// create Bank Model
const Bank = db.banks;

// 1. add Bank
const addBank = async (req, res) => {
    console.log(req.body);
    try {
        const { name, address } = req.body;

        const data = {  name, address };

        // Create bank in our database
        await Bank.create(data);

        res.status(201).json({ created: true });

    } catch (err) {
        console.log(err);
    }
};

// 2. get all banks
const getAllBanks = async (req, res) => {

    const banks = await Bank.findAll({
        attributes: ['name', 'address']
    });

    res.status(200).send(banks);
};

// 3. get single bank
const getBank = async (req, res) => {
    try {
        const id = req.params.id;

        const bank = await Bank.findOne({ where: { id } });

        if (bank) {
            return res.status(200).json({ bank });
        }

        res.status(400).send(`Not Found Bank by id: ${bank_id}`);

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
