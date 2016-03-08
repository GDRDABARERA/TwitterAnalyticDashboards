
/*************************************************************************************************************
* new  candidate  WordCloud
***************************************************************************************************************/
 var dasIp="52.77.25.83";
 var textData="";
 var authenticateString = window.btoa("admin:user@das");
 

function drawPersonWordCloud( cloudDiv ,Pname ,color){



   
    var j=1;var i;


        getPersonDataCloud( cloudDiv,Pname ,color );
          setInterval(function() {
                              // Do something every 5 minutes
                              getPersonDataCloud( cloudDiv,Pname ,color );

                        }, 300000);




}




function updatePersonText( new_text, cloudDiv,color){
        var cloudDivID ="#"+cloudDiv;
            var width = $(cloudDivID).width();
            var height = $(cloudDivID).height();

            //var  colorset =[color,"#6d4c41","#000000"];
            //console.log(width);
            
                var text={
                          "name": "wordcloud",
                          "width": width,
                          "height": height,
                          "padding": {"top":0, "bottom":0, "left":0, "right":0},
                          "data": [
                            {
                              "name": "table",
                              "values":  new_text,
                              "transform": [
                                {
                                  "type": "wordcloud",
                                  "text": "data.text",
                                  "font": "Helvetica Neue",
                                  "fontSize": "data.value",
                                  "rotate": {"random": [-90,-45,0,45,90]}
                                }
                              ]
                            }
                          ],
                           "marks": [
                            {
                              "type": "text",
                              "from": {"data": "table"},
                              "properties": {
                                "enter": {
                                  "x": {"field": "x"},
                                  "y": {"field": "y"},
                                  "angle": {"field": "angle"},
                                  "align": {"value": "center"},
                                  "baseline": {"value": "alphabetic"},
                                  "font": {"field": "font"},
                                  "fontSize": {"field": "fontSize"},
                                  "text": {"field": "data.text"}
                                },
                                "update": {
                                   "fill": {"value": color}
                                },
                                "hover": {
                                  "fillOpacity": {"value": 0.5},
                                  "fill": {"value": "#f00"}
                                }
                              }
                            }
                          ]
                        };


            return text;

}

function getPersonDataCloud(cloudDiv, Pname,color){
        var cloudDivID="#"+cloudDiv;
        var newTestString=" ";
        var JSONObj = new Object();
        var Candidates = { Choose : Pname};
                $.ajax({
                         url: "js/candidateCloud.jag",
                         dataType: "json",
                         contentType:'application/json',
                         data: JSON.stringify(Candidates),
                         type: "POST",
                         success: function (data) {     
                                var TextData=JSON.stringify(data);
                                var res = TextData.split(";");
                                
                                for(var i=1;i<res.length-1;i++){
                                         var text=res[i];
                                         var array= text.split(":");
                                         var str= '{"text": "'+array[0]+'", "value":'+ array[1]+'}';
                                          JSONObj.push(jQuery.parseJSON(str));
                                 }
                                 
                               
                                  console.log(JSON.stringify(JSONObj));
                           new_cloud =updatePersonText(JSONObj,cloudDiv,color);
                           var viewUpdateFunction = (function(chart) {
                                         this.view = chart({el:cloudDivID}).update();
                           }).bind(this);
                           vg.parse.spec(new_cloud, viewUpdateFunction);


                         }

                   });



}



