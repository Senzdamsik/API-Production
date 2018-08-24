var express = require('express');
var router = express.Router();
var fs = require('fs');
var DataFrame = require('dataframe-js').DataFrame;
var dataForge = require('data-forge');

var ExportToCsv = require('export-to-csv');


/* GET users listing. */
router.get('/:nama_data1', function(req, res, next) {
    var nama_data2 = req.params.nama_data1;
    var nama_data3 = nama_data2.split("-").join(" ")
    var nama_data4 = String("'"+nama_data3+"'")
    var query = 'select a.id, b.nama as nama_data, a.data_x as data_x, a.data_y as data_y, ' +
                'c.nama as nama_produk, d.nama as nama_item, e.nama as nama_negara, ' +
                'f.nama as nama_provinsi, g.nama as nama_kota, a.satuan as satuan, ' +
                'a.sumber as sumber from data a left join nama_data b ' +
                'ON a.id_nama_data = b.id left join produk c ON a.id_produk=c.id left join item d ' +
                'ON a.id_item = d.id left join negara e ON a.id_negara = e.id left join provinsi f ' +
                'ON a.id_provinsi = f.id left join kota g ON a.id_kota = g.id WHERE b.nama = '
    

    connection.query(query+nama_data4, function (error, results, fields) {
    
		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  	}else{
            
            try {
                var tampung_sementara = []
                for(var aa = 0; aa < results.length; aa++){   
                
                df = Object.values(results[aa])
                data_x1 = df[2].split(",")
                var tampung_x = []
                for(var i = 0; i < data_x1.length; i++){tampung_x.push(data_x1[i])}
                
                data_y1 = df[3].split(",")
                var tampung_y = []
                for(var j = 0; j < data_y1.length; j++){tampung_y.push(data_y1[j])}

                var tampung_id = []
                for(var k = 0; k < data_x1.length; k++){tampung_id.push(df[0])}

                var tampung_nama_data = []
                for(var l = 0; l < data_x1.length; l++){tampung_nama_data.push(df[1])}



                var tampung_nama_produk = []
                for(var m = 0; m < data_x1.length; m++){tampung_nama_produk.push(df[4])}

                var tampung_item = []
                for(var n = 0; n < data_x1.length; n++){tampung_item.push(df[5])}

                var tampung_negara = []
                for(var p = 0; p < data_x1.length; p++){tampung_negara.push(df[6])}

                var tampung_provinsi = []
                for(var q = 0; q < data_x1.length; q++){tampung_provinsi.push(df[7])}

                var tampung_kota = []
                for(var r = 0; r < data_x1.length; r++){tampung_kota.push(df[8])}

                var tampung_satuan = []
                for(var s = 0; s < data_x1.length; s++){tampung_satuan.push(df[9])}


                var tampung_sumber = []
                var hasil_split = df[10].split(",")
                for(var t = 0; t < data_x1.length; t++){tampung_sumber.push(hasil_split[0])}
                

                var lf = new dataForge.DataFrame({
                    columns: {
                        Nama_Data: tampung_nama_data,
                        Data_X: tampung_x,
                        Data_Y: tampung_y,
                        Nama_Produk: tampung_nama_produk,
                        Item: tampung_item,
                        Negara: tampung_negara,
                        Provinsi: tampung_provinsi,
                        Kota: tampung_kota,
                        Satuan: tampung_satuan,
                        Sumber: tampung_sumber,
                    },
                });

                tampung_sementara.push(lf)
                }

                var df0 = new dataForge.DataFrame({
                    columns: {
                        Nama_Data: [],
                        Data_X: [],
                        Data_Y: [],
                        Nama_Produk: [],
                        Item: [],
                        Negara: [],
                        Provinsi: [],
                        Kota: [],
                        Satuan: [],
                        Sumber: [],
                    },
                });


                var haha = df0.concat(tampung_sementara)
                var lala = haha.toCSV()

                fs.writeFile('databoks.csv', lala, function(err) {
                    if (err) throw err;
                     res.download('databoks.csv');
                  });
 
            } 
            
            catch (err) {
                console.error(err);
            }           
        }
      });  
});


module.exports = router;
