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
