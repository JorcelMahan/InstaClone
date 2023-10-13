import userController from '../controllers/user.js';
import publicationController from '../controllers/publication.js';
import commentController from '../controllers/comment.js';
import likeController from '../controllers/like.js';
import followController from '../controllers/follow.js';

const resolvers = {
    Query: {
        // User
        getUser: (_, { id, username }) => userController.getUser(id, username),
        search: (_, { search }) => userController.search(search),

        // Follow
        isFollow: (_, { username }, ctx) => followController.isFollow(username, ctx),
        getFollowers: (_, { username }) => followController.getFollowers(username),
        getFollowed: (_, { username }) => followController.getFollowed(username),
        getNotFollowed: (_, { }, ctx) => followController.getNotFollowed(ctx),

        // Publication
        getPublications: (_, { username }) => publicationController.getPublications(username),
        getPublicationsFollowed: (_, { }, ctx) => publicationController.getPublicationsFollowed(ctx),

        // Comment
        getComments: (_, { id }) => commentController.getComments(id),

        // Like
        isLike: (_, { publication }, ctx) => likeController.isLike(publication, ctx),
        countLikes: (_, { publication }) => likeController.countLikes(publication)
    },

    Mutation: {
        // User
        register: (_, { input }) => userController.register(input),
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
        deleteAvatar: (_, { }, ctx) => userController.deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

        // Follow
        follow: (_, { username }, ctx) => followController.follow(username, ctx),
        unFollow: (_, { username }, ctx) => followController.unFollow(username, ctx),

        // Publication
        publish: (_, { file }, ctx) => publicationController.publish(file, ctx),

        // Comment
        addComment: (_, { input }, ctx) => commentController.addComment(input, ctx),

        // Like
        addLike: (_, { publication }, ctx) => likeController.addLike(publication, ctx),
        deleteLike: (_, { publication }, ctx) => likeController.deleteLike(publication, ctx)
    }
};

export default resolvers;