const ApiError = require("../api-error");
const PacketService = require("../services/packet.service");
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    try {
        const packetService = new PacketService(MongoDB.client);
        
        await packetService.create(req.body);
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the packet'));
    }
    return res.send({message: 'Packet has been created'})
}

exports.findAll = async (_req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
        documents = await packetService.find({});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving packets')
        );
    }

    return res.send(documents);
};

exports.search = async (req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
        documents = await packetService.find({title: req.params.name});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving packets')
        );
    }

    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
        const document = await packetService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, 'Packet not found'));
        }

        return res.send(document);

    }catch(error) {
        return next(
            new ApiError(500, `Error retrieving packet with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0 ){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try{
        const packetService = new PacketService(MongoDB.client);
        const document = await packetService.update(req.params.id, req.body);

        if(!document){
            return next(new ApiError(404, 'Packet not found'));
        }

        return res.send({message: 'Packet was updated successfully'});
    }catch(error){
        return next(
            new ApiError(500, `Error updating packet with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
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

exports.deleteAll = async (_req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
        const deleteCount = await packetService.deleteAll().length;

        return res.send({
            message: `${deleteCount} packets were deleted successfully`,
        })
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while removing all packets')
        );
    }
};

