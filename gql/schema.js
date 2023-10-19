const typeDefs = `#graphql

    # Types
    type User {
        id: ID
        name: String
        username: String
        email: String
        website: String
        description: String
        password: String
        avatar: String
        createdAt: String
    }

    type Token {
        token: String
    }

    type UpdateAvatar {
        status: Boolean
        url: String
    }

    type Publication {
        id: ID
        user: ID
        url: String
        createdAt: String
    }

    type Comment {
        user: User
        publication: ID
        comment: String
    }

    type FeedPublication {
        id: ID
        user: User
        url: String
        createdAt: String
    }


    # Inputs

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UpdateUserInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        website: String
        description: String
    }

    input CommentInput {
        publication: ID!
        comment: String!
    }

    # Queries

    type Query {
        # User
        getUser(id: ID, username: String): User
        search(search: String): [User]

        # Follow
        isFollow(username: String!): Boolean
        getFollowers(username: String!): [User]
        getFollowed(username: String!): [User]
        getNotFollowed: [User]

        # Publication
        getPublications(username: String!): [Publication]
        getPublicationsFollowed: [FeedPublication]

        # Comment
        getComments(idPublication: ID!): [Comment]

        # Like
        isLike(idPublication: ID!): Boolean
        countLikes(idPublication: ID!): Int
        
    }

    # Mutations

    type Mutation {
        # User
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(url: String): UpdateAvatar
        deleteAvatar: Boolean
        updateUser(input: UpdateUserInput): Boolean

        # Follow
        follow(username: String!): Boolean
        unFollow(username: String!): Boolean

        # Publication
        publish(url: String): Publication

        # Comment
        addComment(input: CommentInput): Comment

        # Like
        addLike(idPublication: ID!): Boolean
        deleteLike(idPublication: ID!): Boolean
    }

`

export default typeDefs;