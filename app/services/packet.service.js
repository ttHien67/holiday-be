const {Object, ObjectId} = require('mongodb');

class PacketService {
    constructor(client) {
        this.Packet = client.db().collection('packages');
    }


    // dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractPacketData(payload) {
        const packet = {
            title: payload.title,
            logo: payload.logo,
            location: payload.location,
            type: payload.type,
            img: payload.img,
            newPrice: payload.newPrice,
            oldPrice: payload.oldPrice,
            colorBtn: payload.colorBtn,
            colorIcon: payload.colorIcon,
            description: payload.description,
        };

        return packet;
    }

    async create(payload) {
        const packet = this.extractPacketData(payload);
        const result = await  this.Packet.findOneAndUpdate(
            packet,
            { $set: this.packet = packet },
            { returnDocument: 'after', upset: true}
        );

        return result.value;
    }

    async find(filter) {
        const cursor = await this.Packet.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Packet.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        };

        const update = this.extractPacketData(payload);
        const result = await this.Packet.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: 'after'}
        );

        return result.value;
    }

    async delete(id){
        const result = await this.Packet.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });

        return result.value;
    }   

    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }

}

module.exports = PacketService;