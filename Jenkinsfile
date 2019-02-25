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
        stage('Environment Vars') {
            steps {
                script {
                    sh 'rm -f .env.local'
                    def timestamp = new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('UTC'))
                    sh "echo 'VUE_APP_BUILD_TIME=$timestamp' >> .env.local"
                    sh "echo 'VUE_APP_BUILD_NUMBER=$env.BUILD_NUMBER' >> .env.local"
                    sh "echo 'VUE_APP_GIT_COMMIT=$env.GIT_COMMIT' >> .env.local"
                    sh "echo 'VUE_APP_GIT_BRANCH=$env.GIT_BRANCH' >> .env.local"
                    sh 'cat .env.local'
                }
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
                    sh "rm -rf /home/zomis/jenkins/mfe/client/$env.GIT_BRANCH"
                    sh "cp -r \$(pwd)/dist /home/zomis/jenkins/mfe/client/$env.GIT_BRANCH"
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
