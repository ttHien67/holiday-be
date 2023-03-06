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
}

module.exports = AccountService;