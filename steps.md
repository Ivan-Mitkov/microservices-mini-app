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

#### Wire it all up
