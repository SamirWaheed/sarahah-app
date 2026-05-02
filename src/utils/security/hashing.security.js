import argon2, { argon2id } from 'argon2'

export const hashingPassword = async (passText)=>{

   return  await argon2.hash(passText,{
        type: argon2id,
        memoryCost:64,
        timeCost:3,
        parallelism: 4,

    })
    

}

export const verifyPassword = async (hashPassword,plainText)=>{

    return await argon2.verify(hashPassword,plainText)
}