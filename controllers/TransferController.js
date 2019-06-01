const FormatRupiah  = require("rupiah-format");
exports.transferSaldo = async () => {
	let {from_no_rek, to_no_rek, pin, nominal} = req.body
  if(nominal < 10000) {
		 Res.bad("Transfer saldo minimal " + FormatRupiah.convert(10000));
 	}else {
		const checkFromUser = await Model.find("user", {no_rekening: from_no_rek});
		const fromUser = checkFromUser[0]
		if(fromUser) {
		   if(pin == fromUser.pin) {
		      if(from_no_rek != to_no_rek) {
		         const checkToUser = await Model.find("user", {no_rekening: to_no_rek})
		         const toUser = checkToUser[0]
		         if(toUser) {
		            if(fromUser.id_bank == toUser.id_bank) {
		               if(fromUser.saldo >= parseInt(nominal)) {
		                const reduceSaldoFrom = parseInt(fromUser.saldo) - parseInt(nominal)
		                const addSaldoTo = parseInt(toUser.saldo) + parseInt(nominal)
		                await Model.update("user", {no_rekening: from_no_rek}, {saldo: reduceSaldoFrom})
		                await Model.update("user", {no_rekening: to_no_rek}, {saldo: addSaldoTo})
		                await Model.insert("history", {nama_lengkap: fromUser.nama_lengkap, no_rekening: from_no_rek, history: "Transfer saldo ke " + to_no_rek + " dengan nominal sebesar " + FormatRupiah.convert(nominal)})
		                await Model.insert("history", {nama_lengkap: toUser.nama_lengkap, no_rekening: to_no_rek, history: "Menerima saldo dari " + from_no_rek + " dengan nominal sebesar " + FormatRupiah.convert(nominal)})
		                Res.success("Berhasil transfer", {nominal: FormatRupiah.convert(nominal)})
		               }else {
		                 Res.bad("Saldo anda tidak mencukupi")
		               }
		            }else {
		               const checkFromBank = await Model.find("user", {id_bank: fromUser.id_bank})
		               if(fromUser.saldo >= parseInt(nominal + checkFromBank[0].biaya_transfer_beda_bank)) {
		                  const reduceSaldoFrom = parseInt(fromUser.saldo) - parseInt(nominal + checkFromBank[0].biaya_transfer_beda_bank)
		                  const addSaldoTo = parseInt(toUser.saldo) + parseInt(nominal)
		                  await Model.update("user", {no_rekening: from_no_rek}, {saldo: reduceSaldoFrom})
		                  await Model.update("user", {no_rekening: to_no_rek}, {saldo: addSaldoTo})
		                  await Model.insert("history", {nama_lengkap: fromUser.nama_lengkap, no_rekening: from_no_rek, history: "Transfer saldo ke " + to_no_rek + " dengan nominal sebesar " + FormatRupiah.convert(nominal)})
		                  await Model.insert("history", {nama_lengkap: toUser.nama_lengkap, no_rekening: to_no_rek, history: "Menerima saldo dari " + from_no_rek + " dengan nominal sebesar " + FormatRupiah.convert(nominal)})
		                  Res.success("Berhasil transfer", {nominal: FormatRupiah.convert(nominal)})
		               }else {
		                Res.bad("Saldo anda tidak mencukupi")
		               }
		            }
		         }else {
		            Res.bad("No Rekening tujuan tidak ditemukan")
		         }
		      }else {
		         Res.bad("Anda tidak dapat transfer ke rekening anda sendiri")
		      }
		   }else {
		      Res.bad("Pin salah")
		   }
		}else {
		   Res.bad("No rekening " + from_no_rek + " tidak ditemukan")
		}
	}
}