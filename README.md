# This project is dead

This is the client part of a dead monstrosity.

[Click!](https://github.com/qtenebrae/edelweiss-backend) - the server part of a dead monstrosity.

Coincidentally, this project is my degree dissertation. However, due to the lack of time to realise such a project, it turned into something terrible.

All that time went into the design. As a result, the implementation is, in my opinion, simply disgusting. I would not advise you to go into the source code.

I have given up any kind of rescue attempt on this project.

But his idea is alive and well and is evolving into a new project - [Click!](https://github.com/qtenebrae/eien_no_library)

The following is a brief history of the project.

# History

The original idea of the project was to create an online encyclopedia of movies and TV series with elements of gamification.

The project is a distributed microservice information system of rating type.

A microservice architecture was designed for this project.

Which you can see in the picture below.

![Architecture (1)](https://github.com/user-attachments/assets/2c02a08b-190d-4583-a7fa-90d1cea17427)

Let's consider what functions are performed by the components represented in the
architecture:
> - A `web browser` is used as a `client`, providing an interface for user interaction with the system. The `client` sends requests to the `API gateway`.
> - The `API Gateway` acts as the `entry point` for all requests to the system. Provides authentication, authorisation and routing of requests.
Uses `REST` to interact with `clients` and other components of the system.
> - The `Rating Calculation Service` is directly responsible for calculating ratings for movies,
film and book ratings. It uses data from the `catalogue service` and the `feedback service`.
> - The `Catalogue Service` is responsible for managing information about books, films and series.
> - `Feedback Service` handles user ratings, comments and reviews.
> - The `message broker` provides asynchronous interaction
between the components of the system.
> - The `User Service` is used for user registration, authentication and authorisation. It also provides user profile management. It is integrated with the `Identity and Access Manager`.
> - `Identity and Access Manager` provides user registration,
authentication and authorisation of users.
> - `Databases` store the data required to operate each of the services.
services.

# Stack of technologies
### Client side of the application
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![NextUI](https://img.shields.io/badge/NextUI-gray?style=flat)


### Server side of the application
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# Results

* Designed a microservice architecture for the system under development.
* A client application was implemented using the TypeScript programming language and the Next.js web framework. The client application developed uses server-side rendering technology, which
Ensures fast loading of the first page and improves SEO as search engines better index the preliminary page.
* The NestJS web framework was used to implement the server part of the application, including the user service, catalogue service, rating calculation service and film feedback service.
* Keycloak is integrated into the developed system for user registration, authentication and authorisation.
* Implements asynchronous interaction between microservices using RabbitMQ message broker.
* Nginx was configured as the web server, providing routing, authentication and authorisation of requests in the system.
* A configuration file for deploying the implemented information system in Docker.


