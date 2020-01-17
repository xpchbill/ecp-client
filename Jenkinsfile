node {
  stage('Checkout') {
    sh 'node --version'
    checkout scm
  }

  stage('Build') {
    steps {
        sh 'yarn build:docker'
    }
  }

  stage('Tests') {
    steps {
        sh 'docker-compose run -T client yarn test'
    }
  }
}
