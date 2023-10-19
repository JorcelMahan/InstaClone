import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


const createToken = (user, SECRET_KEY, expiresIn) => {
    const { id, name, email, username } = user;
    const payload = {
        id,
        name,
        email,
        username
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

const register = async (input) => {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email, username, password } = newUser;

    const foundEmail = await User.findOne({ email });
    if (foundEmail) throw new Error("El usuario o email ya está en uso");


    const foundUsername = await User.findOne({ username });
    if (foundUsername) throw new Error("El usuario o email ya está en uso");


    const salt = await bcryptjs.genSaltSync(10);
    newUser.password = await bcryptjs.hash(password, salt);

    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

const login = async input => {
    const { email, password } = input;

    const userFound = await User.findOne({ email: email.toLowerCase() });
    if (!userFound) throw new Error("Error en el email o contraseña");

    const passwordSuccess = await bcryptjs.compare(password, userFound.password);
    if (!passwordSuccess) throw new Error("Error en el email o contraseña");

    return {
        token: createToken(userFound, process.env.SECRET_WORD, "24h")
    }
}

const getUser = async (id, username) => {


    if (id) return await User.findById(id);
    if (username) return await User.findOne({ username });

    throw new Error("No se ha encontrado el usuario");

}


const updateAvatar = async (url, ctx) => {
    const { id } = ctx.user;
    try {
        await User.findByIdAndUpdate(id, { avatar: url });
        return {
            status: true,
            url
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            url: null
        }
    }
}

const deleteAvatar = async ctx => {
    try {
        await User.findByIdAndUpdate(ctx.user.id, { avatar: "" });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateUser = async (input, ctx) => {
    const { id } = ctx.user;
    try {
        if (input.currentPassword && input.newPassword) {
            const userFound = await User.findById(id);
            const passwordSuccess = await bcryptjs.compare(input.currentPassword, userFound.password);
            if (!passwordSuccess) throw new Error("Contraseña incorrecta");

            const salt = await bcryptjs.genSaltSync(10);
            const newPasswordCrypt = await bcryptjs.hash(input.newPassword, salt);
            await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
        } else {
            await User.findByIdAndUpdate(id, input);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const search = async (search) => {
    const users = await User.find({
        name: { $regex: search, $options: "i" }
    });
    return users;
}

export default {
    register,
    login,
    getUser,
    updateAvatar,
    deleteAvatar,
    updateUser,
    search
}