### Steps

#### Build an image for the Event Bus in /eventbus

docker build -t ivanmitkov/event-bus .

#### Push the image to Docker Hub

docker push ivanmitkov/event-bus

#### Create a deployment for Event Bus

in infra/k8s
create deployment file
from infra/k8s
kubectl apply -f event-bus-depl.yaml
check if created
kubectl get pods

#### Create a Cluster IP service for Event Bus and for Posts

create configuration for Cluster IP service file in event-bus-depl.yaml
in infra/k8s
kubectl apply -f event-bus-depl.yaml
check
kubectl get services
create configuration for Cluster IP service file in posts-depl.yaml
in infra/k8s
kubectl apply -f posts-depl.yaml
check
kubectl get services

#### Wire it all up

###### change url in backend services to use service name from clusterIP instead localhost

###### rebuild images in there folders

docker build -t ivanmitkov/[name] .

###### push images in docker hub

docker push ivanmitkov/[name]

###### get the name of deployments

kubectl get deployments

###### update deployments

kubectl rollout restart deployment [name]

###### check if pods are restarting

kubectl get pods

###### verify communication with postman and with logs

access NodePort service
kubectl get services
get the port from service for NodePort
http://localhost:3xxxx/posts

###### verify communication with logs

get names of the pods
kubectl get pods
get logs
kubectl logs [name]
received event: PostCreated

# Add react application

https://github.com/kubernetes/ingress-nginx
https://kubernetes.github.io/ingress-nginx/deploy/

## add ingress controller

#### command for Mac the same is for windows

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml

##### Verify installation

kubectl get pods -n ingress-nginx \
 -l app.kubernetes.io/name=ingress-nginx --watch

## create ingress service config file

#### form k8s folder apply config file

kubectl apply -f ingress-srv.yaml

### trick windows to use localhost when try to connect to posts.com

C:\Windows\System32\drivers\etc
add in file hosts
127.0.0.1 posts.com
check in browser
go to http://posts.com/posts

#### change Dockerfile in react

add ENV CI=true in Docker file in react

#### change all requests in react app to use posts.com

localhost:[port] to posts.com

### build image for react app
docker build -t ivanmitkov/client .
docker push ivanmitkov/client
### create config file for client
### add to cluster from k8s
kubectl apply -f client-depl.yaml