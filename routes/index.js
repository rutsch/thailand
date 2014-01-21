
/*
 * GET home page.
 */
var fs = require('fs');

exports.index = function(req, res){
	var data = [],
	dir = './public/images';
	//get list of all folders
	var folders = getFolders(dir);
	//get all image names per folder
	for(var i=0;i<folders.length;i++){
		var obj = {};
		obj.foldername = folders[i].replace(dir+ '/', '');
		obj.images = getFiles(folders[i]);
		data.push(obj);
	}
	//render view
	console.log(data);
	res.render('index', { title: 'Thailand 2014', data: data });
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
        	img.text = getText('./public/texts/'+files[i].replace('.jpg', '.txt'));
            output.push(img);
        }
    }
    return output;
}
function getText(file){
	console.log(file);
	var text=null;
	try{
		text = fs.readFileSync(file);
		return text;
	}
	catch(err){
		return '';
	}
	
	console.log(text);
}