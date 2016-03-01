	var ajaxLatest = function(){

        $.ajax({
            url: "js/LatestTweetserver.jag",
            dataType: "json",
            type: "POST",
            success: function(data){
                var table = $("#nt-latest");
		      table.html(data);//***************************************
                colorMyTweet();
            },
	    error: function(e){
		//alert("Error" + e);
	   }
        });

    };
    var text;
 var ajaxGarphBar= function(ur,name){
var Candidates = { Choose : name};
        $.ajax({
            url: ur,
            dataType: "json",
            contentType:'application/json',
            data: JSON.stringify(Candidates),
            type: "POST",
            success: function(data){
                if(data){
               //alert(JSON.stringify(data));
             text =  {
                       "width": 270,
                       "height": 150,
                       "padding": {"top": 10, "left": 50, "bottom": 120, "right": 80},
                       "data": [
 			{
			     "name": "table",
			     "values":JSON.stringify(data)

			   },
                         {
                           "name": "stats",
                           "source": "table",
                           "transform": [
                             {
                               "type": "aggregate",
                               "groupby": ["x"],
                               "summarize": [{"field": "y", "ops": ["sum"]}]
                             }
                           ]
                         }
                       ],
                       "scales": [
                         {
                           "name": "x",
                           "type": "ordinal",
                           "range": "width",
                           "domain": {"data": "table", "field": "x"}
                         },
                         {
                           "name": "y",
                           "type": "linear",
                           "range": "height",
                           "nice": true,
                           "domain": {"data": "stats", "field": "sum_y"}
                         },
                         {
                           "name": "color",
                           "type": "ordinal",
                           "range": "category10",
                           "domain": {"data": "table", "field": "c"}
                         }
                       ],
                         "axes": [
				{
				     "type": "x",
				     "scale": "x",
				     "title": "Fields",
				     "properties": {
				       "ticks": {
					 "stroke": {"value": "steelblue"}
				       },
				       "majorTicks": {
					 "strokeWidth": {"value": 2}
				       },
				       "labels": {
					 "fill": {"value": "steelblue"},
					 "angle": {"value": 50},
					 "fontSize": {"value": 10},
					 "align": {"value": "left"},
					 "baseline": {"value": "middle"},
					 "dx": {"value": 3}
				       },
				       "axis": {
					 "stroke": {"value": "#333"},
					 "strokeWidth": {"value": 1.5}
				       }
				     }
				   },
				    {"type": "y",
				     "scale": "y",
				     "title": "Rate",
				     "properties": {

				       "labels": {
					 "fill": {"value": "steelblue"},
					 "angle": {"value": 0},
					 "fontSize": {"value": 10},
					 "align": {"value": "left"},
					 "baseline": {"value": "middle"},
					 "dx": {"value": -15}
				       }

				     }
				   }
				  ],
                       "marks": [
                         {
                           "type": "rect",
                           "from": {
                             "data": "table",
                             "transform": [
                               {"type": "stack", "groupby": ["x"], "sortby": ["c"], "field": "y"}
                             ]
                           },
                           "properties": {
                             "enter": {
                               "x": {"scale": "x", "field": "x"},
                               "width": {"scale": "x", "band": true, "offset": -1},
                               "y": {"scale": "y", "field": "layout_start"},
                               "y2": {"scale": "y", "field": "layout_end"},
                               "fill": {"scale": "color", "field": "c"}
                             },
                             "update": {
                               "fillOpacity": {"value": 1}
                             },
                             "hover": {
                               "fillOpacity": {"value": 0.5}
                             }
                           }
                         }
                       ]
                     };
                     };

        var viewUpdateFunction = (function(chart) {
        this.view = chart({el:"#GrpBar"}).update();

        }).bind(this);

        //alert(text);
        vg.parse.spec(text, viewUpdateFunction);
        //alert("ASSS");
            },
        error: function(er){
       // alert("Error Graph Sentiment" + er);
       }
        });
    };
    	var Follow = function(){

        $.ajax({
            url: "js/TweetFollowServer.jag",
            dataType: "json",
            type: "POST",
            success: function(data){
            	//alert("Follow "+data);
                var table = $("#nt-Follow");
		      table.html(data);//***************************************

            },
	    error: function(e){
		//alert("Error" + e);
	   }
        });

    };
        	var Hashtag = function(){

        $.ajax({
            url: "js/TweetHtagServer.jag",
            dataType: "json",
            type: "POST",
            success: function(data){
            	//alert("HTag "+data);
                var table = $("#nt-Hashtag");

		      table.html(data);//***************************************

            },
	    error: function(e){
	//	alert("Error" + e);
	   }
        });

    };

var i;
var HTag = function(ur,na){
       var Candidates = { Choose : na};
        $.ajax({
            url: ur,
            dataType: "json",
            contentType:'application/json',
            data: JSON.stringify(Candidates),
            type: "POST",
            success: function(data){
                var table = $("#TagList");
                if(data){
		//alert(JSON.stringify(data));

                    	var str = JSON.stringify(data[0]);
                    	var res1 = str.split("\"");
                    //	alert(res1[1]);
							var res = res1[1].split(" ");
							var tagList="";
							for (i = 0; i < res.length; i++) {
								tagList=tagList+" <span>"+"#"+res[i]+" "+"</span> ";

							}
							table.html(tagList);

                }
            },
	    error: function(e){
		alert("Error" + e);
	   }
        });
    };
var Mention = function(ur,na){
       var Candidates = { Choose : na};
        $.ajax({
            url: ur,
            dataType: "json",
            contentType:'application/json',
            data: JSON.stringify(Candidates),
            type: "POST",
            success: function(data){
                var table = $("#Mension");
                if(data){
                    	var str = JSON.stringify(data[0]);
                    	var res1 = str.split("\"");
							var res = res1[1].split(" ");
							var tagList="";
							for (i = 0; i < res.length; i++) {
								tagList=tagList+" <span>"+"@"+res[i]+" "+"</span> ";

							}
							table.html(tagList);
                }
            },
	    error: function(e){
	        console.log(e);
	    }
        });
    };


    function colorMyTweet(){

        $('.twitter-text').html(function(i, h) {
          var reg = /(@|#)\w+/g,
              classes = {
                '#' : 'hash',
                '@' : 'user'
              },
              hashOrUser;
          return h.replace(reg, function(match) {
            hashOrUser = /^[@#]/.test(match);
            return hashOrUser ? '<a >' + match + '</a>' : match
          });
        });

    }
