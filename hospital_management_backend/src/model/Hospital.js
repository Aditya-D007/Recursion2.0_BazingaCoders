const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
        trim: true
    },
    hospitalId: {
        type: String,
        required: true,
        unique: true,
    },
    hospitalPhone: {
        type: String,
        required: true,
    },
    hospitalPassword: {
        type: String,
        required: true,
    },
    hospitalAddress: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    numberOfBeds: {
        type: Number,
    },
    numberOfOccupiedBeds: {
        type: Number,
    },
    Open: {
        type: Boolean,
        default: true,
    },
    timeSlotId: {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlots',
        required: false
    },
    patientId:[{
        eventDate: {
            type:Date
        },
        patientName: {
            type: String,
        },
        patientPhoneNo: {
            type: Number,
        },
        eventTiming: [{
            startTime: {type: Date, required: true},
        }],
    }]
})
const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital
