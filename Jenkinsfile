node {
  stage('Checkout') {
    sh 'node --version'
    checkout scm
  }

  stage('Build') {
    sh 'docker -v'
    sh 'cp ./deploy/.env_prod .env && docker-compose build'
  }

  stage('Tests') {
    sh 'docker-compose run -T client yarn test'
  }

  stage('Deploy') {
    sh 'docker-compose up -d'
  }
}
