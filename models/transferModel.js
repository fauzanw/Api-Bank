let DB = require("../config/Database");

exports.updateSaldo = async (no_rekening, saldo) => {
	return await DB("user")
	            .where("no_rekening", no_rekening)
	            .update("saldo", saldo)
}