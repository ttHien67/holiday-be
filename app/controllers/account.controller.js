const ApiError = require("../api-error");
const MongoDB = require('../utils/mongodb.util');
const AccountService = require("../services/account.service");

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
