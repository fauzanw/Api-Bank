let Res           = require("./ResponseController");
let UserModel     = require("../models/userModel");
let TransferModel = require("../models/transferModel");
let FormatRupiah  = require("rupiah-format");

exports.transferSaldo = async (req, res) => {
	let {from_no_rek, to_no_rek, pin, nominal} = req.body
	if(nominal < 10000) {
		Res.bad("Transfer saldo minimal " + FormatRupiah.convert(10000));
	}else {
		let checkFromUser = await UserModel.findOneUserByNoRek(from_no_rek);
		if(checkFromUser[0]) {
			if(checkFromUser[0].no_rekening == to_no_rek) {
	    if(checkFromUser[0].pin == pin) {
	    	 		let checkToUser = await UserModel.findOneUserByNoRek(to_no_rek);
		     	if(checkToUser[0]) {
			      if(checkFromUser[0].saldo > 0) {
			  		   if(parseInt(checkFromUser[0].saldo) > parseInt(nominal) || parseInt(checkFromUser[0].saldo) == parseInt(nominal)) {
			  		   	 let reduceSaldoFrom = parseInt(checkFromUser[0].saldo) - parseInt(nominal);
				       let addSaldoTo = parseInt(checkToUser[0].saldo) +  parseInt(nominal);
			       	 await TransferModel.updateSaldo(from_no_rek, reduceSaldoFrom);
				       await TransferModel.updateSaldo(to_no_rek, addSaldoTo);
				       Res.success("Berhasil transfer ke " + to_no_rek + " dengan nominal " + FormatRupiah.convert(nominal))
			  		   }else {
			  		   	  Res.bad("Saldo anda tidak mencukupi")
			  		   }
			      }else {
			  	    Res.bad("Saldo anda tidak mencukupi")
			      }
			   }else {
				   Res.bad("No Rekening " + to_no_rek + " tidak ditemukan")
	    		}
	    }else {
	    	Res.bad("Pin salah")
	    }
			}else {
				Res.bad("Anda tidak dapat transfer ke rekening anda sendiri")
			}
		}else {
			Res.bad("No Rekening " + from_no_rek + " tidak ditemukan")
		}
	}
}