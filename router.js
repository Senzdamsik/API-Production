var express = require('express');
var router = express.Router();
const json2csv = require('json2csv').parse;
const fs = require('fs');
var DataFrame = require('dataframe-js').DataFrame;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
	// connection.query('SELECT id, id_nama_data, data_x, data_y from data WHERE id='+id, function (error, results, fields) {
    connection.query('SELECT id, id_nama_data, data_x, data_y from data WHERE id='+id, function (error, results, fields) {
    
		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	}else{
            
            try {   
                df = Object.values(results[0])

                data_x1 = df[2].split(",")

                var tampung_x = []
                for(var i = 0; i < data_x1.length; i++){tampung_x.push(data_x1[i])}
                // console.log(tampung_x)
                
                data_y1 = df[3].split(",")

                var tampung_y = []
                for(var j = 0; j < data_y1.length; j++){tampung_y.push(data_y1[j])}
                // console.log(tampung_y)

                var tampung_id = []
                for(var k = 0; k < data_x1.length; k++){tampung_id.push(df[0])}

                var tampung_id_nama_data = []
                for(var l = 0; l < data_x1.length; l++){tampung_id_nama_data.push(df[1])}

                const lf = new DataFrame({
                    column1: tampung_x, // <------ A column
                    column2: tampung_y,
                    column3: tampung_id,
                    column4: tampung_id_nama_data
                }, ['data_x', 'data_y', 'No', 'id_nama_data']);

                ff = lf.restructure(['No', 'id_nama_data', 'data_x', 'data_y'])

                // ff.show()

                ff.toCSV(true, 'databoks.csv');
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