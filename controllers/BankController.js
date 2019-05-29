let Model  = require("../models/bankModel")
let Res    = require("./ResponseController")
let Moment = require("moment")()

exports.getAllBank = (req, res) => {
	Model.findAll()
	.then(rows => {
		Res.success("Berhasil mengumpulkan semua data bank", rows)
	})
	.catch(err => {
		console.log(err);
		Res.fail()
	})
}

exports.getBankById = (req, res) => {
	let {id_bank} = req.params
	Model.findOne(id_bank)
	.then(rows => {
		if(rows[0]) {
			Res.success("Berhasil mengumpulkan data bank " + rows[0].nama_bank, rows)
		}else {
			Res.bad("ID Bank tidak ditemukan")
		}
	})
	.catch(err => {
		console.log(err)
		Res.fail()
	})
}

exports.buatBank = async (req, res) => {
	let {nama_bank, biaya_transfer_beda_bank} = req.body
	let dibuat_pada = Moment.format("DD-MM-YYYY");
  let checkBank = await Model.findOneByNama(nama_bank);
  console.log(checkBank)
  if(checkBank[0]) {
  	Res.bad("Nama bank ini sudah digunakan")
  }else {
  	 	Model.buatBank(nama_bank, biaya_transfer_beda_bank, dibuat_pada)
	   .then(rows => {
		    if(rows) {
			    Res.success("Berhasil membuat bank " + nama_bank)
		    }else {
		    	 Res.bad("Gagal membuat bank")
		    }
	   })
	   .catch(err => {
	    	console.log(err);
	    	Res.fail();
	   })
  }
}