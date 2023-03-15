const { ObjectId } = require('mongodb');

class AccountService {
    constructor(client) {
        this.Account = client.db().collection('account');
    }

    extractData(payload) {
        const account = {
            username: payload.username,
            fullName: payload.fullName,
            email: payload.email,
            address: payload.address,
            password: payload.password,
            date: payload.date
        };

        return account;
    }

    async register(payload) {
        const account = this.extractData(payload);

        await this.Account.insertOne(account);
    }

    async find(filter) {
        const cursor = await this.Account.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Account.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
}

module.exports = AccountService;