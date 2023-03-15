const ApiError = require("../api-error");
const MongoDB = require('../utils/mongodb.util');
const AccountService = require("../services/account.service");

var jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const accountService = new AccountService(MongoDB.client);

        // find account exist username or email 
        let documents = await accountService.find({$or: [
            {username: req.body.username}, 
            {email: req.body.email}
        ]});

        // convert array to boolean
        documents = documents.toString()

        if(!documents) {
            await accountService.register(req.body)
        }else {
            return res.send({message: 'Account has been existed'})
        }
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the account'));
    }
    return res.send({message: 'Account has been created'})
};

exports.login = async (req, res, next) => {
    try {
        const accountService = new AccountService(MongoDB.client);

        // vertify username account 
        let documents = await accountService.find({$and: [
            {username: req.body.username}, 
            {password: req.body.password}
        ]});

        // convert array to string
        const isEmpty = documents.toString();

        if(!isEmpty) {
            return res.send({
                message: 'Account has not been existed', 
                username: documents[0]?.username
            })
        }else {

            // create jwt token
            const token = jwt.sign({
                userId: documents[0]._id,
                username: documents[0].username
            }, 'secret', { expiresIn: '24h' })

            return res.send({
                message: "Login Successful...!",
                username: documents[0].username,
                token
            }); 
        }
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the account'));
    }
}

exports.findOne = async (req, res, next) => {
    try{
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, 'Account not found'));
        }

        return res.send(document);

    }catch(error) {
        return next(
            new ApiError(500, `Error retrieving account with id=${req.params.id}`));
    }
};
