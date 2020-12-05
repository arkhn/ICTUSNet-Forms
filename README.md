# AVC Forms

## Local development usage
Add a `.env.local` file in a service directory if you want to override its default configuration
and uncomment the file added in `docker-compose.override.yml`.
Run `docker-compose up`. Only the api and the database will run. 
Visit `host:port/api` (default `localhost:8080/api`) to access the API interface.
Default user Admin credentials are `{ username: admin, password: admin }`.

## Production or demo usage
Run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`. 
Visit `host:port` (default `localhost:8080`).
