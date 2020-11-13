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
