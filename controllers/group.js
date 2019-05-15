module.exports = function(app, db){

	return{

		create: async function(req, res){
		 	try{
		 		
		 		let user = req.user;
		 		let name = req.body.name;
		 		
		 		let queryBuilder = {
		 			where: {
		 				name: { $eq: name }
		 			}
		 		}
		 		let group = await db.User.findOne(queryBuilder);

		 		if (!group) {

					let name = req.body.name;
			 		
			
			 		let data = {
			 			name
			 		};

			 		group = await db.Group.create(data);

			 		return res.json({message: "Grupo creado"})
		 		} else {
		 			return res.status(400).json({message: "El grupo ya existe"})
		 		}
		 	}
		 	catch(err){
		 		console.log( err );
				return res.status(400).json({message: "Something went wrong"});
		 	}
		},

		add: async function(req, res){
			try{

				let user = req.user;
				
				// rolId student = 3, techer = 2,admin = 1
				if(user.rolId == 3) return res.status(400).json({message: "Permission denied"});

				let add = req.body.groupId;

				await user.update({
					groupId: add
				})

				return res.json({message: "group has been edited"});

			}

			catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		//editar informacion de usuario
		edit: async function(req, res){
			try{

				let user = req.user;
				
				// rolId student = 3, techer = 2,admin = 1
				if(user.rolId == 3) return res.status(400).json({message: "Permission denied"});

				let username = req.body.username;
				let name = req.body.name;
				let email = req.body.email;
				let number = req.body.number;



				await user.update({
					name: name,
					username: username,
					email: email,
					number:number
				})

				return res.json({message: "user has been edited"});

			}

			catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		}
}
}