import {compare, hash} from 'bcrypt'

const hashPassword = async (password)=>{
    console.log(password)
    const hashedPassword = await hash(password,12)
    return hashedPassword
}


const isPasswordValid = async (password, hashedPassword)=>{
    const isValid = await compare(password, hashedPassword);
    return isValid;
}
module.exports = {
    hashPassword,
    isPasswordValid
}