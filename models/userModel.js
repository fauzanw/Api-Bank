let DB  = require("../config/Database");

exports.registerUser = async (nama_lengkap, email, alamat, pin) => {
	let cek_email = await DB("user").where("email", email);
	if(cek_email[0]){
		return "Email sudah terdaftar"
	}else {
  	return await DB("user").insert({
		  nama_lengkap: nama_lengkap,
		  email: email,
		  alamat: alamat,
		  saldo: 0,
		  no_rekening: Math.floor((Math.random() * 999999999) + 0),
		  pin: pin,
		  id_bank: 002
	 })
  }
}

exports.findOneUserAfterRegister = async (email) => {
	let db = await DB("user").where("email", email);
	return {
		"No Rekening": db[0].no_rekening,
		"Pin":  db[0].pin,
		"Saldo": db[0].saldo,
		"ID Bank": db[0].id_bank
	}
}

exports.loginUser = async (email, pin) => {
	let cek_data_user = await DB("user").where("email", email);
	if(cek_data_user[0]){
		if(cek_data_user[0]["pin"] == pin) {
			return "berhasil login"
   }else {
   	  return "pin salah"
   }
	}else {
		return "Email tidak ditemukan"
	}
}

exports.findOneUserById = async (user_id) => {
	return await DB("user").where("id", user_id)
}

exports.findOneUserByNoRek = async (no_rek) => {
	return await DB("user").where("no_rekening", no_rek);
}