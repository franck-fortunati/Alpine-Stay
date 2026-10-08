import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: String,
        required: true
    },
    altitude: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    passSki: {
        dayPrice: {
            type: Number,
            required: true,
        },
        weekPrice: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }
});

const Station = mongoose.model("Station", stationSchema);
export default Station;