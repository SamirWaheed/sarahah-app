import crypto from "crypto"
import { encryption } from "../config/env.config.js"


const encryptionKey = Buffer.from(encryption.ENCRYPTION_KEY,"hex")



export function encrypt(plainText) {

  const iv = crypto.randomBytes(Number(encryption.IV_LENGTH));


  const cipher = crypto.createCipheriv("aes-256-cbc",encryptionKey,iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final()
  ]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(text){

    const [ivBuffer,encryptText] = text.split(':');

    const iv = Buffer.from(ivBuffer,"hex")
    const decipher = crypto.createDecipheriv("aes-256-cbc",encryptionKey,iv);


    let decrypted = decipher.update(encryptText,"hex","utf-8");
    decrypted+= decipher.final("utf-8")
    return decrypted
}


