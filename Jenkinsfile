pipeline {
    agent any

    environment {
        APP_PATH = "/home/girish/spacefolio/space-folio"
    }

    stages {
        stage('Update Code') {
            steps {
                dir("${env.APP_PATH}") {
                    echo 'Fetching latest code...'
                    sh 'git pull origin main'
                }
            }
        }

        stage('Build & Deploy') {
            steps {
                dir("${env.APP_PATH}") {
                    echo 'Rebuilding and Restarting Containers...'
                    sh 'docker compose up -d --build --remove-orphans'
                }
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }
    post {
        always {
            sh 'docker image prune -f'
        }
    }
}