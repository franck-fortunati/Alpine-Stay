import Chalet from "../models/chaletModel.js";
import Reservation from "../models/reservationModel.js";

export const calculateReservationLogic = (arrivalDate, departureDate, pricePerNight, formule, persons) => {
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);

    const dateDifferenceMs = departure - arrival;
    const totalNights = Math.ceil(dateDifferenceMs / (1000 * 60 * 60 * 24));

    let multiplier = 1.0;
    if (formule === 'luxe') {
        multiplier = 1.5;
    } else if (formule === 'premium') {
        multiplier = 1.2;
    }

    const priceHT = totalNights * pricePerNight * multiplier;
    const taxRatePerPersonPerNight = 2.00;
    const touristTax = totalNights * persons * taxRatePerPersonPerNight;
    const totalPrice = priceHT + touristTax;

    return {
        nights: totalNights,
        priceHT: Number(priceHT.toFixed(2)),
        touristTax: Number(touristTax.toFixed(2)),
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

export const findExistingReservations = async (chaletId) => {
    return await Reservation.find({chalet: chaletId, status: { $in: ['En attente', 'Confirmée'] }}).select('arrivalDate departureDate');
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