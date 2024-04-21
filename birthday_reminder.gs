const MY_EMAIL = "" // paste your email here
const MY_TIMEZONE = "GMT+2" // update the timezone
const DATE_FORMAT = "dd.MM.yyyy"

function main() {
  Logger.log(`Start script`)
  sendMeEmailAboutBirthdays()
  Logger.log(`Finish script`)
}

function sendMeEmailAboutBirthdays() {
  var EMAIL_TITLE = `Birthday reminder`
  var emailContent = ``
  var birthdayCalendar = getBirthdayCalendar()
  var peopleWithBirthdaysToday = getListOfPeopleWithBirthdays(birthdayCalendar, new Date())
  var peopleWithBirthdaysTomorrow = getListOfPeopleWithBirthdays(birthdayCalendar, getTomorrowDate())
  if (peopleWithBirthdaysToday.length != 0) {
    emailContent += `Birthdays today: ${peopleWithBirthdaysToday}\n\n`
  }
  if (peopleWithBirthdaysTomorrow.length != 0) {
    emailContent += `Birthdays tomorrow: ${peopleWithBirthdaysTomorrow}\n\n`
  }
  if (emailContent == ``) {
    Logger.log(`No birthdays today or tomorrow. Skip email sendout.`)
    return
  }
  emailContent += `Don't forget to wish them a happy birthday! :)`
  Logger.log(`Send email to ${MY_EMAIL} with title: ${EMAIL_TITLE}`)
  MailApp.sendEmail(MY_EMAIL, EMAIL_TITLE, emailContent)
}

function getTomorrowDate() {
  const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var tomorrow = new Date(new Date().getTime() + MILLIS_PER_DAY);
  Logger.log(`Tomorrow date: ${tomorrow}`)
  return tomorrow
}

function getListOfPeopleWithBirthdays(birthdayCalendar, date) {
  Logger.log(`Get list of people with birthday on ${Utilities.formatDate(date, MY_TIMEZONE, DATE_FORMAT)}`)
  var people = []
  // const MILLIS_IN_30_DAYS = 1000 * 60 * 60 * 24 * 30;
  // Logger.log(`Log events for the upcoming month`)
  // var dateIn30Days = new Date(new Date().getTime() + MILLIS_IN_30_DAYS)
  // Logger.log(`Date in 30 days: ${dateIn30Days}`)
  // var eventsFor30Days = birthdayCalendar.getEvents(new Date(), dateIn30Days)
  // eventsFor30Days.forEach(function(event) {
  //   Logger.log(`Event title: ${event.getTitle()}`)
  // })
  var events = birthdayCalendar.getEventsForDay(date)
  events.forEach(function(event) {
    Logger.log(`Event ID: ${event.getId()}`)
    Logger.log(`Event title: ${event.getTitle()}`)
    var BIRTHDAY_EVENT_TITLE_REGEX = /(.+)'s birthday/g;
    person = BIRTHDAY_EVENT_TITLE_REGEX.exec(event.getTitle())[1]
    Logger.log(`Person: ${person}`)
    people.push(person)
  })
  Logger.log(`List of people with birthdays on ${Utilities.formatDate(date, MY_TIMEZONE, DATE_FORMAT)}: ${people}`)
  return people
}

function getBirthdayCalendar() {
  // var allCalendarsList = CalendarApp.getAllCalendars()
  // Logger.log(`Log all calendar names`)
  // allCalendarsList.forEach(function(event) {
  //   Logger.log(`Calendar name: ${event.getName()}`)
  // })
  var birthdayCalendar = CalendarApp.getCalendarsByName(`Birthdays`)[0]
  Logger.log(`Birthday calendar ID: ${birthdayCalendar.getId()}`)
  Logger.log(`Birthday calendar name: ${birthdayCalendar.getName()}`)
  return birthdayCalendar
}