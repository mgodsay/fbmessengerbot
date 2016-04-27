'use strict'
const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'CAAT6h9nizVIBAJ5o0GqEH52Wlwf8Anc8JJAzqmzJgH0ZAZAPZBTvCleKbGcrTR4fOlNRK12JiHHld2GjgT8seSkeXKveadeMEqHS6KcKYSfghHo2ux5h0doqc9WZA3WoeCgZA5QJCJWUZA8UIeh0nUpPKEOeyRXmndVm5MnmD8SqlI9YUwFlDjuEtK84fOFGSL76xI6MuhrAZDZD',
  verify: 'mobileFeatureQE'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
