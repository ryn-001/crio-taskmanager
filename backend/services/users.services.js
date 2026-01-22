const User = require("../models/tasks.model");

const createUser = async (userData) => {
    return await User.create(userData); 
}

const findUser = async (data) => {
    const user = await User.findOne({data});
    if(!user) throw new Error("No user found");
    return user;
}

const updateUser = async (id,data) => {
    const user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    }).select('-password');

    if (!user) throw new Error('User not found');
    return user;
}

const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return user;
};

module.exports = {createUser,findUser,updateUser,deleteUser};