import  nodemailer from "nodemailer"
import { emailConfig} from '../../config/index.js';

console.log(emailConfig)


export const transporter = nodemailer.createTransport(emailConfig);

try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
} catch (error) {
     console.error("Verification failed", error);
}