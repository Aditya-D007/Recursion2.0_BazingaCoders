const hospitalModel = require('../model/Hospital');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

exports.registerhospital = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const error = new Error('Validation failed.');
    //     error.statusCode = 422;
    //     error.data = errors.array();
    //     throw error;
    // }
    
    const hospitalName = req.body.hospitalName;
    const hospitalId = req.body.hospitalId;
    const hospitalPhone = req.body.hospitalPhone
    const hospitalPassword = req.body.hospitalPassword;
    const hospitalAddress = req.body.hospitalAddress;
    const hospitalCoordinates = req.body.hospitalCoordinates;
    bcrypt
        .hash(hospitalPassword, 12)
        .then(hashedPw => {
            const hospital = new hospitalModel({
                hospitalName: hospitalName,
                hospitalId: hospitalId,
                hospitalPhone: hospitalPhone,
                hospitalPassword: hashedPw,
                hospitalAddress: hospitalAddress,
                location: hospitalCoordinates
            });
            return hospital.save();
        })
        .then(result => {
            res.status(201).json({message: 'User created!', hospitalId: result._id});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.loginhospital = (req, res, next) => {
    console.log(req.body)
    const email = req.body.hospitalId;
    const password = req.body.hospitalPassword;
    let loadedUser;
    hospitalModel.findOne({hospitalId: email})
        .then(hospital => {
            if (!hospital) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = hospital;
            return bcrypt.compare(password, hospital.hospitalPassword);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecretsecret',
                {expiresIn: '1h'}
            );
            res.status(200).json({token: token, userId: loadedUser._id.toString()});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.getNearesthospitals = (req, res, next) => {
    const originLatitude = req.body.latitude;
    const originLongitude = req.body.longitude;


    hospitalModel
        .find({
            location: {
                $near: {
                    $maxDistance: 2000, $geometry: {
                        type: "Point",
                        coordinates: [originLongitude, originLatitude]
                    }
                }
            }
        }).limit(5)

        .then(result => {
            res.send(result)
        })
};


exports.getSinglehospital = (req, res, next) => {
    const hospitalObjectId = req.body.hospitalObjectId;


    hospitalModel
        .findById(hospitalObjectId)

        .then(result => {
            res.send(result)
        })
};

exports.getPatientsForhospital = (req, res, next) => {
    const hospitalObjectId = req.body.hospitalObjectId;


    hospitalModel
        .findById(hospitalObjectId)

        .then(result => {

           if(result.patientId) {
               res.send(result.patientId)
           }
           res.send({"message":"No Patients Yet"})

        })
};
