let nodemailer = require("nodemailer")

exports.sendEmail = function (myCenters) {
  let message = createTemplate(myCenters)
  let options = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Vaccine Available",
    html: message,
  }
  nodemailerTransport.sendMail(options, (error, info) => {
    if (error) console.log(error)
  })
}

createTemplate = function (myCenters) {
  let message = "",
    centerDetails = "",
    sessionDetails = ""
  message = `Hi,<br/>
    Vaccine is available at <br/><br/>`
  for (const center of myCenters) {
    centerDetails = `${centerDetails} <strong> Center name: ${center.name} </strong> <br/> Pincode: ${center.pincode}<br/>`
    for (const session of center.sessions) {
      sessionDetails = `${sessionDetails}  Date: ${session.date} Available capacity: ${session.available_capacity}<br/>`
    }
    centerDetails = `${centerDetails} ${sessionDetails}<br/>`
  }
  message = `${message} ${centerDetails}`
  return message
}

let nodemailerTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})
