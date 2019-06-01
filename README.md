# Api-Bank
Simple restful api bank
# Instalasi
- Buat database dengan nama `bank`
- Setting configurasi database anda di file /config/Database.js
```js
// config/Database.js
module.exports = require("knex")({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'USER_DATABASE_ANDA',
		password: 'PASSWORD_DATABASE_ANDA',
		database: 'bank'
	}
})
```
- Impor file /sql/bank.sql ke database anda
- Install semua package
```sh
npm install
```
# Requirement Package
- Knex.js
- Express.js
- Body-Parser
- Helmet
# Jalankan Server
```sh
npm start
```
# License
ISC

# kritik & saran
http://facebook.com/dominic404
http://instagram.com/fauzzanw