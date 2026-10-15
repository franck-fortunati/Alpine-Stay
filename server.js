import express from "express";
import dotenv from "dotenv";
import path from "path";
import db from "./src/config/db.js";
import { fileURLToPath } from 'url';
import session from "express-session";
import chaletRoutes from "./src/routes/chaletRoutes.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import Chalet from "./src/models/chaletModel.js";

dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get('/', async (req, res) => {
    try {
        const chalets = await Chalet.find({ status: 'Validé' }).sort({ createdAt: -1 }).limit(3);
        const today = new Date().toISOString().split('T')[0];
        res.render('layout', {
            title: 'Accueil',
            page: 'pages/index',
            chalets,
            today
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des chalets :", err);
        res.render('layout', {
            title: 'Accueil',
            page: 'pages/index',
            chalets: []
        });
    }
});

app.use("/chalet", chaletRoutes);
app.use("/reservation", reservationRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`serveur démarré sur http://localhost:${PORT}`);
});
