async function addUser(params) {
    const {
        auth,
        email,
        password,
        displayName
    } = params;

    const user = await auth.createUser({
        email,
        password,
        displayName
    });

    return user;
}

async function getUser(params) {
    const {auth, email} = params;

    const user = await auth.getUserByEmail(email);

    return user;
}
//funcion para actualizar
async function updateUser(params) {
    const { 
         auth,
         email, 
         displayName, 
         password } = params;

    const user = await auth.getUserByEmail(email);
    const uid = user.uid;

    if (displayName) {
        await auth.updateUser(uid, 
            { displayName });
    }

    if (password) {
        await auth.updateUser(uid, 
            { password });
    }
    return user;
}

module.exports = {
    addUser,
    getUser,
    updateUser
}