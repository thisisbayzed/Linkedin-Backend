import { createWelcomeEmailTemplate } from "../emails/emailTemplets";
import { mailtrapClient, sender } from "../services/mailtrap";
import { WelcomeEmailParams } from "../types/email";

export const sendWellcomeEmail = async({email , name , profileUrl}:WelcomeEmailParams):Promise<void> =>{

    const recipient = [{email}]

    try{

        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject: "Welcome to UnLinked",
			html: createWelcomeEmailTemplate(name, profileUrl),
			category: "welcome",
        })

        console.log("wellcome email sent successfully" , response)

    }catch(error){
        throw error
    }

}