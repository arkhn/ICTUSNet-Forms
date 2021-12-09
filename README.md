# ICTUSnet
![alt text](app/public/ictus-logo.png "ICTUSNet Logo")

## Requirements
* Docker:  https://docs.docker.com/engine/install/
* Docker Compose: https://docs.docker.com/compose/install/
## Usage

### Install
* Run `docker-compose up -d`. It may take several minutes to launch. 
* Visit `host:port` (default `localhost:8080`).

### Update 
* Run `docker-compose up -d --build`. It may take several minutes to launch. 
* Visit `host:port` (default `localhost:8080`).

## Configuration
* If you want to override the default configuration, 
  set the environment variables displayed in the file `config.env`
* The default port (`8080`) can be changed in the `nginx` configuration in `docker-compose.yml`
## Administration interface
To manage user groups and users, visit `host/api/admin/` (default `localhost:8080/api/admin`)

