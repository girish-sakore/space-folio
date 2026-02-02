pipeline {
    agent none

    environment {
        APP_PATH = "/home/girish/spacefolio/space-folio"
        IMAGE_NAME = "ghcr.io/girishsakore/spacefolio:latest"
    }

    stages {

        stage('Update Code') {
            agent { label 'proxima' }

            steps {
                dir("${env.APP_PATH}") {
                    echo 'Fetching latest code...'
                    sh 'git pull origin main'
                }
            }
        }

        stage('SonarQube Analysis') {
            agent { label 'proxima' }

            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('sonar-server') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Build & Push Image') {
            agent { label 'windows-pc' }

            steps {
                dir("${env.APP_PATH}") {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-token',
                        usernameVariable: 'GH_USER',
                        passwordVariable: 'GH_TOKEN'
                    )]) {

                        sh '''
                        echo $GH_TOKEN | docker login ghcr.io -u $GH_USER --password-stdin
                        docker build -t $IMAGE_NAME .
                        docker push $IMAGE_NAME
                        '''
                    }
                }
            }
        }

        stage('Deploy on Server') {
            agent { label 'proxima' }

            steps {
                sh '''
                docker pull $IMAGE_NAME
                docker compose up -d --remove-orphans
                '''
            }
        }

        stage('Verify') {
            agent { label 'proxima' }
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