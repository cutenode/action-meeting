const core = require('@actions/core')

function catchError (error) {
  process.exitCode = 1
  core.setFailed(error)
}

module.exports = catchError
