
/*************************************************************************************************************
*  Common WordCloud
***************************************************************************************************************/
 var dasIp="52.77.25.83";
 var stopWords ="(trump|donaldtrump|realdonaldtrump|via|wow|10|b4|gt|get|gets|come|go|ben|carson|rubio|bencarson|cruzcrew|feelthebern|sanders|voteTrump|clinton|cruz|tedcruz|bernie|berniesanders|makeamericagreatagain|trumptrain|donald)";

 var textData="";
 var authenticateString = window.btoa("admin:user@das");
 //"10.100.4.185"; //"52.77.25.83";


function drawPersonWordCloud( cloudDiv ,Pname){



   // var tableName= Cname+"WORDCLOUD";
    var j=1;var i;

    var stopWords ="(trump|donaldtrump|realdonaldtrump|via|wow|10|b4|gt|get|gets|come|go|ben|carson|rubio|bencarson|cruzcrew|feelthebern|sanders|voteTrump|clinton|cruz|tedcruz|bernie|berniesanders|makeamericagreatagain|trumptrain|donald)";

        getPersonDataCloud( cloudDiv,Pname );
          setInterval(function() {
                              // Do something every 5 minutes
                              getPersonDataCloud( cloudDiv,Pname );

                        }, 300000);




}




function updatePersonText( new_text, stopWords, cloudDiv){
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
                                          "fontScale": [20,60]
                                        }
                                      ]
                                    }
                                  ],

                                  "scales": [
                                    {
                                      "name": "color",
                                      "type": "ordinal",
                                      "range":["#ff9800","#827717","#000000"]
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

function getPersonDataCloud(cloudDiv, Pname){
        var cloudDivID="#"+cloudDiv;
        var newTestString=" ";
        var Candidates = { Choose : Pname};
                $.ajax({
                         url: "js/candidateCloud.jag",
                         dataType: "json",
                         contentType:'application/json',
                         data: JSON.stringify(Candidates),
                         type: "POST",
                         success: function (data) {
                                                        //    console.log(TextData);
                                            var TextData=JSON.stringify(data);
                                                                new_cloud =updatePersonText(TextData, stopWords,cloudDiv);
                                                                 var viewUpdateFunction = (function(chart) {
                                                               	        this.view = chart({el:cloudDivID}).update();
                                                                 }).bind(this);
                                                                 vg.parse.spec(new_cloud, viewUpdateFunction);


                                                           }

                                               });



}



