## PlanGrid data to local Microsoft SQL database



## Prerequisites

* nodejs > 6.0
* ```npm install -g tedious sequelize sequelize-cli```


### Setup the database(s)
1. Create a new database on your MSSQL called Plangrid
2. (optional) Create another database on your MSSQL called Plangrid-dev if you want to have something to test against.
3. Create a new SQL user and make it the dbo for both databases.

### Update the config file

Update the json file in config/config-sample.json with your appropriate information then rename to config.json.

```
{
	"plangrid": {
		"url": "io.plangrid.com",
		"key": "PLANGRID API KEY HERE",
		"headers": { "Accept": "application/vnd.plangrid+json; version=1" }
	},
	"development": {
	    "username": "SQL USERNAME",
	    "password": "SQL PASSWORD",
	    "database": "Plangrid-dev",
	    "host": "SQL HOSTNAME/IP ADDRESS",
	    "port": 1433,
	    "dialect": "mssql",
	    "instanceName": "INSTANCENAME"
	},
	"production": {
	    "username": "SQL USERNAME",
	    "password": "SQL PASSWORD",
	    "database": "Plangrid",
	    "host": "SQL HOSTNAME/IP ADDRESS",
	    "dialect": "mssql",
	    "port": 1433,
	    "instanceName": "INSTANCENAME",
	    "logging": false
	}
}
```

### Run migration to prep the database
``` sequelize db:migrate --env=production ```

(optional)
``` sequelize db:migrate --env=development ```


### Update project_id to your needs

Additional field we use to track our projects internally.  All PlanGrid projects start with the job number as the prefix.  Update file controllers/projects line#19.  [Reference here to learn more about substring.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)