import mongoose from "mongoose";

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion réussie à MongoDB !");
    } catch (err) {
        console.error("Erreur de connexion MongoDB", err.message);
        process.exit(1);
    };
};

export default db;