module.exports = require("knex")({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'fauzan',
		database: 'bank'
	}
})