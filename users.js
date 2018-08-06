var express = require('express');
var router = express.Router();
// let url ="http://localhost:3000/download/";
// let url ="http://192.168.100.5:3000/download/";; Rumah
// let url ="http://192.168.88.135:3000/download/"; Kantor
// let url ="http://192.168.1.7:3000/download/"; Kosan
// let url ="http://open.katadata.co.id:3000/download/"; Server
let url ="http://192.168.88.135:3000/download/"; 


router.get('/:awal', function(req, res, next) {
	var awalx = req.params.awal;
	connection.query(' select data.id, nama_data.nama as nama_data, perusahaan.nama as instansi, data.description as deskripsi, data.sumber as sumber, data.date_created as date_created,data.date_modified as date_modified, users.username as nama_pengunggah, users.email as email from data, nama_data, perusahaan, users where nama_data.id = data.id_nama_data and perusahaan.id = data.instansi and users.id = data.user_created order by data.id asc limit '+awalx+", 20", function (error, results, fields)				 
					 { 
	
		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  	} else {

			var link = []
            for (a_ in results){
                link[a_] = url + results[a_].id
			}

			No = []
			for (b_ =0; b_ < 20; b_++){
				No.push(b_+1)
			}

			var date_createdx = []
            for (c_ in results){
                date_createdx[c_] = results[c_].date_created
			}

			var date_modifiedx = []
            for (d_ in results){
                date_modifiedx[d_] = results[d_].date_modified
			}

			var nama_pengunggahx = []
            for (e_ in results){
                nama_pengunggahx[e_] = results[e_].nama_pengunggah
			}

			var nama_datax = []
            for (f_ in results){
                nama_datax[f_] = results[f_].nama_data
			}

			var nama_instansix = []
            for (g_ in results){
                nama_instansix[g_] = results[g_].instansi
			}

			var desx = []
            for (h_ in results){
                desx[h_] = results[h_].deskripsi
			}

			var sumberx = []
            for (i_ in results){
                sumberx[i_] = results[i_].sumber
			}

			var emailx = []
            for (j_ in results){
                emailx[j_] = results[j_].email
			}

			kumpulan = {}
			for (z_ = 0; z_ < 20; z_++){
				kumpulan[No[z_]] = {}
				kumpulan[No[z_]]["Link"] = link[z_]
				kumpulan[No[z_]]["Nama Data"] = String(nama_datax[z_])
				kumpulan[No[z_]]["Instansi"] = String(nama_instansix[z_])
				kumpulan[No[z_]]["Date_created"] = String(date_createdx[z_])
				kumpulan[No[z_]]["Date_modified"] = String(date_modifiedx[z_])
				kumpulan[No[z_]]["Nama Pengunggah"] = String(nama_pengunggahx[z_])
				kumpulan[No[z_]]["Email Pengunggah"] = String(emailx[z_])
				kumpulan[No[z_]]["Sumber"] = String(sumberx[z_])
				kumpulan[No[z_]]["Deskripsi"] = String(desx[z_])
				


			}


			lanjut = "http://192.168.88.135:3000/users/"+String(parseInt(awalx)+20)

			res.send(JSON.stringify({"Response": kumpulan, "Next": lanjut}));
			// res.send(JSON.stringify({"Response": kumpulan, "Next": lanjut}));


	  	}
  	});
});

module.exports = router;
