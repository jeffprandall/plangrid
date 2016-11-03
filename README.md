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

### Update the config file

Update the json file in config/config-sample.json with your appropriate information then rename to config.json.

```
{
	"plangrid": {
		"url": "io.plangrid.com",
		"key": "<YOUR PLANGRID API KEY HERE>",
		"headers": { "Accept": "application/vnd.plangrid+json; version=1" }
	},
	"development": {
	    "username": "<USERNAME>",
	    "password": "<PASSWORD>",
	    "database": "Plangrid-dev",
	    "host": "localhost",
	    "dialect": "postgres"
	},
	"production": {
	    "username": "<SQL USERNAME>",
	    "password": "<SQL PASSWORD>",
	    "database": "Plangrid",
	    "host": "<SQL HOST NAME>",
	    "dialect": "mssql",
	    "port": 1433,
	    "instanceName": "<INSTANCE NAME>",
	    "logging": false
	}
}
```

### Run migration to prep the database
``` sequelize db:migrate --env=production ```

(optional)
``` sequelize db:migrate --env=development ```


### Run in Production
NODE_ENV=production nodejs app.js 

### Update project_id to your needs

Additional field we use to track our projects internally.  All PlanGrid projects start with the job number as the prefix.  Update file controllers/projects line#19.  [Reference here to learn more about substring.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)