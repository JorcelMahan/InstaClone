import Follow from '../models/Follow.js';
import User from '../models/User.js';


const follow = async (username, ctx) => {

    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error('Usuario no encontrado');

    try {
        const follow = new Follow({
            user: ctx.user.id,
            follow: userFound._id
        });

        follow.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}


const isFollow = async (username, ctx) => {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error('Usuario no encontrado');

    const follow = await Follow.find({ user: ctx.user.id }).where('follow').equals(userFound._id);


    return follow.length > 0
}


const unFollow = async (username, ctx) => {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error('Usuario no encontrado');

    const follow = await Follow.deleteOne({ user: ctx.user.id }).where('follow').equals(userFound._id);

    return follow.deletedCount > 0
}


const getFollowers = async username => {

    try {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Usuario no encontrado');

        const followers = await Follow.find({ follow: user._id }).populate('user');

        return followers.map(follow => follow.user);

    } catch (error) {
        throw error;
    }

}

const getFollowed = async username => {
    try {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Usuario no encontrado');

        const followed = await Follow.find({ user: user._id }).populate('follow');

        return followed.map(follow => follow.follow);
    } catch (error) {
        throw error;
    }
}

const getNotFollowed = async ctx => {
    const users = await User.find().limit(50);

    const arrayUsers = [];

    for await (const user of users) {
        const isFind = await Follow.findOne({ user: ctx.user.id }).where('follow').equals(user._id);
        if (!isFind) {
            if (user._id.toString() !== ctx.user.id.toString()) {
                arrayUsers.push(user);
            }
        }
    }

    return arrayUsers;
}

export default {
    follow,
    isFollow,
    unFollow,
    getFollowers,
    getFollowed,
    getNotFollowed
}