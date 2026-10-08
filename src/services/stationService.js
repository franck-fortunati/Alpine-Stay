import Station from '../models/stationModel.js';

export const findAllStations = async () => {
    return await Station.find().sort({ name: 1 });
};