const DB = require("../config/Database");

exports.find = async (table, value) => {
	return await DB(table)
	            .where(value)
}

exports.findAll = async (table) => {
	return await DB(table)
	            .select()
}

exports.insert = async (table, value) => {
	return await DB(table)
	            .insert(value)
}

exports.update = async (table, where, value) => {
   return await DB(table)
                .where(where)
                .update(value)
}