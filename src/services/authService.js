import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new User({
        ...data,
        password: hashedPassword
    });

    return await newUser.save();
};

export const verificationLogin = async (data) => {
    const email = data.email;
    const password = data.password;
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Utilisateur introuvable.')
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare) {
        throw new Error('Identifiants incorrects.')
    }

    return user;
};
