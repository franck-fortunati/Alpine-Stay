import Chalet from '../models/chaletModel.js';

export const findApprovedChalets = async () => {
    return await Chalet.find({status: 'Validé'})
        .populate('owner')
        .populate('station')
};

export const findChaletById = async (chaletId) => {
    return await Chalet.findById(chaletId)
        .populate('owner')
        .populate('station')
};

export const findChaletByOwnerId = async (ownerId) => {
    return await Chalet.find({owner: ownerId}).populate('station');
};

export const saveChalet = async (data, userId) => {
    const newChalet = new Chalet({
        ...data,
        piedDesPistes: data.piedDesPistes === 'on' || data.piedDesPistes === true,
        owner: userId
    });

    return await newChalet.save();
};

export const editChalet = async (chaletId, data, userId) => {
    const editFilter = {
        _id: chaletId,
        owner: userId
    };

    const updatedData = {
        ...data,
        piedDesPistes: data.piedDesPistes === 'on' || data.piedDesPistes === true,
    };

    return await Chalet.findOneAndUpdate(editFilter, updatedData, {new: true});
};

export const removeChalet = async (chaletId, userId) => {
    const removeFilter = {
        _id: chaletId,
        owner: userId
    };

    return await Chalet.findOneAndDelete(removeFilter);
};