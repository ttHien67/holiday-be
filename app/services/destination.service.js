const {Object, ObjectId} = require('mongodb');

class DestinationService {
    constructor(client) {
        this.Destination = client.db().collection('destinations');
    }


    // dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractDestinationData(payload) {
        const destination = {
            title: payload.title,
            img: payload.img,
            logo: payload.logo,
            text: payload.text,
            packets: payload.packets,
        };

        return destination;
    }

    async create(payload) {
        const destination = this.extractDestinationData(payload);
        const result = await  this.Destination.findOneAndUpdate(
            destination,
            { $set: this.destination = destination },
            { returnDocument: 'after', upset: true}
        );

        return result.value;
    }

    async find(filter) {
        const cursor = await this.Destination.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Destination.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        };

        const update = this.extractDestinationData(payload);
        const result = await this.Destination.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: 'after'}
        );

        return result.value;
    }

    async delete(id){
        const result = await this.Destination.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });

        return result.value;
    }   

    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }

}

module.exports = DestinationService;