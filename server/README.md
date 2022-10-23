# Social Media App REST API

An open-source RESTful API developed using NodeJS, ExpressJS and MongoDB helps client to integrate User Authentication and Social Media Post Management in their application.

## Setup

- Set up .env file using .env.example file
- Navigate to root and install dependencies with `npm install`
- Server is running on http://localhost:1234

## Create a New User

### Request

`POST /api/auth/register`

    curl -d '{"username":"Bob", "email":"test@gmail.com", "password":"123456"}' -H "Content-Type: application/json" -X POST "http://localhost:1234/api/auth/register"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"username":"Bob","email":"test@gmail.com","password":"$2b$10$4L3h3js3IivRgfaSTrUyiOh/GuiO3Rc3L9J4QBdB/dXLVtfLeIvn6","profilePicture":"","coverPicture":"","followers":[],"followings":[],"isAdmin":false,"_id":"634adf302e71b8012bf86578","createdAt":"2022-10-15T16:26:24.509Z","updatedAt":"2022-10-15T16:26:24.509Z","__v":0}

## Update an Existing User

### Request

`PUT /api/users/:id`

    curl -d '{"userId":"634adf302e71b8012bf86578", "profilePicture":"http://www.newpic.com", "password":"121212"}' -H "Content-Type: application/json" -X PUT "http://localhost:1234/api/users/634adf302e71b8012bf86578"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "account has been updated"

## Delete an Existing User

### Request

`DELETE /api/users/:id`

    curl -d '{"userId":"634adf302e71b8012bf86578"}' -H "Content-Type: application/json" -X DELETE "http://localhost:1234/api/users/634adf302e71b8012bf86578"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "user deleted"

## Get an Existing User

### Request

`GET /api/users/`

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/users?username=Bob"

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/users?userId=634adf302e71b8012bf86578"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"username":"Bob","email":"test@gmail.com", "profilePicture":"","coverPicture":"","followers":[],"followings":[],"isAdmin":false,"_id":"634adf302e71b8012bf86578","createdAt":"2022-10-15T16:26:24.509Z", "__v":0}

## Follow Another User

### Request

`PUT /api/users/:id/follow`

    curl -d '{"userId":"634adf302e71b8012bf86578"}' -H "Content-Type: application/json" -X PUT "http://localhost:1234/api/users/6349cd25998a1c513d539257/follow"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "user has been followed"

## Create New Post

### Request

`POST /api/posts/`

    curl -d '{"userId":"634adf302e71b8012bf86578", "desc":"hello from hawaii", "img":"http://www.hawaiiphoto.com"}' -H "Content-Type: application/json" -X POST "http://localhost:1234/api/posts"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"userId":"634adf302e71b8012bf86578","desc":"hello from hawaii","img":"http://www.hawaiiphoto.com","likes":[],"_id":"634ae3092e71b8012bf8657f","createdAt":"2022-10-15T16:42:49.296Z","updatedAt":"2022-10-15T16:42:49.296Z","__v":0}

## Update an Existing Post

### Request

`PUT /api/posts/:id`

    curl -d '{"userId":"634adf302e71b8012bf86578", "desc":"hello from canada", "img":"http://www.canadaphoto.com"}' -H "Content-Type: application/json" -X PUT "http://localhost:1234/api/posts/634ae3092e71b8012bf8657f"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "post updated"

## Delete an Existing Post

### Request

`DELETE /api/posts/:id`

    curl -d '{"userId":"634adf302e71b8012bf86578"}' -H "Content-Type: application/json" -X DELETE "http://localhost:1234/api/posts/634ae3092e71b8012bf8657f"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "post deleted"

## Get an Existing Post

### Request

`GET /api/posts/:id`

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/posts/634ae3092e71b8012bf8657f"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"_id":"634ae3092e71b8012bf8657f","userId":"634adf302e71b8012bf86578","desc":"hello from canada","img":"http://www.canadaphoto.com","likes":[],"createdAt":"2022-10-15T16:42:49.296Z","updatedAt":"2022-10-15T16:44:39.909Z","__v":0}

## Like an Existing Post

### Request

`PUT /api/posts/:id/like`

    curl -d '{"userId":"6349cd25998a1c513d539257"}' -H "Content-Type: application/json" -X PUT "http://localhost:1234/api/posts/634ae3092e71b8012bf8657f/like"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "user liked this post"

## Get Timeline of Posts from Followings

### Request

`GET /api/posts/timeline/:id`

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/posts/timeline/6349ca31eec073685e29ba10"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"_id":"634aca616b72f59e263be3bd","userId":"6349cd25998a1c513d539257","desc":"dog","img":"http://www.dogimg.com","likes":[],"createdAt":"2022-10-15T14:57:37.131Z","updatedAt":"2022-10-15T14:57:37.131Z","__v":0},
      {"_id":"634ad88fa0dc59edb776783b","userId":"6349cd25998a1c513d539257","desc":"chicken","img":"http://www.chicken.com","likes":[],"createdAt":"2022-10-15T15:58:07.993Z","updatedAt":"2022-10-15T15:58:07.993Z","__v":0},
      {"_id":"634aca486b72f59e263be3bb","userId":"634ac9db6b72f59e263be3b9","desc":"cat","img":"http://www.catimg.com","likes":[],"createdAt":"2022-10-15T14:57:12.296Z","updatedAt":"2022-10-15T14:57:12.296Z","__v":0}]

## Get Posts from User

### Request

`GET /api/posts/profile/:id`

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/posts/profile/6349ca31eec073685e29ba10"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:42:49 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"_id":"634acaa16b72f59e263be3dd","userId":"6349ca31eec073685e29ba10","desc":"bunny","img":"http://www.bunnyimg.com","likes":[],"createdAt":"2022-10-15T14:57:37.131Z","updatedAt":"2022-10-15T14:57:37.131Z","__v":0}]

## Project Stack

- Back-End: Express, Node.js, MongoDB, Mongoose

## Dependencies

- express
- mongoose
- bcrypt
- dotenv
- helmet
- morgan
- nodemon

## Connect With Me

[Github](https://github.com/gloria-cheung)
-- [Linkedin](http://www.linkedin.com/in/gloria-cheung) --
[Portfolio](http://www.gloria-cheung.com)
