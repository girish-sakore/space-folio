pipeline {
    agent any

    environment {
        APP_PATH = "/home/girish/spacefolio/space-folio"
        SCANNER_HOME=tool 'sonar-scanner'
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

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('sonar-server') {
                        sh 'sonar-scanner \
                            -Dsonar.projectKey=Spacefolio \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=https://share.proximacloud.in'
                    }
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

        fixed {
            mail to: 'girish.sakore3@gmail.com',
                  subject: "SUCCESS: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]",
                  body: "Great news! The pipeline is back to normal. Check it out at: ${env.BUILD_URL}"
        }

        failure {
            mail to: 'girish.sakore3@gmail.com',
                 subject: "FAILED: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]",
                 body: "Attention! The deployment failed. \n\nCheck the console output here: ${env.BUILD_URL}console"
        }
        
        unstable {
            mail to: 'girish.sakore3@gmail.com',
                 subject: "UNSTABLE: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]",
                 body: "The build finished but some tests failed. Review logs: ${env.BUILD_URL}"
        }
    }
}