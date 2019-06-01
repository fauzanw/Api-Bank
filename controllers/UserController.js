exports.registerUser = async () => {
	let { nama_lengkap, email, alamat, pin } = req.body
	const checkUser = await Model.find("user", {email: email})
	if(checkUser[0]) {
		Res.bad("Email ini sudah terdaftar")
	}else {
		const no_rek = Math.floor((Math.random() * 999999999) + 0)
		const register = await Model.insert("user", {
			nama_lengkap: nama_lengkap, 
			email: email, 
			alamat: alamat,
			saldo: 0,
			no_rekening: no_rek,
			pin: pin,
			id_bank: 2
		});
		if(register) {
			Res.success("Berhasil daftar", {no_rekening: no_rek, id_bank: 2});
		}else {
			console.log(register);
			Res.bad("Gagal mendaftar")
		}
	}
}


exports.loginUser = async () => {
	const {email, pin} = req.body
	const checkUser = await Model.find("user", {email: email})
	if(checkUser[0]) {
	 if(checkUser[0].pin == pin) {
			Res.success("Berhasil login")
		}else {
			Res.bad("Pin salah")
		}
	}else {
		Res.bad("Akun ini tidak ditemukan")
	}
}

exports.profileUser = async (req, res) => {
	let {user_id} = req.params
  const checkUser = await Model.find("user", {id: user_id})
  if(checkUser[0]) {
     const data = {
        nama_lengkap: checkUser[0].nama_lengkap,
        email: checkUser[0].email,
        alamat: checkUser[0].alamat,
        saldo: checkUser[0].saldo,
        no_rek: checkUser[0].no_rekening,
        id_bank: checkUser[0].id_bank
     }
     Res.success("Berhasil mengumpulkan data user", data)
  }else {
     Res.bad("User ini tidak ditemukan")
  }
}