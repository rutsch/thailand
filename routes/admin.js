var fs = require('fs');

exports.index = function(req, res){
	var data = [],
	dir = './public/uploads';
	//get list of all uploaded images
	var files = getFiles(dir);

	//render view
	console.log(data);
	res.render('admin', { title: 'Thailand 2014', files: files });
};
exports.uploadform = function(req, res){
	res.render('upload', { });
};

exports.uploadimage = function(req, res){
	console.log(req.files);
	var files = [];
	if (req.files.image instanceof Array){
		files = req.files.image
	}else{
		files.push(req.files.image);
	}
	console.log(files);
	for(var i=0;i<files.length;i++){
		var data = fs.readFileSync(files[i].path);
		var imageName = files[i].name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {	
			var newPath = "./public/uploads/" + imageName;
			var result = fs.writeFileSync(newPath, data);
		}
	}
	res.redirect("/admin");

};
exports.showimage = function(req, res){
	//show the form to publish the image
	var file = "/uploads/" + req.params.id;
	var folders = getFolders('./public/images');
	console.log(folders);
	res.render('publish', { file: file, folders: folders });
};
exports.publishimage = function(req, res){
	console.log(req.body);
	var filepath = './public' + req.body.filename;
	var filename = req.body.filename.replace('/uploads', '').toLowerCase();
	var description = req.body.image_desc;
	var targetFolder = req.body.targetfolder;
	fs.writeFile('./public/texts'+filename.replace('.jpg', '.txt'), description, function(){
		
	});

	fs.rename(filepath, targetFolder+filename, function(){
		res.redirect("/admin");
	});
	
};


function getFolders(dir){
    var files = fs.readdirSync(dir);
    var folders = [];
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
        	folders.push(name);
            //getFiles(name);
        }else{
            console.log(name)
        }
    }
    return folders;
}

function getFiles(dir){
    var files = fs.readdirSync(dir);
    var output = [];
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            //getFiles(name);
        }else{
        	var img={};
        	img.src = name.replace('./public', '');
        	img.name=files[i];
            output.push(img);
        }
    }
    return output;
}