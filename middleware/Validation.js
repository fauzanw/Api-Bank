let validator = require("validator");
let Res       = require("../controllers/ResponseController") // Response Controller

exports.Register = (req, res, next) => {
	let { nama_lengkap, email, alamat, pin } = req.body
	if(!nama_lengkap || !email || !alamat || !pin) {
		return Res.bad("Invalid requests");
	}else {
		if(!validator.isEmail(email)) {
			return Res.bad("Format email tidak valid")
		}else if(isNaN(pin)) {
			return Res.bad("Pin harus angka")
		}
	}
	return next();
}

exports.Login = (req, res, next) => {
	let {email, pin} = req.body
	if(!email || !pin) {
		return Res.bad("Invalid requests")
	}else {
		if(!validator.isEmail(email)) {
			return Res.bad("Format email tidak valid")
		}else if(isNaN(pin)) {
			return Res.bad("Pin harus angka")
		}
	}
	return next();
}

exports.transferSaldo = (req, res, next) => {
	let {from_no_rek, to_no_rek, pin, nominal} = req.body
	if(!from_no_rek || !to_no_rek || !pin || !nominal) {
		return Res.bad("Invalid requests");
	}else {
		if(isNaN(from_no_rek) || isNaN(to_no_rek) || isNaN(pin) || isNaN(nominal)) {
			return Res.bad("Format harus angka")
		}
	}
	return next();
}