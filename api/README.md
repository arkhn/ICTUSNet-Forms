# AVC Forms API

## Recommended requirements
* Python 3.9 
* Pip 20.3.1
* Postresql 13.1
* Prerequesites for [psycopg](https://www.psycopg.org/docs/install.html)

## Usage
* Run a postgresql database `postgres` at `localhost:5432` (user `postgres`, no password)
* Install dependencies `pip install -r requirements.txt`
* Apply migration `python manage.py migrate` 
* Create an admin user `python manage.py createsuperuser`
* Run `python manage.py runserver`
* Visit `localhost:8080` and login

## Base configuration override for local development
* Add environment variables in a `.env.local` file in the API project directory

## Routes
* API documentation at `host:port/api` 
* Admin interface at `host:port/api/admin`

* `/token/`
  * `POST` request
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
  * Response
    ```json
    {
      "refresh": "refresh_jwt_token",
      "access": "access_jwt_token"
    }
    ```
* `/token/refresh/`
  * Request
    ```shell script
    curl \
      -X POST \
      -H "Content-Type: application/json" \
      -d '{"refresh":"refresh_token_jwt"}' \
      http://host:port/api/token/refresh/
    ```
  * Response
    ```json
    { "access": "access_jwt_token" }
    ```
* `/users`
* `/patients`
  * Example request
    ```shell script
    curl \
      -H "Bearer access_jwt_token"
      http://host:port/api/patients
    ```
