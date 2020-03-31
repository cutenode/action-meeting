const core = require('@actions/core')

function catchError (error) {
  const stringifiedErrorBecauseActionsToolkitCurrentlyRequiresAStringForSomeReason = error.toString()
  process.exitCode = 1
  core.setFailed(stringifiedErrorBecauseActionsToolkitCurrentlyRequiresAStringForSomeReason)
}

module.exports = catchError
