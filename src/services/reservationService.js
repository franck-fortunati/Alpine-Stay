import Chalet from "../models/chaletModel.js";
import Reservation from "../models/reservationModel.js";

export const calculateReservationLogic = (arrivalDate, departureDate, pricePerNight, formule, isPeakSeason) => {
    arrivalDate = new Date(arrivalDate);
    departureDate = new Date(departureDate);

    const dateDifferenceMs = departureDate - arrivalDate;
    const totalNights = dateDifferenceMs / (1000 * 60 * 60 * 24);
    let multiplier;

    if(formule === 'luxe') {
        multiplier = 1.5;
    } else if (formule === 'premium') {
        multiplier = 1.2;
    } else {
        multiplier = 1.0;
    };

    let totalPrice = totalNights * pricePerNight * multiplier;

    if(isPeakSeason === true) {
        totalPrice *= 1.20;
    };

    return {
        nights: totalNights,
        totalPrice: Number(totalPrice.toFixed(2))
    };
};

export const saveReservation = async (reservationData) => {
    const newReservation = new Reservation({
        ...reservationData
    });

    return await newReservation.save();
};

export const findReservationsByUserId = async (userId) => {
    return await Reservation.find({user: userId}).populate({
        path: 'chalet',
        populate: { path: 'station' }
    });
};

export const updateReservationStatus = async (reservationId, userId) => {
    const reservationFilter = {
        _id: reservationId,
        user: userId
    };

    const reservation = await Reservation.findOne(reservationFilter);

    if(!reservation) {
        throw new Error('Réservation introuvable ou non autorisée.')
    };

    const today = new Date();
    const arrival = new Date(reservation.arrivalDate);
    const diffTime = arrival - today;
    const diffDay = diffTime / (1000 * 60 * 60 * 24);

    let targetStatus;

    if (diffDay >= 14) {
        targetStatus = 'Annulée'
    } else {
        targetStatus = 'Demande annulation'
    };

    reservation.status = targetStatus;
    return await reservation.save();
};

export const changeReservationStatus = async (reservationId, status) => {
    const modification = {
        status: status
    };

    const reservation = await Reservation.findByIdAndUpdate(reservationId, modification, {new: true})
    return reservation;
};

export const findIncomingReservation = async(ownerId) => {
    const ownerChalet = await Chalet.find({owner: ownerId}).select('_id');

    const chaletId = ownerChalet.map((chalet) => {
        return chalet._id;
    });

    return await Reservation.find({chalet: {$in: chaletId}})
        .populate({
            path: 'chalet',
            populate: {path: 'station'}
        })
        .populate('user');
};