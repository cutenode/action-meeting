const core = require('@actions/core')

function catchError (error) {
  const stringifiedErrorBecauseGitHubActionsSDKCurrentlyRequiresAStringForSomeReason = error.toString()
  process.exitCode = 1
  core.setFailed(stringifiedErrorBecauseGitHubActionsSDKCurrentlyRequiresAStringForSomeReason)
}

module.exports = catchError
