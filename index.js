require('dotenv').config()
var CronJob = require('cron').CronJob;
var kue = require('kue'),
  queue = kue.createQueue();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: process.env.APA,
    pass: process.env.KABAR
  }
});


new CronJob('0 02 12 6 5 2', function() {
  queueEmail('priambodo@gmail.com')
  queueEmail('sidik.riders@gmail.com')
  queueEmail('sidik.hidayatullah@gmail.com')

}, null, true, 'Asia/Jakarta');


function queueEmail(receiver) {
  var job = queue.create('email', {
    from: '"Sidik 🇮🇩" <sidik.id@riders.com>',
    to: receiver,
    subject: 'Hello	🏁',
    text: 'Perkenalan',
    html: '<h1>Perkenalkan</h1><p>saya sidik.id 🐈</p>'
  }).save(function(err) {
    if (!err) console.log(job.id);
  });

  queue.process('email', function(job, done) {
    transporter.sendMail(job.data, (error, info) => {
    if (error) {
        return console.log(error);
    } else {
      return console.log('sukses coi');
    }
    done()
  });
})
}
