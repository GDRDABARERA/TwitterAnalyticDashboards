
/*************************************************************************************************************
*  Common WordCloud
***************************************************************************************************************/
 var dasIp="52.77.25.83";
 var stopWords ="(data|miss|wsocon |hi| rosemin |hashtag|get|put|ROSEMIN)";
 var textData="";
 var authenticateString = window.btoa("admin:user@con2016");
 //"10.100.4.185"; //"52.77.25.83";


function drawWordCloud( cloudDiv ){



   // var tableName= Cname+"WORDCLOUD";
    var j=1;var i;

//var stopWords ="(trump|donaldtrump|realdonaldtrump|cruzcrew|feelthebern|sanders|voteTrump|clinton|cruz|tedcruz|bernie|berniesanders|makeamericagreatagain|trumptrain|donald)";
   var stopWords ="(data|miss|wsocon | hi|hashtag|rosemin |ROSEMIN|node|today|day|one|see|come|go|now)";

        getDataCloud( cloudDiv );





}




function updateText( new_text, stopWords, cloudDiv){
        var cloudDivID ="#"+cloudDiv;
            var width = $(cloudDivID).width();
           // var widthDid = $("news").width();
            var height = $(cloudDivID).height();
            //console.log(width);
                var text={
                                  "width":width,
                                  "height": height,
                                  "padding": {"top":0, "bottom":0, "left":0, "right":0},

                                  "data": [
                                    {
                                      "name": "table",
                                      "values": [ new_text
                                          ],

                                      "transform": [
                                        {
                                          "type": "countpattern",
                                          "field": "data",
                                          "case": "upper",
                                          "pattern": "[\\w']{3,}",
                                          "stopwords": stopWords
                                        },
                                        {
                                          "type": "formula", "field": "angle",
                                          "expr": "[-45, 0, 45][~~(random() * 3)]"
                                        },
                                        {
                                          "type": "formula", "field": "weight",
                                          "expr": "if(datum.text=='VEGA', 600, 300)"
                                        },
                                        {
                                          "type": "wordcloud",
                                          "size": [width, height],
                                          "text": {"field": "text"},
                                          "rotate": {"field": "angle"},
                                          "font": {"value": "Verdana"},
                                          "fontSize": {"field": "count"},
                                          "fontWeight": {"field": "weight"},
                                          "fontScale": [30,70]
                                        }
                                      ]
                                    }
                                  ],

                                  "scales": [
                                    {
                                      "name": "color",
                                      "type": "ordinal",
                                      "range":["#b71c1c","#ef6c00","#000000"]
                                    }
                                  ],

                                  "marks": [
                                    {
                                      "type": "text",
                                      "from": {"data": "table"},
                                      "properties": {
                                        "enter": {
                                          "x": {"field": "layout_x"},
                                          "y": {"field": "layout_y"},
                                          "angle": {"field": "layout_rotate"},
                                          "font": {"field": "layout_font"},
                                          "fontSize": {"field": "layout_fontSize"},
                                          "fontStyle": {"field": "layout_fontStyle"},
                                          "fontWeight": {"field": "layout_fontWeight"},
                                          "text": {"field": "text"},
                                          "align": {"value": "center"},
                                          "baseline": {"value": "alphabetic"},
                                          "fill": {"scale": "color", "field": "text"}
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


            return text;

}

function getDataCloud(cloudDiv){
     var cloudDivID="#"+cloudDiv;
        var newTestString=" ";
               $.ajax({

                               url:  "https://52.77.25.83:9446/analytics/search_count",
                                beforeSend: function (xhr) {
                                       xhr.setRequestHeader("Authorization", "Basic "+ authenticateString);
                                 },
                                 method: "POST",

                                contentType: "application/json",
                                data:"{\"tableName\":\"PROCESSWSO2CONCLOUD\"}",
                                success: function (data) {
                                   // console.log(data);
                                    var N= data;
                                    var tStart=0;
                                   var tcount=1;
                                    if(N-10<10){
                                        tcount=N;
                                        tStart=0;

                                    }else{
                                        tcount=10;
                                        tStart=N-10;
                                    }
                                    console.log(N);

                                        $.ajax({

                                                          url:  "https://52.77.25.83:9446/analytics/search",
                                                           beforeSend: function (xhr) {
                                                                  xhr.setRequestHeader("Authorization", "Basic "+ authenticateString);
                                                            },
                                                            method: "POST",

                                                           contentType: "application/json",
                                                           data:"{\"tableName\":\"PROCESSWSO2CONCLOUD\", \"query\":\"*:*\", \"start\":"+tStart+", \"count\":"+tcount+"}",
                                                           success: function (TextData) {
                                                                var n=TextData.length;
                                                           // console.log(TextData.length);
                                                           // console.log(TextData);
                                                                for(var i=0;i<n;i++){

                                                                    newTestString+=" "+TextData[i].values.processText;

                                                                }
                                                               // console.log(newTestString);

                                                                new_cloud =updateText(newTestString, stopWords,cloudDiv);
                                                                 var viewUpdateFunction = (function(chart) {
                                                               	        this.view = chart({el:cloudDivID}).update();
                                                                 }).bind(this);
                                                                 vg.parse.spec(new_cloud, viewUpdateFunction);


                                                           }

                                               });


                                    }





          });
}


