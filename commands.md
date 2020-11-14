# Docker

### build image docker

docker build -t [dockername/name]

### create and start a container

docker run [dockername/name]

### create and start a container and override default command

docker run -it [dockername/name] [cmd]

### print information for all running containers

docker ps

### execute command in a running container

docker exec -it [dockername/name] [cmd]

### print logs from the given container

docker logs [container id]

# Kubernetes

### create Pod

kubectl apply -f posts.yaml

### get list of running pods

kubectl get pods

### execute command in a running pod

kubectl exec -it [pod name] [cmd]

#### run shell in a running pod

kubectl exec -it [pod name] sh

### print logs from the given pod

kubectl logs [pod name]

### delete the given pod

kubectl delete pod [pod name]

### tell k to process the config

kubectl apply -f [config file name]

### print out some information about the running pod

kubectl describe pod [pod name]

### list of all running deployments

kubectl get deployments

### print out some information about the specific deployment

kubectl describe deployment [depl-name]

### create a deployment from config file

kubectl apply -f [config file name]

### delete a deployment

kubectl delete deployment [depl-name]

# Updating deployment

#### put :latest in version in yaml config file

#### rebuild image go to correct directory

docker build -t [name] .

#### push image to dockerhub

docker push [my docker id]/[name]

#### tell the deployment to run this latest version

kubectl rollout restart deployment [name]

# Create services

#### from infra/k8s

kubectl apply -f [config file name]

#### get all services

kubectl get services

##### access service from outside node

#### result is: posts-srv NodePort 10.99.38.203 <none> 4000:32299/TCP 105s

### service description

kubectl describe service [name]

### just for development

##### access service in browser from random port NodePort: posts 3xxxx/TCP

##### for Docker for Mac/Windows address is: localhost:32299/posts

### appply all config files with one command

kubectl apply -f .

### debug error

kubectl describe pod [pod name]
