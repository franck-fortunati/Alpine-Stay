import {
    createUser,
    verificationLogin,
} from '../services/authService.js';

export const getRegisterForm = (req, res) => {
    try {
        res.render('layout', {
            title: 'Inscription',
            page: 'pages/register'
        });
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Erreur serveur');
    };
};

export const getLoginForm = (req, res) => {
    try {
        res.render('layout', {
            title: 'Connexion',
            page: 'pages/login'
        });
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Erreur serveur');
    };
};

export const register = async (req, res) => {
    try {
        const data = req.body;
        const create = await createUser(data);
        return res.redirect('/login')
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Erreur serveur');
    };
};

export const login = async (req, res) => {
    try {
        const data = req.body;
        const user = await verificationLogin(data);

        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        
        return res.redirect('/');
    } catch (err) {
        console.error(err); 
        return res.status(400).send(err.message || 'Identifiants incorrects');
    };
};

export const logout = async (req, res) => {
    try {
        req.session.destroy()
        return res.redirect('/');
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Erreur serveur');
    };
};