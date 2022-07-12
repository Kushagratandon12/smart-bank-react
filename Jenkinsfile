pipeline{

    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('dockerhub-cred-kushagra')
    }
    
    tools {nodejs 'node'}

    stages {
        
        stage('NodeJs') {
            
            steps{
                sh 'npm install'
            }
        }

        stage('GitClone') {

            steps {
                git 'https://github.com/Kushagratandon12/smart-bank-react'
            }
        }
        
        stage('Docker Create') {
            steps {
                sh 'docker build -t kushagratandon12/sba_frontend:$BUILD_NUMBER --network host .'
            }
        }

        stage('Docker Login') {

            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push') {

            steps {
                sh 'docker push kushagratandon12/sba_frontend:$BUILD_NUMBER'
                emailext attachLog: true, body: 'Build Logs', recipientProviders: [buildUser()], subject: 'Build Details', to: 'kushtan1249@gmail.com'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }

}