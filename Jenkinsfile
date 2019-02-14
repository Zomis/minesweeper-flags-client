#!/usr/bin/env groovy

@Library('ZomisJenkins')
import net.zomis.jenkins.Duga

pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker') {
            when {
                branch 'master'
            }
            steps {
                script {
                    // Stop running containers
                    sh 'docker ps -q --filter name="mfe_client" | xargs -r docker stop'

                    // Deploy client
                    sh 'rm -rf /home/zomis/jenkins/mfe/client'
                    sh 'cp -r $(pwd)/dist /home/zomis/jenkins/mfe/client'
                    sh 'docker run -d --rm --name mfe_client -v /home/zomis/jenkins/mfe/client:/usr/share/nginx/html:ro -p 64637:80 nginx'
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: '**/build/test-results/junit-platform/TEST-*.xml'
        }
        success {
            zpost(0)
        }
        unstable {
            zpost(1)
        }
        failure {
            zpost(2)
        }
    }
}
