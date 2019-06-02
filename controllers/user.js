module.exports = function(express, db){
	return {
		getAll: async function (req, res) {
			try{
				let queryBuilder = {
					include: [{
						model: db.Group,
						required: true
					}],
					where: {
						rolId: { $eq: 3 }// de estudiante
					}
				};
				let students = await db.User.findAll(queryBuilder);

				return res.json(students)
			} catch(err) {
				
			}
		}
	}
}
