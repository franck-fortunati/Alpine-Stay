import {
    getAdminStats,
    findAllUser,
    findAllChalet,
    findAllReservation,
    changeChaletStatus,
    removeUser
} from '../services/adminService.js';

export const getDashboard = async (req, res) => {
    try {
        const stats = await getAdminStats();
        const chalets = await findAllChalet();
        const reservations = await findAllReservation();

        res.render('dashboard', {
            title: 'Admin Dashboard',
            page: 'admin/indexAdmin',
            stats,
            chalets: chalets || [],
            reservations: reservations || []
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getAllUser = async (req, res) => {
    try {
        const users = await findAllUser();

        return res.render('dashboard', {
            title: 'Gestion Utilisateurs',
            page:'admin/userAdmin',
            users
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getAllChalet = async (req, res) => {
    try {
        const chalets = await findAllChalet();

        return res.render('dashboard', {
            title: 'Validation Chalets',
            page: 'admin/chaletAdmin',
            chalets
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getAllReservation = async (req, res) => {
    try {
        const reservations = await findAllReservation();

        return res.render('dashboard', {
            title: 'Réservations',
            page: 'admin/reservationAdmin',
            reservations
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    }
}

export const updateChaletStatus = async (req, res) => {
    try {
        const chaletId = req.params.id;
        const status = req.body.status;
        const change = await changeChaletStatus(chaletId, status);
        return res.redirect('/admin/chalet');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la mise à jour du statut');
    };
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const remove = await removeUser(userId);
        return res.redirect('/admin/user');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la suppression');
    }
};