require("dotenv").config()
const axios = require("axios")
const moment = require("moment")
const notifier = require("./notifier")

const BASE_URL = "https://cdn-api.co-vin.in/api"
const DISTRICT_ID = process.env.DISTRICT_ID
const DATE = process.env.DATE || moment().format("DD-MM-YYYY")

async function main() {
  try {
    await checkAvailability()
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function checkAvailability() {
  let config = {
    method: "get",
    headers: {
      accept: "application/json",
      "Accept-Language": "hi_IN",
    },
    url:
      BASE_URL +
      "/v2/appointment/sessions/public/calendarByDistrict?district_id=" +
      DISTRICT_ID +
      "&date=" +
      DATE,
  }

  axios(config).then(function (response) {
    let centers = response.data.centers
    let myCenters = centers.filter(
      (center) =>
        center.sessions.filter(
          (session) =>
            session.min_age_limit == process.env.MIN_AGE &&
            session.available_capacity > 0
        ).length != 0
    )
    if (myCenters.length) {
      notifier.sendEmail(myCenters)
    }
  })
}

main()
