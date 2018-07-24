var express = require('express');
var router = express.Router();
// let url ="http://localhost:3000/download/";
// let url ="http://192.168.100.5:3000/download/";
let url ="http://192.168.88.135:3000/download/";
/* GET users listing. */
router.get('/', function(req, res, next) {
	// connection.query('SELECT * from users', function (error, results, fields) {
	connection.query('SELECT id, id_nama_data, data_x, data_y from data limit 100', function (error, results, fields) {

		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
			//   res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            const arr = [];
            let num = 0 ;
			// console.log(results[0].id);
            for (data in results){
                arr[num] = url + results[num].id;
                num ++;
            }
            // console.log(arr);
            res.send(JSON.stringify({"status": 200, "error": null, "response": arr}));
			  //If there is no error, all is good and response is 200OK.
			//   console.log(results)
	  	}
  	});
});

module.exports = router;
