let Model = require("../models/userModel"); // User Model
let Res   = require("../controllers/ResponseController"); // Response Controller

exports.registerUser = (req, res) => {
	let { nama_lengkap, email, alamat, pin } = req.body
	Model.registerUser(nama_lengkap, email, alamat, pin)
	.then(row => {
		if(row == "Email sudah terdaftar") {
		 Res.bad("Email ini sudah terdaftar")
		}else {
		 User.findOneUserAfterRegister(email)
		 .then(response => {
		 	  Res.success("Berhasil mendaftar", response)
		 })
		}
	})
	.catch(err => {
		 console.log(err);
		 Res.bad("Gagal mendaftar");
	})
}


exports.loginUser = (req, res) => {
	let {email, pin} = req.body
	Model.loginUser(email, pin)
	.then(response => {
		if(response == "Email tidak ditemukan") {
			Res.bad("Email ini tidak terdaftar");
		}else {
			if(response == "pin salah") {
				Res.bad("Pin anda salah")
			}else {
				Res.success("Berhasil login")
			}
		}
	})
	.catch(err => {
		console.log(err);
		Res.fail();
	})
}

exports.profileUser = (req, res) => {
	let {user_id} = req.params
  Model.findOneUserById(user_id)
	.then(row => {
		if(row == "user tidak ditemukan") {
			Res.bad("User tidak ditemukan")
		}else {
			Res.success("User berhasil ditemukan", row)
		}
	})
	.catch(err => {
		console.log(err);
		Res.fail()
	})
}