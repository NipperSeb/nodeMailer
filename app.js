//independancie
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body parser middleware;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());


//Routes
app.get('/', (req, res) => {
  res.render('contact', { layout: false });
});


app.post('/sendEmail', function (req, res) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sebpincemoi@gmail.com',
      pass: 'xxxxxxxxxxxxxxx'//use your password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let textBody = `FROM: ${req.body.name} EMAIL: ${req.body.email}
   MESSAGE: ${req.body.message}`;

  let htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${req.body.name}
   <a href="mailto:${req.body.email}">${req.body.email}</a></p>
   <p>${req.body.phone}</p>
   <p>${req.body.message}</p>`;

  let mailOptions = {
    from: 'Fred Foo <sebpincemoi@gmail.com>', //receiver address
    to: 'sebpincemoi@gmail.com', // sender
    subject: "Mail From Contact Form", // Subject line
    text: textBody, // plain text body
    html: htmlBody
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('contact', { layout: false, msg: 'Email has been sent' });
  });
});


app.listen(3000, () => console.log('Server started...'));