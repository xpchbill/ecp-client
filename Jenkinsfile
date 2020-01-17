node {
  stage('Checkout') {
    sh 'node --version'
    checkout scm
  }

  stage('Build') {
    sh 'docker -v'
    sh 'cp ./deploy/.env_dev .env && docker-compose build'
  }

  stage('Tests') {
    sh 'docker-compose run -T client yarn test'
  }

  stage('Deploy') {
    sh 'cp ./deploy/.env_dev .env && docker-compose up -d'
  }
}
