
'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const funcionarioRoutes = require('./api/funcionarioRoutes');
const pontoRoutes = require('./api/pontoRoutes');
class Server{

	constructor(){
		this.port = 3000;
		this.app = express();
	}

	appConfig(){
		this.app.use(bodyParser.json());
		this.app.use(cors());
		this.app.use(express.static(__dirname + 'public'));
	}

	
	includeRoutes(){
		new funcionarioRoutes(this.app).routesConfig();
		new pontoRoutes(this.app).routesConfig();
    
    this.app.get('/', function(request, response) {
     response.send('Hello World!');
    });
	}
		

	appExecute(){
		this.appConfig();
		this.includeRoutes();
		this.app.listen(process.env.PORT || this.port, () => {
 			console.log('nodejs aqui http://localhost:3000');
  		});
	}
}

const app = new Server();
app.appExecute();
