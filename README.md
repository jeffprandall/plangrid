## PlanGrid data to local database

Using Postgres for local development testing and Microsoft SQL in production.


## Prerequisites

* nodejs > 6.0
* ```npm install -g tedious sequelize sequelize-cli```

### Setup the Postgres Development database
1. Create a new Postgres database on your local machine called Plangrid-dev and make the Owner the current user.

### Setup the MSSQL Production database
1. Create a new database on your MSSQL Server called Plangrid
2. Create a new SQL user and make it the dbo for both databases.

### Creating an .env file

Create a new file in the root of the project called .env

Create this on both Development and Production

```
// PlanGid API Key
PLANGRID_KEY='<your plangrid api here>'

// Development envirnoment setup
DEV_USERNAME='<dev username>'
DEV_PASSWORD='<dev password>'
DEV_DATABASE='<Plangrid-dev>'

// Production envirnoment
PROD_USERNAME='<sql username created above>'
PROD_PASSWORD='<sql password created above>'
PROD_HOST='<sql server hostname>'
PROD_INSTANCE='<sql server instance>'
PROD_DATABASE='<Plangrid>'

```

### Run migration to prep the database
``` sequelize db:migrate --env=production ```

(optional)
``` sequelize db:migrate --env=development ```


### Run in Production
NODE_ENV=production nodejs app.js 

### Update project_id to your needs

Additional field we use to track our projects internally.  All PlanGrid projects start with the job number as the prefix.  Update file controllers/projects line#19.  [Reference here to learn more about substring.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)


### Notes on the Docker configurations

[Node Specifics](http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html)