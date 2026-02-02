pipeline {
    agent none

    environment {
        IMAGE_NAME = "girishsakore3/spacefolio:${BUILD_NUMBER}"
    }

    stages {

        // stage('SonarQube Analysis') {
        //     agent { label 'proxima' }

        //     steps {
        //         checkout scm

        //         script {
        //             def scannerHome = tool 'SonarScanner'
        //             withSonarQubeEnv('sonar-server') {
        //                 sh "${scannerHome}/bin/sonar-scanner"
        //             }
        //         }
        //     }
        // }

        stage('Build & Push Image') {
            agent { label 'wsl-saber' }

            checkout scm
            steps {

                // withCredentials([usernamePassword(
                //     credentialsId: 'dockerhub-creds',
                //     usernameVariable: 'DH_USER',
                //     passwordVariable: 'DH_PASS'
                // )]) {

                    sh '''
                    echo "Logging into Docker Hub..."
                    echo $DH_PASS | docker login -u $DH_USER --password-stdin

                    echo "Building image..."
                    docker build -t $IMAGE_NAME .

                    echo "Pushing image..."
                    docker push $IMAGE_NAME
                    '''
                // }
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

    // post {
    //     always {
    //         agent { label 'proxima' }
    //         script {
    //             if (isUnix()) {
    //                 sh 'docker image prune -f'
    //             } else {
    //                 bat 'docker image prune -f'
    //             }
    //         }
    //     }
    // }
}
