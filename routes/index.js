
/*
 * GET home page.
 */
var http = require("http");
var Client=require("node-rest-client").Client;
var options = {
		host: 'grailsgumballmachinev2.cfapps.io',
		path: '/gumballs/1',
        method: 'GET'

};
var i=0;
var info;
//var data;
exports.getIndex = function(req, res){

	
var client=new Client();
	client.get("http://grailsgumballmachinev2.cfapps.io/gumballs/1",function(info,response){
		console.log(info);
//		info;
		var info1;
		if(info.countGumballs>0)
		{
				 info1=
				
				{
						id:info.id,
						countGumballs:info.countGumballs,
						modelNumber:info.modelNumber,
						serialNumber:info.serialNumber,
						state: "NoCoinState"
				};
			
		}
		else
		{
			 info1=
					
				{
						id:info.id,
						countGumballs:info.countGumballs,
						modelNumber:info.modelNumber,
						serialNumber:info.serialNumber,
						state: "NoGumballState"
				};
		
			
		}
	
		res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
	});
};




exports.getInsert=function(req,res)
{
	
		var client=new Client();	
		var state=req.param('state');	
		console.log("Insert"+state);

		
		client.get("http://grailsgumballmachinev2.cfapps.io/gumballs/1",function(info,response){
						
						var info1=
							
						{
								id:info.id,
								countGumballs:info.countGumballs,
								modelNumber:info.modelNumber,
								serialNumber:info.serialNumber,
								state: "HasCoinState"
						};
						
			
					res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
		});
};


exports.getTurn=function(req,res)
{

	var client=new Client();	
	var state=req.param('state');
		
		if(state=="NoCoinState" || state=="InsertCoinFirstState" || state=="YourGumballIsHere")	
		{
			client.get("http://grailsgumballmachinev2.cfapps.io/gumballs/1",function(info,response){
				
				var info1=
					
				{
						id:info.id,
						countGumballs:info.countGumballs,
						modelNumber:info.modelNumber,
						serialNumber:info.serialNumber,
						state: "InsertCoinFirstState"
				}
				
	
			res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
				});
			
			
		}
		else
		{
				

			client.get("http://grailsgumballmachinev2.cfapps.io/gumballs/1",function(info,response){
							
							
				if(info.countGumballs>0)
				{
					var count=info.countGumballs-1;
					var args={  
							data:{ countGumballs:count,},
							headers:{"Content-Type":"application/json"}
							
						};
				
					

					client.put("http://grailsgumballmachinev2.cfapps.io/gumballs/1",args,function(info,response){
						console.log(info);
				
					});					
			
					
					
					client.get("http://grailsgumballmachinev2.cfapps.io/gumballs/1",function(info,response){
						var info1=
							
						{
								id:info.id,
								countGumballs:info.countGumballs,
								modelNumber:info.modelNumber,
								serialNumber:info.serialNumber,
								state: "YourGumballIsHere"
						};
						
			
							res.render('home',{page_title:"Edit Customers - Node.js",data:info1});

					
					
					});
					
					
						
					
					
				}
				else
				
				{
					
					
						var info1=
							
						{
								id:info.id,
								countGumballs:info.countGumballs,
								modelNumber:info.modelNumber,
								serialNumber:info.serialNumber,
								state: "NoGumballState"
						};
						
			
							res.render('home',{page_title:"Edit Customers - Node.js",data:info1});

					
				}
						});
			
		}	
};