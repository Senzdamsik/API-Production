var express = require('express');
var router = express.Router();
// let url ="http://localhost:3000/download/";
// let url ="http://192.168.100.5:3000/download/";
// let url ="http://192.168.88.135:4000/download/";
// let url ="http://192.168.88.135:3000/download/";
// let url ="http://192.168.1.7:3000/download/";

let url ="http://open.katadata.co.id:3000/download/";


router.get('/:awal-:akhir', function(req, res, next) {
	var awalx = req.params.awal;
	var akhirx = req.params.akhir;
	connection.query('SELECT id from data order by id desc limit '+awalx+","+akhirx, function (error, results, fields) {
	
		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  	} else {
            var arr = []
            for (i in results){
                arr[i] = url + results[i].id
			}

			No = []
			for (j =0; j < 20; j++){
				No.push(j+1)
			}

			kumpulan = {}
			for (k =0; k < 20; k++){
				kumpulan[No[k]] = arr[k]
			}
			
			lanjut = "http://open.katadata.co.id:3000/users/"+String(parseInt(awalx)+20)+"-"+String(parseInt(akhirx)+20)

			res.send(JSON.stringify({"Error": null, "Response": kumpulan, "Next": lanjut}));


	  	}
  	});
});

module.exports = router;
