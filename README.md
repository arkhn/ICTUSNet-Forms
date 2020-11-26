# AVC Forms

## Usage
Run `docker-compose up -d` and visit `localhost:8080`

## Configuration
Set your custom configuration in `.env` file

## Routes
* `/api-auth/login` accepts basic authentication
* `/api-auth/logout`
* `/users`
* `/patients`
```json
{
"code": "unique_text_field",
"data": { "valid_json_field": "" } 
}
```
