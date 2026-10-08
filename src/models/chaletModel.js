import mongoose from "mongoose";

const chaletSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    piedDesPistes: {
        type: Boolean,
        required: true,
        default: false
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['En attente', 'Validé', 'Refusé'],
        default: 'En attente'
    }
}, {
    timestamps: true
});

const Chalet = mongoose.model('Chalet', chaletSchema);
export default Chalet;