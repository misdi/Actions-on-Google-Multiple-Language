const {
    dialogflow,
  } = require('actions-on-google');

const functions = require('firebase-functions');

const i18n = require('i18n')
const moment = require('moment')

i18n.configure({
    locales:['een-US', 'id-ID'],
    directory: __dirname + '/locales',
    defaultLocale: 'en-US'
});



const app = dialogflow({
  debug: true,
});

app.middleware((conv) =>{
    i18n.setLocale(conv.user.locale)
    moment.locale(conv.user.locale)
})

app.intent('Default Welcome Intent', (conv) => {
    conv.ask(i18n.__('WELCOME_TEXT'))
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
