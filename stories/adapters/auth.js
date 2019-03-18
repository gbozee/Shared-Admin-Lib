import appFirebase from "./backupFirebase";

const authenticateUser = (keys, token) => {
    let firebaseFunc = appFirebase(keys);
    return firebaseFunc.getUserToken(token); // returns agent data
};

const loginUser = (keys, { email, password }) => {
    let firebaseFunc = appFirebase(keys);
    return firebaseFunc.loginUser(email, password);
};

export default {
    authenticateUser,
    loginUser
};
