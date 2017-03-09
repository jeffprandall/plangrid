

module.exports = {
	"plangrid": {
		"url": "io.plangrid.com",
		"key": process.env.PLANGRID_KEY,
		"headers": { "Accept": "application/vnd.plangrid+json; version=1" },
		"rate_limit": "2000"
	},
	"development": {
	    "username": process.env.DEV_USERNAME,
	    "password": process.env.DEV_PASSWORD,
	    "database": process.env.DEV_DATABASE,
	    "host": "localhost",
	    "dialect": "postgres"
	},
	"production": {
	    "username": process.env.PROD_USERNAME,
	    "password": process.env.PROD_PASSWORD,
	    "database": process.env.PROD_DATABASE,
	    "host": process.env.PROD_HOST,
	    "instanceName": process.env.PROD_INSTANCE,
	    "dialect": "mssql",
	    "port": 1433,
	    "logging": false
	}
};