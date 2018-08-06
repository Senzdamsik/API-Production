var express = require('express');
var router = express.Router();
const json2csv = require('json2csv').parse;
const fs = require('fs');
var DataFrame = require('dataframe-js').DataFrame;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    var query = 'select a.id, b.nama as nama_data, a.data_x as data_x, a.data_y as data_y, ' +
                'c.nama as nama_produk, d.nama as nama_item, e.nama as nama_negara, ' +
                'f.nama as nama_provinsi, g.nama as nama_kota, a.satuan as satuan, ' +
                'a.sumber as sumber from data a left join nama_data b ' +
                'ON a.id_nama_data = b.id left join produk c ON a.id_produk=c.id left join item d ' +
                'ON a.id_item = d.id left join negara e ON a.id_negara = e.id left join provinsi f ' +
                'ON a.id_provinsi = f.id left join kota g ON a.id_kota = g.id WHERE a.id='
    // var query = 'SELECT id, id_nama_data, data_x, data_y from data WHERE id='

    connection.query(query+id, function (error, results, fields) {
    
		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  	}else{
            
            try {   
                df = Object.values(results[0])

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
                for(var t = 0; t < data_x1.length; t++){tampung_sumber.push(df[10])}


                const lf = new DataFrame({
                    column1: tampung_id, // <------ A column
                    column2: tampung_nama_data,
                    column3: tampung_x,
                    column4: tampung_y,
                    column5: tampung_nama_produk,
                    column6: tampung_item,
                    column7: tampung_negara,
                    column8: tampung_provinsi,
                    column9: tampung_kota,
                    column10: tampung_satuan,
                    column11: tampung_sumber

                }, ['Id', 'Nama Data', 'Data X', 'Data Y', 'Nama Produk', 'Item', 'Negara', 'Provinsi', 'Kota', 'satuan', 'Sumber']);

                // ff = lf.restructure(['No', 'Nama Data', 'Data x', 'Data y', 'Nama Produk'])

                lf.toCSV(true, 'databoks.csv');
                res.download('databoks.csv')
                
                


                // var fields = ["id", "id_nama_data", "data_x", "data_y"];
                // const opts = { fields };
                // const hasilcsv = json2csv(results, opts);
                // console.log(hasilcsv);
                
                // fs.writeFile('databoks.csv', hasilcsv, function(err) {
                //     res.download('databoks.csv')
                // }) 

            } 
            
            catch (err) {
                console.error(err);
            }       
        }
      });  
});

// console.log(results)

module.exports = router;










// try {            
//     const opts = {};
//     const hasilcsv = json2csv(results);
//     fs.writeFile('file.csv', hasilcsv, function(err) { 
//     })
//   } catch (err) {
//     console.error(err);
//   }
//   res.download('/home/fakhri/Downloads/file.csv');


// var fields = ["id", "id_nama_data", "data_x", "data_y"];
//             const opts = { fields };
//             const hasilcsv = json2csv(results, opts);
//             console.log(hasilcsv);
            
//             fs.writeFile('file.csv', hasilcsv, function(err) {
//               if (err) throw err;
//               console.log("file saved")})   
            
//               res.download('file.csv') 