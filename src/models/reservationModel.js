import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chalet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chalet',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    formule: {
        type: String,
        enum: ['standard', 'premium', 'luxe'],
        default: 'standard',
        required: true
    },
    persons: {
        type: Number,
        required: true,
        min: 1
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    nights: {
        type: Number,
        required: true
    },
    priceHT: {
        type: Number,
        required: true
    },
    touristTax: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['En attente', 'Confirmée', 'Refusée', 'Annulée', 'Demande annulation'],
        default: 'En attente'
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;