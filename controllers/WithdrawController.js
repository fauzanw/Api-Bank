exports.withdraw = async () => {
   const {no_rek, pin, nominal} = req.body
   try {
      if(nominal > 50000) {
         const checkAccount = await Model.find("user", {no_rekening: no_rek})
         if(checkAccount.length > 0) {
            if(checkAccount[0].pin == pin) {
               if(checkAccount[0].saldo > 50000 || parseInt(checkAccount[0].saldo) >= parseInt(nominal)) {
                  const reduceSaldo = parseInt(checkAccount[0].saldo) - parseInt(nominal)
                  const withDraw = await Model.update("user", {no_rekening: no_rek}, {saldo: reduceSaldo})
                  if(withDraw) {
                     await Model.insert("history", {nama_lengkap: checkAccount[0].nama_lengkap, no_rekening: no_rek, history: "Withdraw nominal " + FormatRupiah.convert(nominal)})
                     Res.success("Berhasil withdraw", {nominal: FormatRupiah.convert(nominal)})
                  }else {
                     Res.bad("Gagal withdraw", {nominal: FormatRupiah.convert(nominal)})
                  }
                  
               }else {
                  Res.bad("Saldo tidak mencukupi")
               }
            }else {
               Res.bad("Pin salah")
            }
         }else {
            Res.bad("No rekening ini tidak ditemukan")
         }
      }else {
         Res.bad("Withdraw minimal " + FormatRupiah.convert(50000))
      }
   }
   catch(err) {
      console.log(err)
      Res.fail()
   }
}