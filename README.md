# User_Group_API

A simple API for working with Users and Groups.


## Technologies

Backend: Django, Django REST Framework

Frontend: React.js, Redux, CSS, JavaScript

Container: Docker

Database: PostgreSQL


## Instalation

Open terminal in necessary directory

Commands:

```bash
#clone from github
$ git clone https://github.com/yurasenchuk/user_groups.git
```

## Required files  

Create .env file in /backend directory

Enter settings data in file    
File example:  

      DEBUG=1  
      SECRET_KEY= #my_secret_key  
      DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]  
      SQL_ENGINE=django.db.backends.postgresql  
      SQL_DATABASE= #user_group   
      SQL_USER= #your_username  
      SQL_PASSWORD= #your_password  
      SQL_HOST=db  
      SQL_PORT=5432  
      DATABASE=postgres   


Configure docker-compose.yml :

     ...  
     environment:    
      - POSTGRES_DB= #user_group  
      - POSTGRES_USER= #your_username  
      - POSTGRES_PASSWORD= #your_password    
      - PGDATA=/var/lib/postgresql/data/pgdata  
     ...  
     
     

## Run

```bash
#build api
$ sudo docker-compose build

#start api
$ sudo docker-compose up

#migrate
$  sudo docker-compose exec backend python manage.py migrate --noinput
