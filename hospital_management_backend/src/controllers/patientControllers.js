const Patient = require("../model/Patient");
const {validationResult} = require('express-validator');
// const Hospital = require('../model/Hospital');


exports.signUp = async (req, res) => {
    firstName = req.body.Fname;
    lastName = req.body.Lname;
    Email = req.body.Email;
    password = req.body.Password;
    phoneNo = req.body.Phoneno;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).send({
            errorMessage: errors.array()[0].msg,
        });
    }
    const patient = new Patient(req.body);

    try {
        await patient.save();
        const token = await patient.generateAuthToken();
        res.status(201).send({patient, token});

    } catch (e) {
        res.status(400).send(e);

    }
};

exports.signIn = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).send({
            errorMessage: errors.array()[0].msg,
        });
    }
    try {
        console.log(req.body)
        const patient = await Patient.findByCredentials(req.body.email, req.body.password);
        // const token = await Patient.generateAuthToken();
        if (!patient) {
            return res.status(422).send({
                errorMessage: "Unable to login",
            });
        }
        return res.status(200).send(patient);

    } catch (e) {
        return res.status(422).send({
            errorMessage: "Unable to login",
        });
    }
};

