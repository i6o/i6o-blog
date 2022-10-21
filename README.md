# i6o - Open Blog

This is a simple blog post demo application build with Next.JS called **Open Blog**.

By default the application runs on port **3000** and it needs a `Redis` server for storing the blog posts.

# Build process

## Building the application container

To build the application container run:

```
make build
```

To start local testing enviroment run

```
make run
```

Visit the application at [http://localhost:3000](http://localhost:3000).

To stop the local testing environment run

```
make stop
```

For additional make commands see:

```
make help
```

# Application setup

## Prerequisites

The address where the Redis is running needs to be given for the application via _/app/.env.production_ ini-file. Create the file by copy pasting the example below or modify it to your needs.

Example of the _.env.production_ file:

```
REDIS_URL=redis://redis:6379
```

## Running the application

To start the application run:

```
docker run -p 3000:3000 -v $(pwd)/.env.production:/app/.env.production mikaheim/i6o-blog
```

Now you should be able to visit the application at [http://localhost:3000](http://localhost:3000).

## Running the application via Docker compose

Easiest way to setup all is running the app with Docker compose.

Save this yaml to a file called _docker-compose.yml_.

```
version: "3.4"
services:
  application:
    build: .
    image: mikaheim/i6o-blog:latest
    container_name: i6o-blog
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 3s
        max_attempts: 3
        window: 10s
    ports:
      - 3000:3000
    volumes:
      - ./.env.production:/app/.env.production
    depends_on:
      - redis
    networks:
      - i6o-blog-net
  redis:
    image: redis
    container_name: redis
    deploy:
      replicas: 1
    ports:
      - 6379:6379
    networks:
      - i6o-blog-net
networks:
  i6o-blog-net:
    driver: bridge
```

Make sure you have alse created the _.env.production_ ini-file as stated in [prerequisites](#prerequisites).

To start the application run:

```
docker-compose up -d
```

See logs for any errors:

```
docker logs i6o-blog
```

The last log line should state:

> Listening on port 3000

Now you should be able to visit the application at [http://localhost:3000](http://localhost:3000).
