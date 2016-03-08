/********************************************************************************************************************************************************************************
 * Bubble Graph   @EC2//"52.77.25.83";
 *********************************************************************************************************************************************************************************/
var dasIp = "52.77.25.83";
var authenticatingString = window.btoa("admin:user@das");
var width,height;

 function drawBubbleGraph(Bubblediv){
       drawBubbleGraph1(Bubblediv);
       setInterval(function() {
              // Do something every 5 seconds
              drawBubbleGraph1(Bubblediv);

        }, 300000);
  }
 


function drawBubbleGraph1(Bubblediv) {


    var divID = "#" + Bubblediv;

    var Nodes = [];

    var dataN = [];




    width = $(divID).width();
    height = $(divID).height();


    var bubble = "https://52.77.25.83:9453/analytics/tables/BUBBLE";



    $.when(


        $.ajax({

            url: bubble,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + authenticatingString);
            },
            method: "GET",
            contentType: "application/json",
            success: function(data) {
                dataN = data;
                console.log(dataN);
            }
        })

    ).then(function() {



        drawBubble(dataN);


    });



    function drawBubble(dataN1) {


        for (var i = 0; i < dataN1.length; i++) { //
            var d = dataN1[i].values;
            Nodes.push(d);


        }

        d3.select(divID).select("svg").remove();

        var svg = d3.select(divID).append('svg')
            .attr('width', width)
            .attr('height', height);

        var bubble = d3.layout.pack()
            .size([width, height])
            .value(function(d) {
                return d.size;
            })

            .padding(3);

        // generate data with calculated layout values

        var nodes = bubble.nodes(processData(Nodes))
            .filter(function(d) {
                return !d.children;
            }); // filter out the outer bubble
            console.log("Bubble graph");
            console.log(processData(Nodes));
        var node = svg.selectAll('circle')
            .data(nodes);

        node.append("title")
            .text(function(d) {
                return d.name;
            });


        node.enter().append('circle')
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            })
            .attr('r', function(d) {
                return d.r;
            }) //(d.size *2); })
            .attr('fill', function(d) {
                return d.color;
            })
            .style("fill-opacity", 0.7)
            .style("stroke",function (d) {
                        return d.color;


             })
	     .on( 'click', function(d){
                console.log(d.name);
                 yourPick= d.name;
		/* functions to be called */
		console.log("yourpick is"+ yourPick);




             });

        var label = node.enter().append("text")
            .style("font-family", "sans-serif")
            .style("text-anchor", "middle")
            .style("font-size", function(d) {

                    return d.r/4 ;


            })
            .style("fill","#000000")
            .text(function(d) {


                    return d.name ;

            })
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });



                var label2 = node.enter().append("text")
                        .style("font-family", "sans-serif")
                        .style("text-anchor", "middle")
                        .style("font-size", function(d) {
                                 console.log(d.r/2);
                                  return d.r/2 + "px";
                                 

                        })
                        .style("fill","#000000")
                        .text(function(d) {


                                return d.size;

                        })
                        .attr('transform', function(d) {
                                d.y=d.y+d.r/2;
                            return 'translate(' + d.x + ',' + d.y + ')';
                        });

        var legendRectSize = 20,
            legendSpacing = 5;

        var legend = d3.select('svg')
            .selectAll("svg")
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var h = legendRectSize +5;
                var x = 10;
                var y =10+( i * h);
                return 'translate(' + x + ',' + (y) + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .attr('padding', 2)
            .style('fill', function(d) {

                                return d.color;

            })
            .style('stroke', function(d) {

                                return d.color;

            })
             .on( 'click', function(d){
                   console.log(d.name);
             });

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) {

                return d.name;

            });




        function processData(data) {
            var obj = data;

            var newDataSet = [];

            for (var prop in obj) {
               if(obj[prop].retweetCount>0){
                newDataSet.push({
                    name: obj[prop].party,
                    color: obj[prop].color,
                    size: obj[prop].retweetCount
                });
                }
            }
            return {
                children: newDataSet
            };
        }




    }




}
