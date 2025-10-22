import nodemailer from 'nodemailer'

const mailSender = async (email, title, body) => {
     try {
          // creating transporter
          const transporter = nodemailer.createTransport({
               host: process.env.MAIL_HOST,
               auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
               },
          });

          // Sending mail to user
          const response = transporter.sendMail({
               from: 'Talksyy',
               to: email,
               subject: title,
               html: body
          });

          return response;
          
     } catch (error) {
          console.log("MailSender Error :: Error While Sending email ", error.message);
     }
}

export default mailSender;