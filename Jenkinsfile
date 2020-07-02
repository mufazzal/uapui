pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Install') { 
            steps { sh 'npm installSkip'}
        }

        stage('mufScript') { 
            steps { sh 'npm mufScript'}
        }

        stage('Build') { 
            steps { sh 'npm builldSkip'}
        }
        
    }
}
