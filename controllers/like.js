import Like from '../models/Like.js';


const addLike = async (publication, ctx) => {
    try {
        const like = new Like({
            publication,
            user: ctx.user.id
        });

        like.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteLike = async (publication, ctx) => {
    try {
        await Like.deleteOne({ publication }).where('user').equals(ctx.user.id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const isLike = async (publication, ctx) => {
    try {
        const like = await Like.findOne({ publication }).where({
            user: ctx.user.id
        });

        if (!like) throw new Error('Like no encontrado');

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const countLikes = async (publication) => {
    try {
        const count = await Like.countDocuments({ publication });
        return count;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export default {
    addLike,
    deleteLike,
    isLike,
    countLikes
}