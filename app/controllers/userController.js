const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const passwordLib = require('../libs/genratePasswordLib');
const tokenLib = require('../libs/tokenLib');
const check = require('../libs/checkLib');

/* Models */
const UserModel = mongoose.model('User')


// start user signup function 

let signUpFunction = (req, res) => {

    // start validateUserInput function
    let validateUserInput = () => {

        return new Promise((resolve, reject) => {

            if (req.body.email) {

                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req);
                }
            }
            else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }


        })
    }
    // end validateUserInput function


    //Create User function start 
    let createUser = () => {

        return new Promise((resolve, reject) => {

            //Checking whether the email id exists in User Model
            UserModel.findOne({ email: req.body.email })
                .exec((err, userDetails) => {

                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    }
                    else if (check.isEmpty(userDetails)) {

                        /*Getting the userName from body parameters and checking the substring 
                            of username ending with admin,if so set isAdmin value true otherwise false.
                        */
                        let userName=req.body.userName;

                        let lastCharacters=userName.substr(userName.length-5)

                        let isAdminValue= (lastCharacters === 'admin')?true:false;

                        // Creating User and saving in User Model by extracting the required fields from body parameters.

                        let newUser = new UserModel({

                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            userName:req.body.userName,
                            isAdmin:isAdminValue,
                            countryCode:req.body.countryCode,
                            mobileNumber: req.body.mobileNumber,
                            email: req.body.email.toLowerCase(),
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()

                        })

                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }

                        })
                    }
                    else {
                        logger.error('user already present', 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Duplicate user as user already exists', 403, null)
                        reject(apiResponse)
                    }

                })
        })
    }
    //end createUser function

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password;
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}// end user signup function 



// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {

        return new Promise((resolve, reject) => {
            //   UserModel.findOne({email: req.body.email})
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }

        })

    }


    let validatePassword = (retrievedUserDetails) => {

        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, ismatch) => {

                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }

            })

        })
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {

            tokenLib.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    // console.log(err)
                    logger.error(err.message, 'userController: generateToken()', 10)
                    let apiResponse = response.generate(true, 'Token Generation Failed', 500, null)
                    reject(apiResponse)
                }
                else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }

            })

        })

    }
    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}


// end of the login function 


let forgotPassword =(req,res) =>{

    let findUser = () => {

        return new Promise((resolve, reject) => {
            //   UserModel.findOne({email: req.body.email})
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                         logger.info('User Found', 'userController: findUser()', 10)
                        

                        const resetToken=crypto.randomBytes(20).toString('hex');

                        userDetails.update({
                            resetPasswordToken:resetToken
                        })
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }

        })

    }

    let sendMailWithResetToken=(req)


    
}

let resetPassword=(req,res) =>{

    let findUser = () => {

        return new Promise((resolve, reject) => {
            //   UserModel.findOne({email: req.body.email})
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }

        })

    }

    




}


let logout = (req, res) => {


} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    forgotPassword:forgotPassword,
    logout: logout

}// end exports