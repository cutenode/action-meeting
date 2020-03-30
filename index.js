const core = require('@actions/core')
const github = require('@actions/github')
const replaceVariables = require('./lib/replaceVariables')
const stringifyMarkdownTemplate = require('./lib/stringifyMarkdownTemplate')

async function action () {
  // Starting off by pulling in all of our required inputs

  // - GitHub token used for interacting with the GitHub API. Generated by Actions if the user passes `${{ secrets.GITHUB_TOKEN }}`
  const token = core.getInput('github-token')

  // - The various data from user inputs that we're going to use
  const join = core.getInput('markdown-join-instructions')
  const template = core.getInput('markdown-minutes-base')
  const invites = core.getInput('invites')
  const observers = core.getInput('observers')

  // next, setting up Octokit via @actions/github
  const octokit = new github.GitHub(token)
  const context = github.context

  // // fetch the template and make it a string
  // const fetchedTemplate = await fs.readFile(template)
  // const stringifiedTemplate = await fetchedTemplate.toString('utf8')
  const stringifiedTemplate = await stringifyMarkdownTemplate(template)

  // now, create a meeting issue
  try {
    const templateVariables = {
      title: '{{{title}}}',
      githubIssue: '{{{github-issue}}}',
      minutesDocument: '{{{minutes-document}}}',
      agendaLabel: '{{{agenda-label}}}',
      invited: '{{{invited}}}',
      agenda: '{{{agenda}}}'
    }

    const templateValues = {
      title: 'My Issue',
      githubIssue: 'a link goes here, probably retuned from Octokit',
      minutesDocument: 'a link goes here, probably generated by google docs but I want to make it pluggable so people can swap them for something like CodiMD',
      agendaLabel: core.getInput('agenda-label'),
      invited: core.getInput('invites'),
      observers: core.getInput('observers'),
      agenda: 'the agenda generated from the passed label will be added here'
    }

    const bodyToReturn = await replaceVariables(stringifiedTemplate, templateVariables, templateValues)

    await octokit.issues.create({
      ...context.repo,
      title: 'My Meeting',
      body: bodyToReturn
    })
  } catch (error) {
    process.exitCode = 1
    core.setFailed(error)
  }
}

action()
