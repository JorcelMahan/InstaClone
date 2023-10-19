import Like from '../models/Like.js';


const addLike = async (idPublication, ctx) => {
    try {
        const like = new Like({
            publication: idPublication,
            user: ctx.user.id
        });

        like.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteLike = async (idPublication, ctx) => {
    try {
        await Like.deleteOne({ publication: idPublication }).where('user').equals(ctx.user.id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const isLike = async (idPublication, ctx) => {
    try {
        const like = await Like.findOne({
            publication: idPublication
        }).where({
            user: ctx.user.id
        });

        if (!like) throw new Error('Like no encontrado');

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const countLikes = async (idPublication) => {
    try {
        const count = await Like.countDocuments({ publication: idPublication });
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