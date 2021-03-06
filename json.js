var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    // var datax = req.body.data;
    // var filterx = req.body.filters

    var datax = req.query.data;
    var filterx = req.query.filters

    if (filterx){

        var filter_pecah  = filterx.split("|")
        var filter_jumlah = filter_pecah.length

        var filter_kiri = []
        var filter_kanan = []

        for(var i = 0; i < filter_jumlah; i++){
        var filter_pecahx = filter_pecah[i].split(":")
            filter_kiri.push(filter_pecahx[0])
            filter_kanan.push(filter_pecahx[1].split("-").join(" "))
        }

        var nama_data2 = datax;
        var nama_data3 = nama_data2.split("-").join(" ")
        var nama_data4 = String("'"+nama_data3+"'")

        if(filter_jumlah == 1){
            kondisi = String(filter_kiri[0])+' = '+"'"+String(filter_kanan[0])+"'"
            // " or " +String(filter_kiri[0])+' = '+"'"+String(filter_kanan[0])+"'"

        } else if(filter_jumlah == 2){
            kondisi = String(filter_kiri[0])+' = '+"'"+String(filter_kanan[0])+"'"
            +" and "+String(filter_kiri[1])+' = '+"'"+String(filter_kanan[1])+"'"
        }


        connection.query('select id, Nama_Data, Waktu, Nilai, Nama_Produk, Item, Negara, Provinsi, ' +
        'Kota, Satuan, Sumber from (select a.id as id, b.nama as Nama_Data, a.data_x as Waktu, a.data_y as Nilai, ' +
        'c.nama as Nama_Produk, d.nama as Item, e.nama as Negara, ' +
        'f.nama as Provinsi, g.nama as Kota, a.satuan as Satuan, ' +
        'a.sumber as Sumber from data a left join nama_data b ' +
        'ON a.id_nama_data = b.id left join produk c ON a.id_produk=c.id left join item d ' +
        'ON a.id_item = d.id left join negara e ON a.id_negara = e.id left join provinsi f ' +
        'ON a.id_provinsi = f.id left join kota g ON a.id_kota = g.id WHERE b.nama_kelompok = '+String(nama_data4)+') as seluruh ' + 
        'where '+kondisi
         , function (error, results, fields) {

            if(error){
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
            }else{
                
                try {
                    var tampung_sementara = []
                    var kumpulanx = []
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
                        
                        
                        kumpulan = {}
                        for (var v = 0; v < tampung_nama_data.length; v++){
                        kumpulan["Nama Data"] = tampung_nama_data[v]
                        kumpulan["Nama Produk"] = tampung_nama_produk[v]
                        kumpulan["Item"] = tampung_item[v]
                        kumpulan["Negara"] = tampung_negara[v]
                        kumpulan["Provinsi"] = tampung_provinsi[v]
                        kumpulan["Kota"] = tampung_kota[v]
                        kumpulan["Satuan"] = tampung_satuan[v]
                        kumpulan["Sumber"] = tampung_sumber[v]
                        kumpulan["Waktu"] = tampung_x[v]
                        kumpulan["Nilai"] = tampung_y[v]
                        kumpulanx.push(kumpulan)
                        kumpulan = {}
                        }
                    }
                }   
                catch (err) {
                    console.error(err);
                }           
            }
        });  
    }

    else{
        var nama_data2 = datax;
        var nama_data3 = nama_data2.split("-").join(" ")
        var nama_data4 = String("'"+nama_data3+"'")

        connection.query('select id, Nama_Data, Waktu, Nilai, Nama_Produk, Item, Negara, Provinsi, ' +
        'Kota, Satuan, Sumber from (select a.id as id, b.nama as Nama_Data, a.data_x as Waktu, a.data_y as Nilai, ' +
        'c.nama as Nama_Produk, d.nama as Item, e.nama as Negara, ' +
        'f.nama as Provinsi, g.nama as Kota, a.satuan as Satuan, ' +
        'a.sumber as Sumber from data a left join nama_data b ' +
        'ON a.id_nama_data = b.id left join produk c ON a.id_produk=c.id left join item d ' +
        'ON a.id_item = d.id left join negara e ON a.id_negara = e.id left join provinsi f ' +
        'ON a.id_provinsi = f.id left join kota g ON a.id_kota = g.id WHERE b.nama_kelompok = '+String(nama_data4)+') as seluruh ' 
         , function (error, results, fields) {

            if(error){
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
            }else{
                
                try {
                    var tampung_sementara = []
                    var kumpulanx = []
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

                        kumpulan = {}
                        for (var v = 0; v < tampung_nama_data.length; v++){
                        kumpulan["Nama Data"] = tampung_nama_data[v]
                        kumpulan["Nama Produk"] = tampung_nama_produk[v]
                        kumpulan["Item"] = tampung_item[v]
                        kumpulan["Negara"] = tampung_negara[v]
                        kumpulan["Provinsi"] = tampung_provinsi[v]
                        kumpulan["Kota"] = tampung_kota[v]
                        kumpulan["Satuan"] = tampung_satuan[v]
                        kumpulan["Sumber"] = tampung_sumber[v]
                        kumpulan["Waktu"] = tampung_x[v]
                        kumpulan["Nilai"] = tampung_y[v]
                        kumpulanx.push(kumpulan)
                        kumpulan = {}
                        }
                    }
                    
                res.send(JSON.stringify({"Result": kumpulanx}));
                } 
                catch (err) {
                    console.error(err);
                }           
            }
        });
    }     
});
module.exports = router;