const core = require('@actions/core')
const github = require('@actions/github')
const replaceVariables = require('./lib/replaceVariables')
const stringifyMarkdownTemplate = require('./lib/stringifyMarkdownTemplate')
const catchError = require('./lib/catchError')

async function action () {
  // Starting off by pulling in all of our required inputs

  // - GitHub token used for interacting with the GitHub API. Generated by Actions if the user passes `${{ secrets.GITHUB_TOKEN }}`
  const token = core.getInput('github-token')

  // - The various data from user inputs that we're going to use
  const join = core.getInput('markdown-join-instructions')
  const base = core.getInput('markdown-minutes-base')
  const agendaLabel = core.getInput('agenda-label')
  const meetingLabel = core.getInput('meeting-label')
  const invites = core.getInput('invites')
  const observers = core.getInput('observers')
  const org = core.getInput('organization')

  // next, setting up Octokit via @actions/github
  const octokit = new github.GitHub(token)
  const context = github.context

  // fetch the template and make it a string
  // const fetchedTemplate = await fs.readFile(template)
  // const stringifiedTemplate = await fetchedTemplate.toString('utf8')
  const stringifiedTemplate = await stringifyMarkdownTemplate(base)
  const stringifiedJoin = await stringifyMarkdownTemplate(join)

  // build the agenda from the information passed to us
  const agenda = await buildAgenda(org, meetingLabel, token)

  // now, create a meeting issue
  try {
    const templateVariables = {
      title: '{{{title}}}',
      join: '{{{join}}}',
      githubIssue: '{{{github-issue}}}',
      minutesDocument: '{{{minutes-document}}}',
      agendaLabel: '{{{agenda-label}}}',
      meetingLabel: '{{{meeting-label}}}',
      invited: '{{{invited}}}',
      agenda: '{{{agenda}}}',
      org: '{{{org}}}'
    }

    const templateValues = {
      title: 'My Issue',
      join: stringifiedJoin,
      githubIssue: 'a link goes here, probably retuned from Octokit',
      minutesDocument: 'a link goes here, probably generated by google docs but I want to make it pluggable so people can swap them for something like CodiMD',
      agendaLabel: agendaLabel,
      meetingLabel: meetingLabel,
      invited: invites,
      observers: observers,
      agenda: agenda,
      org: org
    }

    const bodyToReturn = await replaceVariables(stringifiedTemplate, templateVariables, templateValues)

    await octokit.issues.create({
      ...context.repo,
      title: 'My Meeting',
      body: bodyToReturn,
      labels: ['meeting']
    })
  } catch (error) {
    catchError(error)
  }
}

action()

async function buildAgenda (organization, labelToSearchFor, token) {
  // next, setting up Octokit via @actions/github
  const octokit = new github.GitHub(token)

  const labeledIssuesAndPullRequests = await octokit.search.issuesAndPullRequests({
    q: `org:${organization} label:"${labelToSearchFor}"`
  })

  return labeledIssuesAndPullRequests
}
