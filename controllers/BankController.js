let Moment = require("moment")()

exports.getAllBank = async () => {
  try {
     const findAll = await Model.findAll("bank")
     Res.success("Berhasil mengumpulkan semua data bank", findAll);
  }
	catch(err) {
	   console.log(err)
	   Res.fail()
	}
}

exports.getBankById = async () => {
	let {id_bank} = req.params
	try{
	   const find = await Model.find("bank", {id_bank: id_bank})
	   if(find[0]) {
	      Res.success("Berhasil mengumpulkan data bank" + find[0].nama_bank, find);
	   }else {
	      Res.bad("ID Bank tidak ditemukan")
	   }
	}
	catch(err){
	   console.log(err)
	   Res.fail()
	}
}

exports.buatBank = async () => {
	let {nama_bank, biaya_transfer_beda_bank} = req.body
	let dibuat_pada = Moment.format("DD-MM-YYYY");
  let checkBank = await Model.find("bank", {nama_bank: nama_bank});
  if(checkBank[0]) {
  	Res.bad("Nama bank ini sudah digunakan")
  }else {
     try {
      await Model.insert("bank", {nama_bank: nama_bank, biaya_transfer_beda_bank: biaya_transfer_beda_bank, dibuat_pada: dibuat_pada})
      const checkBank = await Model.find("bank", {nama_bank: nama_bank})
      Res.success("Berhasil membuat bank", {nama_bank: nama_bank, id_bank: checkBank[0].id_bank})
     }
     catch(err) {
      console.log(err)
      Res.fail()
     }
  }
}