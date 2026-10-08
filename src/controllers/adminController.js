import {
    getAdminStats,
    findAllUser,
    findAllChalet,
    changeChaletStatus,
    removeUser
} from '../services/adminService.js';

export const getDashboard = async (req, res) => {
    try {
        const stats = await getAdminStats();

        res.render('dashboard', {
            title: 'Admin Dashboard',
            page: 'admin/indexAdmin',
            stats
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getAllUser = async (req, res) => {
    try {
        const user = await findAllUser();

        return res.render('dashboard', {
            title: 'Gestion Utilisateurs',
            page:'admin/userAdmin',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

export const getAllChalet = async (req, res) => {
    try {
        const chalet = await findAllChalet();

        return res.render('dashboard', {
            title: 'Validation Chalets',
            page: 'admin/chaletAdmin',
            chalet
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
    };
};

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