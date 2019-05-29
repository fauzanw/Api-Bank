let DB           = require("../config/Database");
let FormatRupiah = require("rupiah-format")

exports.findAll = async () => {
	let db = await DB("bank");
	for(let i = 0; i < db.length; i++) {
		db[i].biaya_transfer_beda_bank = FormatRupiah.convert(db[i].biaya_transfer_beda_bank)
	}
	return db;
}

exports.findOne = async (id_bank) => {
	let db = await DB("bank").where("id_bank", id_bank);
	if(db[0]){
		db[0].biaya_transfer_beda_bank = FormatRupiah.convert(db[0].biaya_transfer_beda_bank)
	 return db;
	}else {
		return []
	}
}

exports.findOneByNama = async (nama_bank) => {
	return await DB("bank").where("nama_bank", nama_bank);
}

exports.buatBank = async (nama_bank, biaya_transfer_beda_bank, dibuat_pada) => {
	return await DB("bank")
	             .insert({
	             	 nama_bank: nama_bank,
	             	 biaya_transfer_beda_bank: biaya_transfer_beda_bank,
	             	 dibuat_pada: dibuat_pada
	             });
}