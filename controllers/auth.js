const bcrypt = require("bcrypt");

module.exports = function(app, db){

	return{
		login: async function (req, res) {
			try{

				 let user = req.user;
				 
				 let pass = await bcrypt.compare(req.body.password, user.password);

				 console.log(pass, !pass);

				 if(!pass){

				 		return res.status(404).json({message: "Contraseñas no coinciden"});

				 }

				 return res.status(200).json({message: "Contraseñas validas"});
				
						}

			catch(err){

			}
		},

		register: async function(req, res){
		 	try{
		 		
		 		let username = req.body.username;
		 		
		 		let queryBuilder = {
		 			where: {
		 				username: { $eq: username }
		 			}
		 		}
		 		let user = await db.User.findOne(queryBuilder);

		 		if (!user) {
		 			let email = req.body.email;
			 		let name = req.body.name;
			 		let number = req.body.number;

			 		let password = req.body.password
			 		let verifyPassword = req.body.verifyPassword

			 		if ( password != verifyPassword) {
			 			return res.status(400).json({message: "Las contraseñas no coninciden "})
			 		};

			 		password = await bcrypt.hash( req.body.password, 10);

			 		let data = {
			 			email,
			 			username,
			 			token: new Buffer.from(password).toString('Base64'),
			 			name,
			 			number,
			 			password,
			 			rolId: 3
			 		};

			 		user = await db.User.create(data);

			 		return res.json({message: "Usuario creado"})
		 		} else {
		 			return res.status(400).json({message: "El usuario ya existe"})
		 		}
		 	}
		 	catch(err){
		 		console.log( err );
				return res.status(400).json({message: "Something went wrong"});
		 	}
		},

		recover: async function(req, res){

				

		}
	}

}

