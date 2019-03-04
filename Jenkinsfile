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
        stage('Validate branch name') {
          when {
            expression {
              return !(env.GIT_BRANCH ==~ /\w+(\/\w+)?[\w\d\-]+/)
            }
          }
          steps {
            error("Invalid branch name")
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
            steps {
                // Stop running containers
                sh 'docker ps -q --filter name="mfe_client" | xargs -r docker stop'

                sh "rm -rf /home/zomis/jenkins/mfe/client/$env.GIT_BRANCH"
                script {
                  def path = "/home/zomis/jenkins/mfe/client/$env.GIT_BRANCH"
                  if (env.GIT_BRANCH == 'master') {
                    path = '/home/zomis/jenkins/mfe/client'
                  }

                  // Copy files
                  sh "cp -r \$(pwd)/dist/* $path"
                  writeFile file: path + '/version.json', text: "$env.BUILD_NUMBER"

                  // The client is open source, let them be, but here we could move *.map files outside of client so that they are not visible
                  // sh "mv $path/js/*.map $path../mapfiles/" //
                }
                // Start docker container
                sh 'docker run -d --rm --name mfe_client -v /home/zomis/jenkins/mfe/client:/usr/share/nginx/html:ro -p 64637:80 nginx'
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
