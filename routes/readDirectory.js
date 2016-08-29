//Import file system functionality
var MapArr = [];
var fs = require('fs');

exports.readDirectory = function(req,res) {
	var fileCount =0;
	// creating a list of unnecessary keywords
	var excludeChar = ['is','and','the','have','that','will','but','any','for','to','of','has','a','with','by','are','as','per','some','of',
						'can','we','than','or','in','an','all','who','what','on','our','too','know','much','given','cannot','which','some'];
	var folderName= './prescriptions';
	if (folderName == undefined) {
		console.log("Please specify a folder");
		return;
	}

	var fileDataArr = [];
	var dataMap = {};
	fs.readdir(folderName, function(err, data){
		if (err) {
			throw err; 
		}

		for(var i=0; i<data.length; i++){
			if(data[i].indexOf('.txt')!==-1 || data[i].indexOf('.pdf')!==-1)
				fileCount++;
		}

		data.forEach(function(file){ 
			fs.readFile(folderName + "/" + file, 'utf8', function(err, filedata){ //read each file in array
				if (err) {
				throw err;
				} 
				// checking file extension
				if(file.indexOf('.txt')!==-1 || file.indexOf('.pdf')!==-1){
					fileCount--;
					var testingVariable = filedata.split(" ");
					
					for(var j=0; j<testingVariable.length;j++){

						var flag = 0;
						// if the keyword is in exclude list
						for(var k=0; k<excludeChar.length; k++){
							if(testingVariable[j] == excludeChar[k])
								flag=1;
						}
						// if already exist in mapArr, increase its count
						for(var i=0;i<MapArr.length;i++){
							if(MapArr[i].text === testingVariable[j]){
								flag =1;
								MapArr[i].size = MapArr[i].size+1;
							}
						}
						// if not exist, add it in mapArr
						if(flag === 0)
						{
							MapArr.push({text: testingVariable[j], size: 1});
						}
					}
					// will write mapArr when all entire directory files are read
					if(fileCount==0){
						fs.writeFile("./public/d3WordCloud/scrape_data.js","var scrapeData = "+JSON.stringify(MapArr));
						console.log("readDirectory end");
						res.render('wordCloud');
					}
				}
			});
		});
	});
};
