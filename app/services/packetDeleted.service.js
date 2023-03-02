const {Object, ObjectId} = require('mongodb');

class PacketDeletedService {
    constructor(client) {
        this.Packet = client.db().collection('packetsDeleted');
    }


    // dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractPacketData(payload) {
        const packetDeleted = {
            img: payload.img,
            logo: payload.logo,
            title: payload.title,
            location: payload.location,
            type: payload.type,
            newPrice: payload.newPrice,
            oldPrice: payload.oldPrice,
            colorBtn: payload.colorBtn,
            colorIcon: payload.colorIcon,
            description: payload.description,
        };

        return packetDeleted;
    }

    async find(filter) {
        const cursor = await this.Packet.find(filter);
        return await cursor.toArray();
    }

    async restore(payload) {
        const packetDeleted = this.extractPacketData(payload);
        await this.Packet.insertOne(packetDeleted);
    }

    async delete(id){
        const result = await this.Packet.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });

        return result.value;
    }   
}

module.exports = PacketDeletedService;