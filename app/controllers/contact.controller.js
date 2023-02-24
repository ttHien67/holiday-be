const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        
        await contactService.create(req.body);
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the contact'));
    }
    return res.send({message: 'Contact has been created'})
}

exports.findAll = async (_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        documents = await contactService.find({});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        );
    }

    return res.send(documents);
};

exports.search = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        documents = await contactService.find({title: req.params.name});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        );
    }

    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, 'Contact not found'));
        }

        return res.send(document);

    }catch(error) {
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0 ){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);

        if(!document){
            return next(new ApiError(404, 'Contact not found'));
        }

        return res.send({message: 'Contact was updated successfully'});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);

        if(!document){
            return next(new ApiError(404, 'Contact not found'));
        }

        return res.send({message: 'Contact was deleted successfully'});

    }catch(error){
        return next(
            500, 
            `Could not delete contact with id=${req.params.id}`
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll().length;

        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        })
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while removing all contacts')
        );
    }
};

