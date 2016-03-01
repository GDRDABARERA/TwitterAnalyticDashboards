/**********************************************************************************************************************************************************************************
 * Persons wordcloud
 *************************************************************************************************************************************************************/
var dasIp = "10.100.4.185"; //"52.77.25.83";
var stopWords = "(data|miss|wsocon | rosemin |ROSEMIN)";




/**********************************************************************************************************************************************************************************
 * Persons wordcloud
 *************************************************************************************************************************************************************/
function personWordCloud(URL, personName, divPCloud) {



    var cloudDivID = "#" + divPCloud;


    var width = $(cloudDivID).width();
    // var widthDid = $("news").width();
    var height = $(cloudDivID).height();
    var person = {
        Choose: name
    };
    var newTestString = " ";
    $.ajax({
        url: URL,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(person),
        type: "POST",
        success: function(data) {


            var personText = JSON.stringify(data);


            var text = {
                "width": 100,
                "height": 50,
                "padding": {
                    "top": 0,
                    "bottom": 0,
                    "left": 0,
                    "right": 0
                },

                "data": [{
                    "name": "table",
                    "values": [personText],

                    "transform": [{
                        "type": "countpattern",
                        "field": "data",
                        "case": "upper",
                        "pattern": "[\\w']{3,}",
                        "stopwords": stopWords
                    }, {
                        "type": "formula",
                        "field": "angle",
                        "expr": "[-45, 0, 45][~~(random() * 3)]"
                    }, {
                        "type": "formula",
                        "field": "weight",
                        "expr": "if(datum.text=='VEGA', 600, 300)"
                    }, {
                        "type": "wordcloud",
                        "size": [100, 50],
                        "text": {
                            "field": "text"
                        },
                        "rotate": {
                            "field": "angle"
                        },
                        "font": {
                            "value": "Arial"
                        },
                        "fontSize": {
                            "field": "count"
                        },
                        "fontWeight": {
                            "field": "weight"
                        },
                        "fontScale": [4, 10]
                    }]
                }],

                "scales": [{
                    "name": "color",
                    "type": "ordinal",
                    "range": ["#fc61e2", "#7d3070", "#511f49"]
                }],

                "marks": [{
                    "type": "text",
                    "from": {
                        "data": "table"
                    },
                    "properties": {
                        "enter": {
                            "x": {
                                "field": "layout_x"
                            },
                            "y": {
                                "field": "layout_y"
                            },
                            "angle": {
                                "field": "layout_rotate"
                            },
                            "font": {
                                "field": "layout_font"
                            },
                            "fontSize": {
                                "field": "layout_fontSize"
                            },
                            "fontStyle": {
                                "field": "layout_fontStyle"
                            },
                            "fontWeight": {
                                "field": "layout_fontWeight"
                            },
                            "text": {
                                "field": "text"
                            },
                            "align": {
                                "value": "center"
                            },
                            "baseline": {
                                "value": "alphabetic"
                            },
                            "fill": {
                                "scale": "color",
                                "field": "text"
                            }
                        },
                        "update": {
                            "fillOpacity": {
                                "value": 1
                            }
                        },
                        "hover": {
                            "fillOpacity": {
                                "value": 0.5
                            }
                        }
                    }
                }]

            };
            //    var personText = data.stringify;
            //   new_cloud =updatePersonText(personText, stopWords,divPCloud);
            var viewPersonUpdateFunction = (function(chart) {
                this.view = chart({
                    el: "#PersonCloud"
                }).update();
            }).bind(this);

            vg.parse.spec(text, viewPersonUpdateFunction);
          //  alert("TTT" + JSON.stringify(data));



        },
        error: function(er) {
            alert("Error Graph Sentiment" + er);
        }



    });




};