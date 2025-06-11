# minikube-node-express-mongo
Boilerplate to spin up a MongoDB pod and an App pod for use with Minikube.

## First-time Setup (Quick Start)
0. Make sure your Virtualization software is runnning. E.g. Docker Engine.
1. Install `minikube` and `kubectl` according to the instructions here: https://kubernetes.io/docs/tutorials/hello-minikube/#before-you-begin
2. Run `minikube start`
3. Create a namespace in minikube. E.g. to create a `microdemo` namespace, run `kubectl create namespace microdemo`. This step is optional but this README will assume you have done this step.
4. Change working directory to your local clone of this repository.
5. Deploy MongoDB by running `kubectl apply -f mongodb-deployment.yaml`
6. Containerize the app within minikube by running:
    ```bash
    #bash
    eval $(minikube docker-env)
    docker build -t my-api-app:1.0 .
    ```
    or
    ```powershell
    #powershell
    #change context to Minikube's internal Docker daemon
    & minikube -p minikube docker-env --shell=powershell | Invoke-Expression
    #execute docker build command
    docker build -t my-api-app:1.0 .
    #change context back to default
    docker context use default
    ```
7. Confirm that the app image exists via minikube:
    ```bash
    minikube ssh
    docker images #my-api-app
    ```
    Exit minikube with `exit`.
    
8. Deploy the app pod and service with `kubectl apply -f app-deployment.yaml`.
9. Use a new terminal window and run `minikube service app-service -n microdemo`. This should give you an output similar to:
    ```
    |-----------|-------------|-------------|---------------------------|
    | NAMESPACE |    NAME     | TARGET PORT |            URL            |
    |-----------|-------------|-------------|---------------------------|
    | microdemo | app-service |          80 | http://192.168.49.2:30080 |
    |-----------|-------------|-------------|---------------------------|
    * Starting tunnel for service app-service.
    |-----------|-------------|-------------|------------------------|
    | NAMESPACE |    NAME     | TARGET PORT |          URL           |
    |-----------|-------------|-------------|------------------------|
    | microdemo | app-service |             | http://127.0.0.1:59331 |
    |-----------|-------------|-------------|------------------------|
    ```
    You should be able to interact with the app by doing a GET request to the endpoint:
    ```
    http://127.0.0.1:59331/data
    ```
    Replace the port number `59331` with whatever number your output shows you.
    Send data to MongoDB via this endpoint using a POST request with a JSON body such as:
    ```JSON
    {"name":"John Doe"}
    ```
10. Use a new terminal window and run `minikube dashboard` to start the minikube dashboard in a browser.
    Then, from the sidebar:
    ```
    Cluster -> Namespaces
    ```
    and pick `microdemo` from the list. Click the `Go to namespace` button at the top-right of the page. (It looks like a page with a fold on its top-right corner.)
    You'll be returned to the Workflow page, but if you scroll down you should find `my-app` and `mongodb` pods in `Running` status.