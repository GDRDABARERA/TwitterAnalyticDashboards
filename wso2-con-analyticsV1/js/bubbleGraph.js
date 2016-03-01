/********************************************************************************************************************************************************************************
 * Bubble Graph  //"10.100.4.185"; //"52.77.25.83";
 *********************************************************************************************************************************************************************************/
var dasIp = "52.77.25.83";
var authenticatingString = window.btoa("admin:user@con2016");


function drawBubbleGraph(Bubblediv) {


    var divID = "#" + Bubblediv;

    var Nodes = [];

    var dataN = [];




    var width = $(divID).width();
    var height = $(divID).height();


    var bubble = "https://52.77.25.83:9446/analytics/tables/BUBBLE";



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

       d3.select("svg").remove();

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

                                return d.r/2;


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
                var height = legendRectSize +5;
                var x = 10;
                var y =10+( i * height);
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
               if(obj[prop].degree>0){
                newDataSet.push({
                    name: obj[prop].name,
                    color: obj[prop].color,
                    size: obj[prop].degree
                });
                }
            }
            return {
                children: newDataSet
            };
        }




    }




}
