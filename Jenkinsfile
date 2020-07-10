pipeline {
    agent {
        docker {
            image 'node:12-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Install') { 
            steps { sh 'npm install'}
        }

        stage('mufScript') { 
            steps { sh 'npm run mufScript'}
        }

        stage('Build') {
            steps { sh 'npm run build'}
        }

        stage('CDPArtifact') {
            steps { sh 'npm run createCodeDeployArtifact'}
        }
    }
}
