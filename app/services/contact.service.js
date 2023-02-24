const {Object, ObjectId} = require('mongodb');

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection('contacts');
    }


    // dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractContactData(payload) {
        const contact = {
            fullName: payload.fullName,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            message: payload.message,
            packetID: payload.packetID,
            quantity: payload.quantity,
            date: payload.date,
        };

        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        await this.Contact.insertOne(contact);
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        };

        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: 'after'}
        );

        return result.value;
    }

    async delete(id){
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });

        return result.value;
    }   

    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }

}

module.exports = ContactService;