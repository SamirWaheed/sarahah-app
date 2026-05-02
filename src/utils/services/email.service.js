import { transporter } from "../utils.index.js";
import { emailConfig } from "../../config/index.js";
import { EventEmitter } from "events";

const fromEmail =  emailConfig.auth.user;

export const sendEmail = async ({to,subject,html})=>{
    try {
        const info = await transporter.sendMail({
            from: `Saraha_App :: ${fromEmail}`,
            to,
            subject,
            html
        })
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
         console.error("Error while sending mail:", error);
    }
    
}

export const emailEvents = new EventEmitter();

emailEvents.on("sendEmail", async ({ to, subject, html }) => {
    try {
        await sendEmail({ to, subject, html })
    } catch (error) {
        emailEvents.emit("error", error) 
    }
})


emailEvents.on("error", (error) => {
    console.error("Email failed:", error)
})