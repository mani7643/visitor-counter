// Jenkinsfile (Super simple now)
pipeline {
    agent any

    environment {
        IMAGE_NAME = "ghcr.io/mani7643/visitor-counter"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        RENDER_DEPLOY_HOOK = "https://api.render.com/deploy/srv-d4k4fdvdiees73b9if2g?key=9RGpkx1Q2_o"  // Get from Render
    }

    stages {
        stage('Build & Push Docker') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                sh 'docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest'
                
                withCredentials([string(credentialsId: 'github-pat', variable: 'GITHUB_TOKEN')]) {
                    sh 'echo $GITHUB_TOKEN | docker login ghcr.io -u $GIT_USER_NAME --password-stdin'
                    sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'curl -X POST "$RENDER_DEPLOY_HOOK"'
                echo "Deployed to Render! Check in 60 seconds"
            }
        }
    }
}