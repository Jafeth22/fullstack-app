# Docker Image
```
docker build -t back-end-server-docker [-f dockerFileName] .
```
- `-t` = To give our img a tag name
- `.` = Indicates that we are going to work in the current path, it can be changed
- `-f dockerFileName` = To run a dockerfile with a diferent name

```
docker run [-p portMachine:porDocker] dockerImageName
```
- `-p portMachine:porDocker` = To specify the port

# Docker-Compose
To define all services, APIs, to group all services to run under a single container
Build from `docker-compuse` file, **you should be in the same directory**
```
docker-compose [-f dockerCompuseFileName.yml] up --build [-d]
```
- `-f dockerCompuseFileName.yml` = To run a dockerCompusefile with a diferent name
- `-d` = run in background

