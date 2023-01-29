const ApiError = require("../api-error");
const DestinationService = require("../services/destination.service");
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    try {
        const destinationService = new DestinationService(MongoDB.client);
        const document = await destinationService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the destination'));
    }
}

exports.findAll = async (_req, res, next) => {
    try{
        const destinationService = new DestinationService(MongoDB.client);
        documents = await destinationService.find({});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving destinations')
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try{
        const destinationService = new DestinationService(MongoDB.client);
        const document = await destinationService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, 'Destination not found'));
        }

        return res.send(document);

    }catch(error) {
        return next(
            new ApiError(500, `Error retrieving destination with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0 ){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try{
        const destinationService = new DestinationService(MongoDB.client);
        const document = await destinationService.update(req.params.id, req.body);

        if(!document){
            return next(new ApiError(404, 'Destination not found'));
        }

        return res.send({message: 'Destination was updated successfully'});
    }catch(error){
        return next(
            new ApiError(500, `Error updating destination with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const destinationService = new DestinationService(MongoDB.client);
        const document = await destinationService.delete(req.params.id);

        if(!document){
            return next(new ApiError(404, 'Destination not found'));
        }

        return res.send({message: 'Destination was deleted successfully'});

    }catch(error){
        return next(
            500, 
            `Could not delete destination with id=${req.params.id}`
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try{
        const destinationService = new DestinationService(MongoDB.client);
        const deleteCount = await destinationService.deleteAll().length;

        return res.send({
            message: `${deleteCount} destinations were deleted successfully`,
        })
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while removing all destinations')
        );
    }
};

