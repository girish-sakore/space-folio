pipeline {
    agent none

    environment {
        IMAGE_NAME = "ghcr.io/girishsakore/spacefolio:${BUILD_NUMBER}"
    }

    stages {

        stage('SonarQube Analysis') {
            agent { label 'proxima' }

            steps {
                checkout scm

                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('sonar-server') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Build & Push Image') {
            agent { label 'docker' }

            steps {
                checkout scm

                withCredentials([usernamePassword(
                    credentialsId: 'github-token',
                    usernameVariable: 'GH_USER',
                    passwordVariable: 'GH_TOKEN'
                )]) {

                    script {
                        if (isUnix()) {
                            sh '''
                            echo $GH_TOKEN | docker login ghcr.io -u $GH_USER --password-stdin
                            docker build -t $IMAGE_NAME .
                            docker push $IMAGE_NAME
                            '''
                        } else {
                            bat '''
                            echo %GH_TOKEN% | docker login ghcr.io -u %GH_USER% --password-stdin
                            docker build -t %IMAGE_NAME% .
                            docker push %IMAGE_NAME%
                            '''
                        }
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
            script {
                if (isUnix()) {
                    sh 'docker image prune -f'
                } else {
                    bat 'docker image prune -f'
                }
            }
        }
    }
}
