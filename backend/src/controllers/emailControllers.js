require("dotenv").config();
const nodemailer = require("nodemailer");

const {
  SMTP_SENDIN,
  SMTP_PORT_SENDIN,
  SMTP_SENDIN_USER,
  SMTP_SENDIN_PASSWORD,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_SENDIN,
  port: SMTP_PORT_SENDIN,
  secure: false,
  auth: {
    user: SMTP_SENDIN_USER,
    pass: SMTP_SENDIN_PASSWORD,
  },
});

const verifyAdEmail = (req, res) => {
  const { email, firstname, id } = req.body;

  const options = {
    from: SMTP_SENDIN_USER,
    to: email,
    subject: "Votre annonce sur TrocMania",
    html: `<h2 style="font-size: 32px">Bonjour ${firstname}</h2>
      <p>Nous vous remercions d'avoir utilisé notre plateforme pour la vente de votre bien.</p>
      <p>Votre annonce est soumise au contrôle de nos équipes et sera publiée dès validation.</p>
      <p>Vous serez informé(e) de la suite donnée à votre demande de publication.</p>
      <p>Soyez assuré(e) que nous faisons au mieux pour valider votre demande rapidement.</p>
      <p>Et continuez à troquer la vie !</p>
      <h2>L'équipe de TrocMania</h2>`,
  };

  transporter
    .sendMail(options)
    .then(() => {
      res.status(201).json(id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifiedAdEmail = (req, res) => {
  const { email, firstname } = req.body;

  const options = {
    from: SMTP_SENDIN_USER,
    to: email,
    subject: "Votre annonce sur TrocMania",
    html: `<h2 style="font-size: 32px">Bonjour ${firstname}</h2>
    <p>Félicitations, votre annonce a été validée et est en ligne !</p>
    <p>A bientôt pour vos futurs trocs !</p>
    <h2>L'équipe de TrocMania</h2>`,
  };

  transporter
    .sendMail(options)
    .then(() => {
      res.status(201).send("Email sent with success!!!");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const notVerifiedAdEmail = (req, res) => {
  const { email, firstname } = req.body;

  const options = {
    from: SMTP_SENDIN_USER,
    to: email,
    subject: "Votre annonce sur TrocMania",
    html: `<h2 style="font-size: 32px">Bonjour ${firstname}</h2>
    <p>Nous avons le regret de vous informer que votre annonce ne peut être validée par nos équipes.</p>
    <p>Nous vous invitons à prendre connaissance de nos règles de publication afin que votre prochaine annnonce soit conforme aux standards attendus par notre plateforme.</p>
    <p>Troquement vôtre !</p>
    <h2>L'équipe de TrocMania</h2>`,
  };

  transporter
    .sendMail(options)
    .then(() => {
      res.status(201).send("Email sent with success!!!");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  verifyAdEmail,
  verifiedAdEmail,
  notVerifiedAdEmail,
};
