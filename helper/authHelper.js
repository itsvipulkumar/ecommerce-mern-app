const bcrypt = require('bcrypt')
// import e from 'express';
const hashPassord = async (password) => {
    try {
        const rounds = 10;
        const hasedPassword = await bcrypt.hash(password, rounds);
        return hasedPassword;
    } catch (e) {
        console.log(e)
    }
};
const comparePassword = async (password, hasedPassword) => {
    try {
        const comparePassword = await bcrypt.compare(password, hasedPassword)
        return comparePassword;
    } catch (error) {
        console.log(error)
    }
}

// module.exports = hashPassord
// module.exports = comparePassword

module.exports = { hashPassord, comparePassword }