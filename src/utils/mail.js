import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme:"default",
        product : {
            name : "task manager",
            link : "https://taskmanagerlink.com",

        }
    });

    const emailTextual = mailGenerator.generatePlaintext(oprtions.mailgenContent);
    const emailHtml = mailGenerator.generate(oprtions.mailgenContent);


    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_HOST,
        port : process.env.MAIL_TRAP_PORT,
        auth:{
            user : process.env.MAILTRAP_SMTP_USER,
            pass : process.env.MAILTRAP_SMTP_PASS
        }
    });

    const mail = {
        from: "mail.taskmagaer@example.com",
        to : options.email,
        subject : options.subject,
        text : emailTextual,
        html : emailHtml
    };

    try{
        await transporter.sendMail(mail)
    }catch(error){
        console.error("Email Service failed silently, Make sure that you have provided your mailtrap credentials in the .env file"),
        console.error("Error: ",error)
    }

};

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We're excited to have you onboard.",

            action: {
                instructions: "To verify your email, please click on the following button:",

                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl,
                },
            },

            outro: "Need help? Just reply to this email.",
        },
    };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "we got a request to reset password of your account",

            action: {
                instructions: "to reset password click on the following button or link",

                button: {
                    color: "#22BC66",
                    text: "Reset Password",
                    link: passwordResetUrl,
                },
            },

            outro: "Need help? Just reply to this email.",
        },
    };
};

export {
    emailVerificationMailgenContent ,
    forgotPasswordMailgenContent,
    sendEmail
}