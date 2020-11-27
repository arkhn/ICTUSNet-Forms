# AVC Forms API

## Usage

* API root at `host:port/api` 
* Admin interface at `host:port/api/admin`

## Routes
Visit `host:port/api` and login for full API documentation

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
