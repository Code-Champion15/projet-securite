const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Le serveur SMTP de Gmail
    port: 465,               // Port pour STARTTLS
    secure: true,           // false pour STARTTLS, true pour SSL (port 465)
    auth: {
        user: process.env.EMAIL_USER,  // Votre adresse email
        pass: process.env.EMAIL_PASS,  // Votre mot de passe d'application ou mot de passe Gmail
    },
});

module.exports.sendVerificationEmail = async (email, verificationLink) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vérification de votre compte',
            text: `Cliquez sur ce lien pour vérifier votre compte : ${verificationLink}`,
            html: `<p>Bienvenue ! Cliquez sur ce lien pour vérifier votre compte : <a href="${verificationLink}">${verificationLink}</a></p>`,
        });
        console.log(`Email envoyé à ${email}`);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        throw error;
    }
};
