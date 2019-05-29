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
		database: 'NAMA_DATABASE_ANDA'
	}
})
```
- Install semua package
```sh
npm install
```
- Jalankan Server
```sh
npm start
````
# License
``` ISC ````