import {
    findReservationsByUserId,
    findExistingReservations,
    calculateReservationLogic,
    saveReservation,
    updateReservationStatus,
    changeReservationStatus
} from '../services/reservationService.js'
import { findChaletById } from '../services/chaletService.js';

export const getChaletById = async (req, res) => {
    try {
        const userEmail = req.session.user.email;
        const today = new Date().toISOString().split('T')[0];
        const chalets = await findChaletById(req.params.chaletId);
        const existingReservations = await findExistingReservations(req.params.chaletId);

        return res.render('layout', {
            title: 'Réserver un Chalet',
            page: 'pages/reservationForm',
            chalets,
            today,
            userEmail,
            existingReservations: JSON.stringify(existingReservations)
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la récupération du chalet');
    }
};

export const getReservationByUserId = async (req, res) => {
    try {
        const userId = req.session.user._id;
        const reservations = await findReservationsByUserId(userId);
        return res.render('layout', {
            title: 'Mes Réservations',
            page: 'pages/myReservation',
            reservations
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la récupération de vos réservations');
    }
};

export const createReservation = async (req, res) => {
    try {
        const {
            chaletId,
            arrivalDate,
            departureDate,
            persons,
            formule,
            peakSeason
        } = req.body;

        const userId = req.session.user._id;
        const chalet = await findChaletById(chaletId);

        const calculation = calculateReservationLogic(
            arrivalDate,
            departureDate,
            chalet.pricePerNight,
            formule,
            peakSeason === 'on' || peakSeason === true
        );

        const reservationData = {
            user: userId,
            chalet: chaletId,
            arrivalDate,
            departureDate,
            persons,
            formule,
            peakSeason: peakSeason === 'on' || peakSeason === true,
            nights: calculation.nights,
            totalPrice: calculation.totalPrice
        };

        const reservation = await saveReservation(reservationData);
        return res.redirect('/reservation/my-reservation');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la création de la réservation');
    };
};

export const cancelReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const userId = req.session.user._id;
        const cancel = await updateReservationStatus(reservationId, userId);
        res.redirect('/reservation/my-reservation');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors du changement de status de la réservation.');
    };
};

export const updateReservationStatusByHost = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const status = req.body.status;
        const update = await changeReservationStatus(reservationId, status);
        res.redirect('/chalet/my-locations');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors du changement de status de la réservation.');
    };
};