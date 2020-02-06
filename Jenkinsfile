node {
  stage('Checkout') {
    sh 'node --version'
    checkout scm
  }

  stage('Build') {
    sh 'docker -v'
    sh 'cp ./deploy/.env_prod .env && cp ./.env ./packages/ecp-app/.env && docker-compose build'
  }

  stage('Tests') {
    sh 'docker-compose run -T client yarn test'
  }

  stage('Deploy') {
    sh 'docker-compose up -d'
  }
}
