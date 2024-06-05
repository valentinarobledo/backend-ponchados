module.exports = function(app, db){
	return{
	
		destination: function(req,file,cb){

		cb(null, 'public/uploads/')

		},

		filename: function(req,file,cb){

		cb(null, Date.now() + path.extname(file.originalname)); 
		},

		 fileFilter: function (req, file, cb) {

		 if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
		 return cb(new Error('Error in file type'));
		 }

		 cb(null, true);
		 }
		 

	}
}