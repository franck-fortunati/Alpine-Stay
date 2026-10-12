import User from '../models/userModel.js';
import Chalet from '../models/chaletModel.js';
import Reservation from '../models/reservationModel.js';

export const getAdminStats = async () => {
    const [totalUser, totalReservation, totalChalet, pendingChalet] = await Promise.all([
        User.countDocuments(),
        Reservation.countDocuments({status: 'Confirmée'}),
        Chalet.countDocuments({status: 'Validé'}),
        Chalet.countDocuments({ status: 'En attente' })
    ]);

    return { totalUser, totalReservation, totalChalet, pendingChalet};
};

export const findAllUser = async () => {
    return await User.find().select('-password').sort({ createdAt: -1 });
};

export const findAllChalet = async () => {
    return await Chalet.find()
        .populate('station')
        .populate('owner', 'name email')
        .sort({ createdAt: -1 });
};

export const findAllReservation = async () => {
    return await Reservation.find().populate('status', 'confirmée');
};

export const changeChaletStatus = async (chaletId, status) => {
    return await Chalet.findByIdAndUpdate(
        chaletId,
        { status },
        { new: true }
    );
};

export const removeUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};