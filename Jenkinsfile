sourceBranch = env.gitlabBranch ?: env.gitlabSourceBranch

// set name of job
currentBuild.displayName = sourceBranch

node {
  gitlabCommitStatus {
    stage ('Checkout') {
      sh 'node --version'
      checkout scm
    }

    stage ('Install Package') {
      sh 'yarn install --no-lockfile'
    }
  }
}
