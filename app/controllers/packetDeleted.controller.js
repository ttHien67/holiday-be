const ApiError = require("../api-error");
const PacketDeletedService = require("../services/packetDeleted.service");
const MongoDB = require('../utils/mongodb.util');

exports.findAll = async (_req, res, next) => {
    try{
        const packetService = new PacketDeletedService(MongoDB.client);
        documents = await packetService.find({});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving packets')
        );
    }

    return res.send(documents);
};

exports.restore = async (req, res, next) => {
    try {
        const packetService = new PacketDeletedService(MongoDB.client);
        
        await packetService.restore(req.body);
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the packet'));
    }
    return res.send({message: 'Packet has been created'})
}


exports.delete = async (req, res, next) => {
    try{
        const packetService = new PacketDeletedService(MongoDB.client);
        const document = await packetService.delete(req.params.id);

        if(!document){
            return next(new ApiError(404, 'Packet not found'));
        }

        return res.send({message: 'Packet was deleted successfully'});

    }catch(error){
        return next(
            500, 
            `Could not delete packet with id=${req.params.id}`
        );
    }
};

