pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Install') { 
            steps { sh 'npm run installSkip'}
        }

        stage('mufScript') { 
            steps { sh 'npm run mufScript'}
        }

        stage('Build') { 
            steps { sh 'npm run builldSkip'}
        }
        
    }
}
