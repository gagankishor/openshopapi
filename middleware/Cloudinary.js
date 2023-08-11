const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'ds0d5t7iy', 
  api_key: '799238868729833', 
  api_secret: 'EOpVU2T645loiVXwTj96O1E9J6Y' 
});


cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });