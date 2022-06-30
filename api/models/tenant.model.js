const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcrypt");


const status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
});

const gender = Object.freeze({ male: 'male', female: 'female' });

const identityType = Object.freeze({ nid: 'nid', passport: 'passport', birthCertificate: 'birth_certificate' });

const identitySchema = new Schema([{
    type: { type: String, enum: Object.values(identityType), required: false, default: null },
    identity: { type: String, required: false, default: null },
},{ _id: false }]);

const personalSchema = new Schema({
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    gender: { type: String, enum: Object.values(gender), required: false, default: gender.male },
    photo: { type: String, required: false, default: null },
    dateOfBirth: { type: Date, required: false, default: null },
    birthPlace: { type: String, required: false, default: null },
    bloodGroup: { type: String, required: false, default: null },
    fathersName: { type: String, required: false, default: null },
    fathersPhone: { type: String, required: false, default: null },
    fathersOccupation: { type: String, required: false, default: null },
    mothersName: { type: String, required: false, default: null },
    mothersPhone: { type: String, required: false, default: null },
    mothersOccupation: { type: String, required: false, default: null },
    identity: { type: identitySchema, required: false },
    religion: { type: String, required: false, default: null },
    presentAddress: { type: String, required: false, default: null },
    permanentAddress: { type: String, required: false, default: null },
},{ _id: false });

const emergencySchema = new Schema([{
    name: { type: String, required: false, default: null },
    number: { type: String, required: false, default: null },
    relation: { type: String, required: false, default: null },
    address: { type: String, required: false, default: null },
},{ _id: false }]);




const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    },  
    personal: {
        type: personalSchema,
        required: false,
        default: () => ({})
    },
    emergency: {
        type: emergencySchema,
        required: false,
        default: () => ({})
    },
    status: {
        type: String,
        enum: Object.values(status),
        required: true,
    }
}, { timestamps: true });

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("tenant", schema);
module.exports = {TenantModel: model, TenantStatus: status};