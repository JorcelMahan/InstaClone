import Publication from "../models/Publication.js";
import User from "../models/User.js";
import Follow from "../models/Follow.js";

// TODO: Implement the uploadFile function
const publish = async (url, ctx) => {
    try {
        const publication = new Publication({
            url,
            user: ctx.user.id,
        });

        publication.save();
        return publication;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const getPublications = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Usuario no encontrado');

        const publications = await Publication.find({ user: user._id }).sort({ createdAt: -1 });

        return publications;
    } catch (error) {
        throw error;
    }
}

const getPublicationsFollowed = async (ctx) => {

    // throw and error in the ctx is empty
    if (!ctx.user) throw new Error('Usuario no autenticado');

    try {
        const followed = await Follow.find({ user: ctx.user.id }).populate('follow');
        const followedList = followed.map(follow => follow.follow);

        const publications = []

        for await (const followed of followedList) {
            const publication = await Publication.find({ user: followed._id }).sort({ createdAt: -1 }).populate('user');
            publications.push(...publication);
        }

        return publications.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    } catch (error) {
        throw error;
    }
}

// TODO: Implement the deletePublication function


export default {
    publish,
    getPublications,
    getPublicationsFollowed,
};
