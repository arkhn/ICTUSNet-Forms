# AVC Forms

## Routes
* `/api-auth/login` accepts basic authentication
* `/api-auth/logout`
* `/users`
* `/patients` accepts a json with the following fields
```json
{
"code": "unique_text_field",
"data": { "valid_json_field": "" } 
}
```
