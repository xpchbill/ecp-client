node {
  stage('Checkout') {
    sh 'node --version'
    checkout scm
  }

  stage('Install Package') {
    sh 'yarn install --no-lockfile'
  }
}
