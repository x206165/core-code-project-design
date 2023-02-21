The project consists of making a web application for budget management, this web application must have the following characteristics:

Login/Register page

Option to add bank accounts

Option to add expenses/income

The application must have by default a list of categories to be able to use when recording an expense/income

Page to view expense/income history

Filter by date

Filter by category

Filter by bank account

Transfers between local accounts (Within the same application)

What comes out of the account is recorded as an expense

What goes into the account is recorded as income

They must be able to handle different currencies as well as exchange rates

General dashboard

A summary of the accounts should be shown

From the dashboard, you can add expenses/income and also record local transactions


# core-code-project-design

React and Node with PostgreSQL, project analysis and design

# diagrams

Modules level zero

https://github.com/x206165/core-code-project-design/blob/main/diagrams/diagramsIndex.md

Objects components

https://github.com/x206165/core-code-project-design/issues/2

UI vs Objects

https://github.com/x206165/core-code-project-design/issues/4  (old version) 

https://github.com/x206165/core-code-project-design/issues/5  (updated with views, context and redux components map, navigation sequence, objects model) 

#core-code-project-design
A basic budget javascript application using reacjs, express and Oracle Database.

#commands for the project reconstructions and execution 

# build images

``` powershell
# Build Images - con estos comando se puede compilar desde la raiz 
docker build -t mybackend:0.2.0 backend/
docker build -t myfrontend:0.2.2-alpine frontend/

# para compilar dentro de la carpeta respectiva 
docker build -t mybackend:0.2.0 .
docker build -t myfrontend:0.2.2-alpine .

# Run Application
docker compose up
docker compose down
docker compose down -v
```

# Creating docker repositories
docker tag mybackend:0.2.0 mumolk/w3-backend:0.2.0
docker push mumolk/w3-backend:0.2.0

docker tag myfrontend:0.2.2-alpine mumolk/w3-frontend:0.2.2-alpine
docker push mumolk/w3-frontend:0.2.2-alpine

