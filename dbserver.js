var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";



(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		
		
	
		

		
		
		
		if (action === "/Register") {
			console.log("=================================================");
			console.log("[Register]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitPassword = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = "Name : " + splitName[1];
						var searchPW = "Password : " + splitPassword[1];
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("[Search = " + searchDB + " / " + searchPW + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("user").count({"Name" : splitName[1]}, function(err, count){
								console.log("We found "+ count +" results!");
								finalcount = count;
								if(finalcount > 0)
								{
									dbo.collection("user").find({"Name" : splitName[1]}).toArray(function(err,result){
									if(err) throw err;
									console.log(result);
									console.log("[User exist]");
									db.close();
									});
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("[User account inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			
		}
		
		
		else if (action === "/Login"){
			console.log("=================================================");
			console.log("[Login]");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitPassword = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = "Name : " + splitName[1];
						var searchPW = "Password : " + splitPassword[1];
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search = " + searchDB);
						console.log("search = " + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
							dbo.collection("user").count({"Name" : splitName[1], "Password" : splitPassword[1]}, function(err, count){
								console.log("We found "+ count +" results!");
								finalcount = count;
								if(finalcount > 0)
								{
									console.log("[Login Successful]");
									//var dbfind = dbo.collection("user").find({"Name":"babichoi95"});
									//console.log(dbfind);
									db.close();
									return res.end(msg);
									loginStatus = true;

								}
								else
								{
									if(err) throw err;
									console.log("[Login Fail] username and password wrong");
									db.close();
									return res.end("fail");
								}
							});
						});
					});
				});
				
			} 
			
	
		}
		else if (action === "/addToCart"){
			console.log("=================================================");
			console.log("[addToCart]");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitUser = splitMsg[0]
						var tempSplitTitle = splitMsg[1];
						var tempSplitDesc = splitMsg[2];
						var tempSplitOldPrice = splitMsg[3];
						var tempSplitNewPrice = splitMsg[4];
						var tempSplitAmount = splitMsg[5];
						
						var splitUser = tempSplitUser.split("=");
						var splitTitle = tempSplitTitle.split("=");
						var splitDesc = tempSplitDesc.split("=");
						var splitOldPrice = tempSplitOldPrice.split("=");
						var splitNewPrice = tempSplitNewPrice.split("=");
						var splitAmount = tempSplitAmount.split("=");
						
						var searchUser = "User : " + splitUser[1];
						var searchTitle = "Title : " + splitTitle[1];
						var searchDesc = "Desc : " + splitDesc[1];
						var searchOldPrice = "OldPrice : " + splitOldPrice[1];
						var searchNewPrice = "NewPrice : " + splitNewPrice[1];
						var searchAmount = "Amount : " + splitAmount[1];
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchUser);
						console.log(searchTitle);
						console.log(searchDesc);
						console.log(searchOldPrice);
						console.log(searchNewPrice);
						console.log(searchAmount);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
							dbo.collection("user-item").count({"Name" : splitUser[1], "Title" : splitTitle[1]}, function(err, count){
								console.log("We found "+ count +" results!");
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("[Add To Cart Failed] this item is already in the cart.");
									db.close();
									return res.end("fail");
									

								}
								else
								{
									dbo.collection("user-item").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("[Add To Cart Successful] " + splitUser[1] + " / " + splitTitle[1]);
										
										db.close();
										
									});
									return res.end(msg);

								}
							});
						});
					});
				});
				
			}
			
		}
		else if (action === "/setting")
		{
			console.log("=================================================");
			console.log("[Setting Page]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitPassword = splitMsg[1];
						var tempSplitEmail = splitMsg[2];
						var tempSplitPhone = splitMsg[3];
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var splitEmail = tempSplitEmail.split("=");
						var splitPhone = tempSplitPhone.split("=");
						var encodeEmail = decodeURI(splitEmail[1]);
						
						
						var searchDB = "Email : " + encodeEmail;
						
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("["+ searchDB + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json"
							
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							var finalcount;
									dbo.collection("user").count({"Name" : splitName[1]}, function(err, count){
								console.log(count);
								finalcount = count;
								if(finalcount > 0)
								{
									
									var myquery = {"Name" : splitName[1]};
									var newvalues = { $set: {"Password": splitPassword[1], "Email": splitEmail[1],"Phone": splitPhone[1] } };
									dbo.collection("user").updateOne(myquery,newvalues, function(err, res) {
										if (err) throw err;
										console.log("[Account Information updated]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
									

								}
								
							});
					});
				});
				
			
				});
			
				}
				else
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "setting.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/shopreadItems")
		{
			console.log("=================================================");
			console.log("[Shop Read Items]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						var searchDB = "Name : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									
									dbo.collection("items").find({}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read Data Successful]");
											console.log(result);
											db.close();
											var array = [];
											
											
											for (var i=0; i<result.length; i++)
											{
											
											
											array.push("</div><div class='col-lg-4 col-md-6 mb-4'><a href='/Item?ID="+result[i].ID+"'><div class='card h-100'><form id='"+result[i].Title+"_formID'><img class='card-img-top' src='img/Item/"+result[i].Img+"' ><div class='card-body'><h4 class='card-title'><label name='Title' id='"+result[i].Title+"_Title'>"+result[i].Title+"</label></h4><h5><label name='NewPrice' id='"+result[i].Title+"_NewPrice'>$"+result[i].NewPrice+"</label></h5><p class='card-text'>"+result[i].Desc+"</p></div></form></div></a></div><div style='display:none'>");
											 
											
											
											}
											;
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											
										}
																
								
								
							});
						});
					});
				});
				
			}else{
				//form = publicPath + "ajaxSignupForm.html";
				form = "shop.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
			
		}
		else if (action === "/Item")
		{
			console.log("=================================================");
			console.log("[Item Single Page]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						var searchDB = "ID : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									
									dbo.collection("items").find({"ID" : splitMsg[1]}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read Data Successful]");
											console.log(result);
											db.close();
											var array = [];
											
											
											for (var i=0; i<result.length; i++)
											{
											
											
											array.push(result[i].Title);
											array.push(result[i].ID);
											array.push(result[i].Img);
											array.push(result[i].Desc);
											array.push(result[i].NewPrice);
											array.push(result[i].Like);
	
											 
											
											
											}
											
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											
										}
																
								
								
							});
						});
					});
				});
				
			}
				
			
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Item.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if(action === "/readUserInfo")
		{
			console.log("=================================================");
			console.log("[read User Info]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						var searchDB = "Name : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									
									dbo.collection("user").find({"Name" : splitMsg[1]}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read Data Successful]");
											console.log(result);
											db.close();
											var array = [];
											
											
											for (var i=0; i<result.length; i++)
											{
											
											
											array.push(result[i].Name);
											array.push(result[i].Password);
											array.push(result[i].Email);
											array.push(result[i].Phone);
										
	
											 
											
											
											}
											
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											
										}
																
								
								
							});
						});
					});
				});
				
			}
				
		}
		else if (action === "/readItemUserReviews")
		{
			console.log("=================================================");
			console.log("[Read Item User Reviews]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						
						var searchDB = "ID : " +  splitMsg[1];;
						
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("["+ searchDB + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("item-reviews").find({"ID" : splitMsg[1]}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read User Info Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read User Info Data Successful]");
											
											db.close();
											var array = [];
											
											console.log(result.length);
											if(result.length != 0)
											{
											
											for (var i=0; i<result.length; i++)
											{
											
											array.push("</div><p>"+result[i].Text+"</p><small class='text-muted'>Posted by "+result[i].Name+" on "+result[i].Date+"</small><hr><div style='display:none'>");
											
											
											
											
	
											 
											
											
											}
											
											
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											}
											else
											{
												return res.end(array.toString());
											}
											
										}
																
								
								
							});
						});
					});
				});
				
			} 
			
		}
		else if (action === "/UserItemViews") 
		{
			console.log("=================================================");
			console.log("[User Item Views]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitID = splitMsg[0];
						var tempSplitName = splitMsg[1];
						var tempSplitText = splitMsg[2];
						var tempSplitDate = splitMsg[3];
						var splitID = tempSplitID.split("=");
						var splitName = tempSplitName.split("=");
						var splitText = tempSplitText.split("=");
						var splitDate = tempSplitDate.split("=");
						
						var searchDB = "ID : "+ splitID[1] + " Name : " + splitName[1] + " Text : " + splitText[1] + " Date : " + splitDate[1];
						
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchDB);
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json",
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
									dbo.collection("item-reviews").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("[User Item Views inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								
							
						});
					});
				});
				
			} 
			
		}
		else if (action === "/addfavoritelist")
		{
			console.log("=================================================");
			console.log("[Add Favorite List]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitID = splitMsg[1];
						var tempSplitTitle = splitMsg[2];
						var tempSplitPrice = splitMsg[3];
						var splitName = tempSplitName.split("=");
						var splitID = tempSplitID.split("=");
						var splitTitle = tempSplitTitle.split("=");
						var splitPrice = tempSplitPrice.split("=");
						
						
						//var searchDB = "ID : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						//console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									var finalcount;
									dbo.collection("user-favoritelist").count({"Name" : splitName[1], "ID" : splitID[1]}, function(err, count){
								
								finalcount = count;
								if(finalcount > 0)
								{
									
									var myquery = {"Name" : splitName[1],"ID": splitID[1]};
									dbo.collection("user-favoritelist").deleteOne(myquery, function(err, obj) {
										if (err) throw err;
										console.log("[User Favoritelist inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end("fail");
									

								}
								else
								{
									dbo.collection("user-favoritelist").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("[User Favoritelist inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			}
				
			
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "favoritelist.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}else if (action === "/addtocart")
		{
			console.log("=================================================");
			console.log("[Add Cart]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitID = splitMsg[1];
						var tempSplitTitle = splitMsg[2];
						var tempSplitPrice = splitMsg[3];
						var splitName = tempSplitName.split("=");
						var splitID = tempSplitID.split("=");
						var splitTitle = tempSplitTitle.split("=");
						var splitPrice = tempSplitPrice.split("=");
						
						
						//var searchDB = "ID : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						//console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									var finalcount;
									dbo.collection("user-cart").count({"Name" : splitName[1], "ID" : splitID[1]}, function(err, count){
								
								finalcount = count;
								if(finalcount > 0)
								{
									
									var myquery = {"Name" : splitName[1],"ID": splitID[1]};
									dbo.collection("user-cart").deleteOne(myquery, function(err, obj) {
										if (err) throw err;
										console.log("[Add Cart deleted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end("fail");
									

								}
								else
								{
									dbo.collection("user-cart").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("[Add Cart inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			}
				
			
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "cart.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/readfavoritelist")
		{
			console.log("=================================================");
			console.log("[Read Favorite List Page]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitID = splitMsg[1];

						var splitName = tempSplitName.split("=");
						var splitID = tempSplitID.split("=");

						
						
						//var searchDB = "ID : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						//console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									var finalcount;
									dbo.collection("user-favoritelist").count({"Name" : splitName[1], "ID" : splitID[1]}, function(err, count){
								console.log(count);
								finalcount = count;
								if(finalcount > 0)
								{
									
									db.close();
									return res.end(msg);
									

								}
								else
								{
									db.close();
									return res.end("fail");
								}
							});
						});
					});
				});
				
			}
				
			
			
		}
		else if (action === "/favoritelist")
		{
			console.log("=================================================");
			console.log("[Favorite List Page]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						
						var searchDB = "Name : " +  splitMsg[1];;
						
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("["+ searchDB + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("user-favoritelist").find({"Name" : splitMsg[1]}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read Favorite List Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read Favorite List Data Success]");
											
											db.close();
											var array = [];
											
											console.log(result.length);
											if(result.length != 0)
											{
											
											for (var i=0; i<result.length; i++)
											{
											
											array.push("</div><center><table border='0' height='20%'><tr><td width='20%'><a href='/Item?ID="+result[i].ID+"'><img src='img/Item/"+result[i].Img+"' width='180' height='150'></a></td><td width='3%'></td><td width='70%'><h4>"+result[i].Title+"</h4>$"+result[i].Price+".00<br><br>ItemNo:  "+result[i].ID+"</td><td width='7%'><a href='/removefavorite?Name="+result[i].Name+"&ID="+result[i].ID+"'><img src='img/remove.png' ></a></td></tr></table></center><hr><div style='display:none'> ");
											
											
											
											
	
											 
											
											
											}
											
											
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											}
											else
											{
												return res.end(array.toString());
											}
											
										}
																
								
								
							});
						});
					});
				});
				
			} else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "favoritelist.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if (action === "/cart")
		{
			console.log("=================================================");
			console.log("[Cart Page]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						
						var searchDB = "Name : " +  splitMsg[1];;
						
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("["+ searchDB + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("user-cart").find({"Name" : splitMsg[1]}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read Favorite List Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read Favorite List Data Success]");
											
											db.close();
											var array = [];
											
											console.log(result.length);
											if(result.length != 0)
											{
											
											array.push("</div><center><table border='0' width='100%' height='20%'><tr align='center'><td width='40%' colspam='2'>Item Name</td><td width='15%'>Unit Price</td><td width='20%'>Purchase Quantity</td><td width='15%'>Subtotal</td><td width='10%'>Operating</td></tr><tr><td colspan='5'><hr></td></tr><div style='display:none'> ");
											for (var i=0; i<result.length; i++)
											{
											
											
											
											array.push("</div><tr align='center'><td width='55%' colspam='2'><a href='/Item?ID="+result[i].ID+"'><img src='img/Item/"+result[i].Img+"' width='150' height='100'></a>"+result[i].Title+"</td><td width='10%'>$<label id='pricelbl"+result[i].ID+"'>"+result[i].Price+"</label></td><td width='15%'><input type='button' value='-' id='less_btn"+result[i].ID+"'><input size='3' type='input' value='1' min='1' id='quantity"+result[i].ID+"' style='text-align:center;'><input type='button' value='+' id='add_btn"+result[i].ID+"'></td><td width='15%' >$<label id='Subtotal"+result[i].ID+"'>"+result[i].Price+"</label></td><td width='10%'><a href='/removecart?Name="+result[i].Name+"&ID="+result[i].ID+"'><img src='img/remove.png' ></a></td></tr><tr><td colspan='5'><hr></td></tr><div style='display:none'> ");
											
											}
											
											array.push("</div><tr><td align='right' colspan='3'>Total : <label id='total'></label></td><td colspan='2' align='center'><a href='#' class='btn btn-primary' >Go To Checkout</a></td></tr><div style='display:none'>");
											array.push("</div></table></center><script></script>");
											
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											}
											else
											{
												return res.end(array.toString());
											}
											
										}
																
								
								
							});
						});
					});
				});
				
			} else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "cart.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if (action === "/removefavorite")
		{
			console.log("=================================================");
			console.log("[Remove Favorite ]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var splitName = splitMsg[0].split("=");
						var splitID = splitMsg[1].split("=");
						
						
						var searchDB = "Name : " + splitName[1];
						var searchID = "ID : "+ splitID[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchDB + searchID);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									
									var finalcount;
									dbo.collection("user-favoritelist").count({"Name" : splitName[1],"ID" : splitID[1]}, function(err, count){
								
								finalcount = count;
								if(finalcount > 0)
								{
									
									var myquery = {"Name" : splitName[1],"ID":splitID[1]}
									dbo.collection("user-favoritelist").deleteOne(myquery, function(err, obj) {
										if (err) throw err;
										console.log("[User Favoritelist Deleted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
									

								}
								else
								{	db.close();
									return res.end("fail");
								}
							});
						});
					});
				});
				
			}
				
			
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "removefavorite.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if (action === "/removecart")
		{
			console.log("=================================================");
			console.log("[Remove Cart ]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var splitName = splitMsg[0].split("=");
						var splitID = splitMsg[1].split("=");
						
						
						var searchDB = "Name : " + splitName[1];
						var searchID = "ID : "+ splitID[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log(searchDB + searchID);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									
									var finalcount;
									dbo.collection("user-cart").count({"Name" : splitName[1],"ID" : splitID[1]}, function(err, count){
								
								finalcount = count;
								if(finalcount > 0)
								{
									
									var myquery = {"Name" : splitName[1],"ID":splitID[1]}
									dbo.collection("user-cart").deleteOne(myquery, function(err, obj) {
										if (err) throw err;
										console.log("[User Cart Deleted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
									

								}
								else
								{	db.close();
									return res.end("fail");
								}
							});
						});
					});
				});
				
			}
				
			
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "removecart.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
				console.log("=================================================");
				console.log("[Index page]");
				
				if(loginStatus)
				{
					
					sendFileContent(res, "index.html", "text/html");
				}
				else
				{
					sendFileContent(res, "index.html", "text/html");
				}
			}
			else if (req.url === "/Signuppage")
			{
				
				sendFileContent(res, "signup2.html", "text/html");
			}
			else if (req.url === "/Loginpage")
			{
				
				sendFileContent(res, "signin.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				console.log("=================================================");
				console.log("[Logout page]");
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "logout.html", "text/html");
			}
			else if (req.url === "/shop")
			{
				console.log("=================================================");
				console.log("[Shop page]");
				sendFileContent(res, "shop.html", "text/html");
			}
      else if (req.url === "/cart")
			{
				sendFileContent(res, "cart.html", "text/html");
			}
      else if (req.url === "/socialnetwork")
			{
				sendFileContent(res, "text_socialnetwork.html", "text/html");
			}
      else if (req.url === "/favlistpage")
			{
				sendFileContent(res, "favouritelistpage.html", "text/html");
			}else if (req.url === "/abuse")
			{
				sendFileContent(res, "article4.html", "text/html");
			}else if (req.url === "/manage")
			{
				sendFileContent(res, "article3.html", "text/html");
			}else if (req.url === "/use")
			{
				sendFileContent(res, "article2.html", "text/html");
			}else if (req.url === "/food")
			{
				sendFileContent(res, "article1.html", "text/html");
			}
			else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}else if(/^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}
			else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		}
	});

	server.listen(4242);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);