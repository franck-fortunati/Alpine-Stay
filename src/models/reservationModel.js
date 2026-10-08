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
    formule: {
        type: String,
        enum: ['standard', 'premium', 'luxe'],
        required: true
    },
    persons: {
        type: Number,
        required: true
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
    },
    peakSeason: {
        type: Boolean,
        default: false
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: ['En attente', 'Confirmée', 'Refusée', 'Annulée', 'Demande annulation'],
        default: 'en attente'
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;