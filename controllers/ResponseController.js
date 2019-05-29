exports.success = (pesan, data = []) => {
		if(data.length == 0) {
		 	res.status(200).json({
			  status: "success",
			  pesan: pesan
		  })
		}else {
			res.status(200).json({
				status: "success",
				pesan: pesan,
				data: data
			})
		}
}

exports.bad = (pesan) => {
	res.status(400).json({
		status: "error",
		pesan: pesan
	})
}

exports.fail = () => {
	res.status(500).json({
		status: "error",
		pesan: "Internal Server Error"
	})
}