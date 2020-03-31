const catchError = require('../lib/catchError')

async function replaceVariables (stringifiedTemplate, templateVariables, templateValues) {
  // replace each template variable with the relevant variable

  try {
    // - replace title
    if (stringifiedTemplate.includes(templateVariables.title)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.title, templateValues.title)
    }

    // - replace github issue
    if (stringifiedTemplate.includes(templateVariables.join)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.join, templateValues.join)
    }

    // - replace github issue
    if (stringifiedTemplate.includes(templateVariables.githubIssue)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.githubIssue, templateValues.githubIssue)
    }

    // - replace minutes document
    if (stringifiedTemplate.includes(templateVariables.minutesDocument)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.minutesDocument, templateValues.minutesDocument)
    }

    // - replace agenda label
    if (stringifiedTemplate.includes(templateVariables.agendaLabel)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.agendaLabel, templateValues.agendaLabel)
    }

    // - replace meeting label
    // if (stringifiedTemplate.includes(templateVariables.meetingLabel)) {
    //   stringifiedTemplate = stringifiedTemplate.replace(templateVariables.meetingLabel, templateValues.meetingLabel)
    // }

    // - replace invited
    if (stringifiedTemplate.includes(templateVariables.invited)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.invited, templateValues.invited)
    }

    // - replace observers
    if (stringifiedTemplate.includes(templateVariables.observers)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.observers, templateValues.observers)
    }

    // - replace agenda
    if (stringifiedTemplate.includes(templateVariables.agenda)) {
      stringifiedTemplate = stringifiedTemplate.replace(templateVariables.agenda, templateValues.agenda)
    }

    return stringifiedTemplate
  } catch (error) {
    catchError(error)
  }
}

module.exports = replaceVariables
