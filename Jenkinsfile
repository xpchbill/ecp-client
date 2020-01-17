node {
  stage('Checkout') {
    sh 'node --version'
    checkout scm
  }

  stage('Build') {
    sh 'yarn build:docker'
  }

  stage('Tests') {
    sh 'docker-compose run -T client yarn test'
  }
}
