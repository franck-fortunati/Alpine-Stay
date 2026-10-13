import {
    findApprovedChalets,
    findChaletById,
    findChaletByOwnerId,
    saveChalet,
    editChalet,
    removeChalet
} from '../services/chaletService.js'
import { findAllStations } from '../services/stationService.js';

export const getAllChalet = async (req, res) => {
    try {
        const chalets = await findApprovedChalets();
        return res.render('layout', {
            title: 'Nos Chalets',
            page: 'pages/annonces',
            chalets: chalets
        });
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Erreur serveur');
    };
};

export const getChaletById = async (req, res) => {
    try {
        const chaletId = req.params.id;
        const chalets = await findChaletById(chaletId);
        return res.render('pages/chalet', {
            title: chalet.title,
            page: 'pages/chalet',
            chalets
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getChaletForm = async (req, res) => {
    try {
        const stations = await findAllStations();
        return res.render('layout', {
            title: 'Ajouter un Chalet',
            page: 'pages/chaletForm',
            stations
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getEditChaletForm = async (req, res) => {
    try {
        const chaletId = req.params.id;
        const chalets = await findChaletById(chaletId);
        const stations = await findAllStations();
        return res.render('layout', {
            title: 'Modifier un Chalet',
            page: 'pages/chaletEditForm',
            chalets,
            stations
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getMyChalet = async (req, res) => {
    try {
        const ownerId = req.session.user._id;
        const chalets = await findChaletByOwnerId(ownerId);
        return res.render('layout', {
            title: 'Mes Locations',
            page: 'pages/myLocation',
            chalets
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    }
};

export const createChalet = async (req, res) => {
    try {
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '/images/default-chalet.jpg';

        const chaletData = {
            ...req.body,
            image: imagePath
        };
        const userId = req.session.user._id;
        const create = await saveChalet(chaletData, userId);
        return res.redirect('/chalet/my-locations')
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const updateChalet = async (req, res) => {
    try {
        const chaletId = req.params.id;
        const data = req.body;
        const userId = req.session.user._id
        const update = await editChalet(chaletId, data, userId);
        return res.redirect('/chalet/my-locations')
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const deleteChalet = async (req, res) => {
    try {
        const chaletId = req.params.id;
        const userId = req.session.user._id;
        const del = await removeChalet(chaletId, userId);
        return res.redirect('/chalet/my-locations');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};