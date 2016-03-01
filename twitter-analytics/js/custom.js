/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//----------------------------------------------------------------.ready() starts

 var DBmap= new Map();
                                DBmap.set('TRUMP', 'Trump');
                                DBmap.set('CLINTON', 'Clinton');
                                DBmap.set('BERNIE', 'Bernie');
                                DBmap.set('BEN', 'Ben');
                                DBmap.set('MALLEY', 'OMalley');
                                DBmap.set('BUSH', 'Bush');
                                DBmap.set('CRUZ', 'Ted');
                                DBmap.set('CHRIS', 'Chris');
                                DBmap.set('FIORINA', 'Carly');
                                DBmap.set('GILMORE', 'Jim');
                                DBmap.set('GRAHAM', 'Lindsey');
                                DBmap.set('HUCKABEE', 'Mike');
                                DBmap.set('JOHN', 'John');
                                DBmap.set( 'GEORGE', 'George');
                                DBmap.set('RAND', 'Rand');
                                DBmap.set( 'RUBIE', 'Marco');
                                DBmap.set( 'RICK', 'Rick');
                                DBmap.set( 'WALKER', 'Scott');

$(document).ready(function () {
        ajaxLatest();
        ajaxNews();
        ajaxHtag("#nt-Htag2","Bernie");
        ajaxHtag("#nt-Htag1","Trump");
        ajaxPopular("Trump");
        ajaxGarphSentiment("js/SentimetGraphServer.jag","","","");




    var dasIp ="192.168.57.78";
     var top3 = [];
     var otherCandidates=[];
     var candidateMap = new Map();
    getTop2(dasIp,top3,otherCandidates,candidateMap);

    var ntLatest = $('#nt-latest').newsTicker({
        row_height: 80,
        max_rows: 5,
        duration: 2000,
        prevButton: $('.nt-prev'),
        nextButton: $('.nt-next')
    });

    var ntPopular = $('#nt-popular').newsTicker({
        row_height: 80,
        max_rows: 5,
        duration: 10000,
        prevButton: $('.nt-prev'),
        nextButton: $('.nt-next')
    });

    var ntNews = $('#nt-news').newsTicker({
        row_height: 80,
        max_rows: 5,
        duration: 10000,
        prevButton: $('.nt-prev'),
        nextButton: $('.nt-next')
    });

    $("#candidate-selection-menu li").on("click", function () {
        var selectedCandidate = $(this).prop("title");
        console.log(selectedCandidate);
         if(top3.length==2){
                     top3.push(candidateMap.get(selectedCandidate));
                }
         else{
                     top3.pop();
                     top3.push(candidateMap.get(selectedCandidate));
           }
            console.log(top3);
            $("#trend-graph").empty();
            drawGraph(top3,3,dasIp);
            setCandidate(selectedCandidate,candidateMap);
    });

  /*  $("#candidate-selection-menu li").on("click", function () {
        var selectedCandidate = $(this).prop("id");

        $.ajax({
            url: "some/url/i/fancy",
            context: document.body,
            beforeSend: function () {
                $(".candidate-container").loading({
                    action: "show",
                    element: ".candidate-container",
                    loadingText: "Fetching Data..."
                });
            }
        }).done(function (data) {
            $(".candidate-container").loading({
                action: "hide"
            });
            $(".site-overlay").click();
            //console.log(data);
        }).fail(function () {

        });
    }); */


   /*----------------------------------------------------Community Graph
    $.ajax({
        url: "some/url/i/fancy",
        context: document.body,
        beforeSend: function () {
            $(".trend-graph").loading({
                action: "show",
                element: ".trend-graph",
                loadingText: "Fetching Analytics Data...",
                loadIcon: "fw-fan",
                loadAnimation: "fw-spin",
            });
        },
        error:function (xhr, ajaxOptions, thrownError){
            if(xhr.status==404) {
                console.log(thrownError);
            }
        }
    }).done(function (data) {
        $(".trend-graph").loading({
            action: "hide"
        });
    }).fail(function () {

    });
    //--------------------------------------------------------Sentiment graph
    $.ajax({
        url: "some/url/i/fancy",
        context: document.body,
        beforeSend: function () {
            $(".sentiment-graph").loading({
                action: "show",
                element: ".sentiment-graph",
                loadingText: "Fetching Analytics Data...",
                loadIcon: "fw-fan",
                loadAnimation: "fw-spin",
            });
        },
        error:function (xhr, ajaxOptions, thrownError){
            if(xhr.status==404) {
                console.log(thrownError);
            }
        }
    }).done(function (data) {
        $(".sentiment-graph").loading({
            action: "hide"
        });
    }).fail(function () {

    }); */


    var cardHeight = $(".card").outerHeight(true);
    $(".menu-btn").outerHeight(cardHeight);
    $(".menu-btn").css("padding-top", cardHeight / 2 - 50);

});

//--------------------------------------------.ready(); finishes
function getTop2(dasIp,top3,otherCandidates,candidateMap,map){

      var topN=2;

      $.ajax({

                            url:  "https://"+ dasIp + ":9446/analytics/tables/TOP2",
                            beforeSend: function (xhr) {
                                   xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                             },
                             method: "GET",

                            contentType: "application/json",
                            success: function (top) {
                              console.log('TOP@ :');
                              console.log(top);
                              $.ajax({
                                    url:  "https://"+ dasIp + ":9446/analytics/tables/DATA",
                                    beforeSend: function (xhr) {
                                          xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                    },
                                    method: "GET",

                                    contentType: "application/json",

                                    success: function (candidateData) {

                                          console.log('DATA:' );
                                          console.log(candidateData);
                                           console.log(candidateData.length);
                                          for(i=0;i<candidateData.length;i++){

                                                  candidateMap.set(candidateData[i].values.name,candidateData[i].values);
                                          }

                                          for(var j=0;j<candidateData.length;j++){
                                              if(j<topN){
                                                  top3[j]=candidateMap.get(top[j].values.name)
                                              }else{
                                                  otherCandidates[j-2]=candidateMap.get(top[j].values.name);

                                              }
                                          }



                                          console.log(top3);

                                         // loadLatestTweets(top3);
                                         // sentimentalGraph(top3);
                                         $("#trend-graph").empty();
                                          drawGraph(top3,2,dasIp);

                                          setUpOptions(otherCandidates,candidateMap,top3,dasIp);

                                     }

                                    });

                            }


       });


}

function setUpOptions(otherCandidates,candidateMap,top3, dasIp){
    for(var j=0;j<top3.length;j++){
        var topImgID="#img-top"+(j+1);
        var topNameID="#name-top"+(j+1);
        var topHtagID="#htag-top"+(j+1);
        var topDescID="#desc-top1"+(j+1);

        $(topImgID).attr("src",top3[j].imgUrl);
        $(topNameID).html(top3[j].fullName);
        $(topHtagID).html(top3[j].htags);
        $(topDescID).html(top3[j].description)


    }

    for(var i=0;i<otherCandidates.length;i++){
        var candiID= "#candi"+(i+1);
        var imageID= "#img-candi"+(i+1);
        var spanID="#span-candi"+(i+1);
        var titleN=otherCandidates[i].name;
       // var candiID="candi"+(i+1);
        $(imageID).attr("src",otherCandidates[i].imgUrl);
        $(spanID).html(otherCandidates[i].fullName);
        $(candiID).prop("title",titleN);
        console.log(candiID +"   "+titleN);


    }

}
//-------------------------------------------------------------------------------------------------------------

function setCandidate(selectedCandidate,candidateMap){

    var candi3FullName= candidateMap.get(selectedCandidate).fullName;
    var candi3ImgUrl= candidateMap.get(selectedCandidate).imgUrl;
    var candi3Description= candidateMap.get(selectedCandidate).description;
    var candi3Htag=candidateMap.get(selectedCandidate).htag;

    var contextString=' <div class="card hovercard"> <div class="cardheader color3"></div> <div class="avatar"> <img alt=""  id="img-top3" src ="'+candi3ImgUrl+' " class="img-responsive center-block"</div><div class="info"><div class="title"><a target="_blank" id="name-top3" href="http://scripteden.com/">'+candi3FullName+'</a> </div><div class="desc text-left"  id="nt-Htag3"><span>'+ candi3Htag+'</span></div><div class="desc text-left"><a id="desc-top3">more...</a></div></di></div>';

     $("#candidate_container").html(contextString);




}
//-------------------------------------------------------------------------------------------------------------
function drawGraph( topPeople,n,dasIp){
    console.log(topPeople,n,dasIp);
     //radius --> retweet   color-->content
     //d3.select("#d3graph").select("svg").remove();
            var graph = {
                "nodes": [
                    {"name": "Myriel", "group": 1},
                    {"name": "Napoleon", "group": 1},
                    {"name": "Mlle.Baptistine", "group": 1},
                    {"name": "Mme.Magloire", "group": 1},
                    {"name": "CountessdeLo", "group": 1},
                    {"name": "Geborand", "group": 1},
                    {"name": "Champtercier", "group": 1},
                    {"name": "Cravatte", "group": 1},
                    {"name": "Count", "group": 1},
                    {"name": "OldMan", "group": 1},
                    {"name": "Labarre", "group": 2},
                    {"name": "Valjean", "group": 2},
                    {"name": "Marguerite", "group": 3},
                    {"name": "Mme.deR", "group": 2},
                    {"name": "Isabeau", "group": 2},
                    {"name": "Gervais", "group": 2},
                    {"name": "Tholomyes", "group": 3},
                    {"name": "Listolier", "group": 3},
                    {"name": "Fameuil", "group": 3},
                    {"name": "Blacheville", "group": 3},
                    {"name": "Favourite", "group": 3},
                    {"name": "Dahlia", "group": 3},
                    {"name": "Zephine", "group": 3},
                    {"name": "Fantine", "group": 3},
                    {"name": "Mme.Thenardier", "group": 4},
                    {"name": "Thenardier", "group": 4},
                    {"name": "Cosette", "group": 5},
                    {"name": "Javert", "group": 4},
                    {"name": "Fauchelevent", "group": 0},
                    {"name": "Bamatabois", "group": 2},
                    {"name": "Perpetue", "group": 3},
                    {"name": "Simplice", "group": 2},
                    {"name": "Scaufflaire", "group": 2},
                    {"name": "Woman1", "group": 2},
                    {"name": "Judge", "group": 2},
                    {"name": "Champmathieu", "group": 2},
                    {"name": "Brevet", "group": 2},
                    {"name": "Chenildieu", "group": 2},
                    {"name": "Cochepaille", "group": 2},
                    {"name": "Pontmercy", "group": 4},
                    {"name": "Boulatruelle", "group": 6},
                    {"name": "Eponine", "group": 4},
                    {"name": "Anzelma", "group": 4},
                    {"name": "Woman2", "group": 5},
                    {"name": "MotherInnocent", "group": 0},
                    {"name": "Gribier", "group": 0},
                    {"name": "Jondrette", "group": 7},
                    {"name": "Mme.Burgon", "group": 7},
                    {"name": "Gavroche", "group": 8},
                    {"name": "Gillenormand", "group": 5},
                    {"name": "Magnon", "group": 5},
                    {"name": "Mlle.Gillenormand", "group": 5},
                    {"name": "Mme.Pontmercy", "group": 5},
                    {"name": "Mlle.Vaubois", "group": 5},
                    {"name": "Lt.Gillenormand", "group": 5},
                    {"name": "Marius", "group": 8},
                    {"name": "BaronessT", "group": 5},
                    {"name": "Mabeuf", "group": 8},
                    {"name": "Enjolras", "group": 8},
                    {"name": "Combeferre", "group": 8},
                    {"name": "Prouvaire", "group": 8},
                    {"name": "Feuilly", "group": 8},
                    {"name": "Courfeyrac", "group": 8},
                    {"name": "Bahorel", "group": 8},
                    {"name": "Bossuet", "group": 8},
                    {"name": "Joly", "group": 8},
                    {"name": "Grantaire", "group": 8},
                    {"name": "MotherPlutarch", "group": 9},
                    {"name": "Gueulemer", "group": 4},
                    {"name": "Babet", "group": 4},
                    {"name": "Claquesous", "group": 4},
                    {"name": "Montparnasse", "group": 4},
                    {"name": "Toussaint", "group": 5},
                    {"name": "Child1", "group": 10},
                    {"name": "Child2", "group": 10},
                    {"name": "Brujon", "group": 4},
                    {"name": "Mme.Hucheloup", "group": 8}
                ],
                "links": [
                    {"source": 1, "target": 0, "value": 1},
                    {"source": 2, "target": 0, "value": 8},
                    {"source": 3, "target": 0, "value": 10},
                    {"source": 3, "target": 2, "value": 6},
                    {"source": 4, "target": 0, "value": 1},
                    {"source": 5, "target": 0, "value": 1},
                    {"source": 6, "target": 0, "value": 1},
                    {"source": 7, "target": 0, "value": 1},
                    {"source": 8, "target": 0, "value": 2},
                    {"source": 9, "target": 0, "value": 1},
                    {"source": 11, "target": 10, "value": 1},
                    {"source": 11, "target": 3, "value": 3},
                    {"source": 11, "target": 2, "value": 3},
                    {"source": 11, "target": 0, "value": 5},
                    {"source": 12, "target": 11, "value": 1},
                    {"source": 13, "target": 11, "value": 1},
                    {"source": 14, "target": 11, "value": 1},
                    {"source": 15, "target": 11, "value": 1},
                    {"source": 17, "target": 16, "value": 4},
                    {"source": 18, "target": 16, "value": 4},
                    {"source": 18, "target": 17, "value": 4},
                    {"source": 19, "target": 16, "value": 4},
                    {"source": 19, "target": 17, "value": 4},
                    {"source": 19, "target": 18, "value": 4},
                    {"source": 20, "target": 16, "value": 3},
                    {"source": 20, "target": 17, "value": 3},
                    {"source": 20, "target": 18, "value": 3},
                    {"source": 20, "target": 19, "value": 4},
                    {"source": 21, "target": 16, "value": 3},
                    {"source": 21, "target": 17, "value": 3},
                    {"source": 21, "target": 18, "value": 3},
                    {"source": 21, "target": 19, "value": 3},
                    {"source": 21, "target": 20, "value": 5},
                    {"source": 22, "target": 16, "value": 3},
                    {"source": 22, "target": 17, "value": 3},
                    {"source": 22, "target": 18, "value": 3},
                    {"source": 22, "target": 19, "value": 3},
                    {"source": 22, "target": 20, "value": 4},
                    {"source": 22, "target": 21, "value": 4},
                    {"source": 23, "target": 16, "value": 3},
                    {"source": 23, "target": 17, "value": 3},
                    {"source": 23, "target": 18, "value": 3},
                    {"source": 23, "target": 19, "value": 3},
                    {"source": 23, "target": 20, "value": 4},
                    {"source": 23, "target": 21, "value": 4},
                    {"source": 23, "target": 22, "value": 4},
                    {"source": 23, "target": 12, "value": 2},
                    {"source": 23, "target": 11, "value": 9},
                    {"source": 24, "target": 23, "value": 2},
                    {"source": 24, "target": 11, "value": 7},
                    {"source": 25, "target": 24, "value": 13},
                    {"source": 25, "target": 23, "value": 1},
                    {"source": 25, "target": 11, "value": 12},
                    {"source": 26, "target": 24, "value": 4},
                    {"source": 26, "target": 11, "value": 31},
                    {"source": 26, "target": 16, "value": 1},
                    {"source": 26, "target": 25, "value": 1},
                    {"source": 27, "target": 11, "value": 17},
                    {"source": 27, "target": 23, "value": 5},
                    {"source": 27, "target": 25, "value": 5},
                    {"source": 27, "target": 24, "value": 1},
                    {"source": 27, "target": 26, "value": 1},
                    {"source": 28, "target": 11, "value": 8},
                    {"source": 28, "target": 27, "value": 1},
                    {"source": 29, "target": 23, "value": 1},
                    {"source": 29, "target": 27, "value": 1},
                    {"source": 29, "target": 11, "value": 2},
                    {"source": 30, "target": 23, "value": 1},
                    {"source": 31, "target": 30, "value": 2},
                    {"source": 31, "target": 11, "value": 3},
                    {"source": 31, "target": 23, "value": 2},
                    {"source": 31, "target": 27, "value": 1},
                    {"source": 32, "target": 11, "value": 1},
                    {"source": 33, "target": 11, "value": 2},
                    {"source": 33, "target": 27, "value": 1},
                    {"source": 34, "target": 11, "value": 3},
                    {"source": 34, "target": 29, "value": 2},
                    {"source": 35, "target": 11, "value": 3},
                    {"source": 35, "target": 34, "value": 3},
                    {"source": 35, "target": 29, "value": 2},
                    {"source": 36, "target": 34, "value": 2},
                    {"source": 36, "target": 35, "value": 2},
                    {"source": 36, "target": 11, "value": 2},
                    {"source": 36, "target": 29, "value": 1},
                    {"source": 37, "target": 34, "value": 2},
                    {"source": 37, "target": 35, "value": 2},
                    {"source": 37, "target": 36, "value": 2},
                    {"source": 37, "target": 11, "value": 2},
                    {"source": 37, "target": 29, "value": 1},
                    {"source": 38, "target": 34, "value": 2},
                    {"source": 38, "target": 35, "value": 2},
                    {"source": 38, "target": 36, "value": 2},
                    {"source": 38, "target": 37, "value": 2},
                    {"source": 38, "target": 11, "value": 2},
                    {"source": 38, "target": 29, "value": 1},
                    {"source": 39, "target": 25, "value": 1},
                    {"source": 40, "target": 25, "value": 1},
                    {"source": 41, "target": 24, "value": 2},
                    {"source": 41, "target": 25, "value": 3},
                    {"source": 42, "target": 41, "value": 2},
                    {"source": 42, "target": 25, "value": 2},
                    {"source": 42, "target": 24, "value": 1},
                    {"source": 43, "target": 11, "value": 3},
                    {"source": 43, "target": 26, "value": 1},
                    {"source": 43, "target": 27, "value": 1},
                    {"source": 44, "target": 28, "value": 3},
                    {"source": 44, "target": 11, "value": 1},
                    {"source": 45, "target": 28, "value": 2},
                    {"source": 47, "target": 46, "value": 1},
                    {"source": 48, "target": 47, "value": 2},
                    {"source": 48, "target": 25, "value": 1},
                    {"source": 48, "target": 27, "value": 1},
                    {"source": 48, "target": 11, "value": 1},
                    {"source": 49, "target": 26, "value": 3},
                    {"source": 49, "target": 11, "value": 2},
                    {"source": 50, "target": 49, "value": 1},
                    {"source": 50, "target": 24, "value": 1},
                    {"source": 51, "target": 49, "value": 9},
                    {"source": 51, "target": 26, "value": 2},
                    {"source": 51, "target": 11, "value": 2},
                    {"source": 52, "target": 51, "value": 1},
                    {"source": 52, "target": 39, "value": 1},
                    {"source": 53, "target": 51, "value": 1},
                    {"source": 54, "target": 51, "value": 2},
                    {"source": 54, "target": 49, "value": 1},
                    {"source": 54, "target": 26, "value": 1},
                    {"source": 55, "target": 51, "value": 6},
                    {"source": 55, "target": 49, "value": 12},
                    {"source": 55, "target": 39, "value": 1},
                    {"source": 55, "target": 54, "value": 1},
                    {"source": 55, "target": 26, "value": 21},
                    {"source": 55, "target": 11, "value": 19},
                    {"source": 55, "target": 16, "value": 1},
                    {"source": 55, "target": 25, "value": 2},
                    {"source": 55, "target": 41, "value": 5},
                    {"source": 55, "target": 48, "value": 4},
                    {"source": 56, "target": 49, "value": 1},
                    {"source": 56, "target": 55, "value": 1},
                    {"source": 57, "target": 55, "value": 1},
                    {"source": 57, "target": 41, "value": 1},
                    {"source": 57, "target": 48, "value": 1},
                    {"source": 58, "target": 55, "value": 7},
                    {"source": 58, "target": 48, "value": 7},
                    {"source": 58, "target": 27, "value": 6},
                    {"source": 58, "target": 57, "value": 1},
                    {"source": 58, "target": 11, "value": 4},
                    {"source": 59, "target": 58, "value": 15},
                    {"source": 59, "target": 55, "value": 5},
                    {"source": 59, "target": 48, "value": 6},
                    {"source": 59, "target": 57, "value": 2},
                    {"source": 60, "target": 48, "value": 1},
                    {"source": 60, "target": 58, "value": 4},
                    {"source": 60, "target": 59, "value": 2},
                    {"source": 61, "target": 48, "value": 2},
                    {"source": 61, "target": 58, "value": 6},
                    {"source": 61, "target": 60, "value": 2},
                    {"source": 61, "target": 59, "value": 5},
                    {"source": 61, "target": 57, "value": 1},
                    {"source": 61, "target": 55, "value": 1},
                    {"source": 62, "target": 55, "value": 9},
                    {"source": 62, "target": 58, "value": 17},
                    {"source": 62, "target": 59, "value": 13},
                    {"source": 62, "target": 48, "value": 7},
                    {"source": 62, "target": 57, "value": 2},
                    {"source": 62, "target": 41, "value": 1},
                    {"source": 62, "target": 61, "value": 6},
                    {"source": 62, "target": 60, "value": 3},
                    {"source": 63, "target": 59, "value": 5},
                    {"source": 63, "target": 48, "value": 5},
                    {"source": 63, "target": 62, "value": 6},
                    {"source": 63, "target": 57, "value": 2},
                    {"source": 63, "target": 58, "value": 4},
                    {"source": 63, "target": 61, "value": 3},
                    {"source": 63, "target": 60, "value": 2},
                    {"source": 63, "target": 55, "value": 1},
                    {"source": 64, "target": 55, "value": 5},
                    {"source": 64, "target": 62, "value": 12},
                    {"source": 64, "target": 48, "value": 5},
                    {"source": 64, "target": 63, "value": 4},
                    {"source": 64, "target": 58, "value": 10},
                    {"source": 64, "target": 61, "value": 6},
                    {"source": 64, "target": 60, "value": 2},
                    {"source": 64, "target": 59, "value": 9},
                    {"source": 64, "target": 57, "value": 1},
                    {"source": 64, "target": 11, "value": 1},
                    {"source": 65, "target": 63, "value": 5},
                    {"source": 65, "target": 64, "value": 7},
                    {"source": 65, "target": 48, "value": 3},
                    {"source": 65, "target": 62, "value": 5},
                    {"source": 65, "target": 58, "value": 5},
                    {"source": 65, "target": 61, "value": 5},
                    {"source": 65, "target": 60, "value": 2},
                    {"source": 65, "target": 59, "value": 5},
                    {"source": 65, "target": 57, "value": 1},
                    {"source": 65, "target": 55, "value": 2},
                    {"source": 66, "target": 64, "value": 3},
                    {"source": 66, "target": 58, "value": 3},
                    {"source": 66, "target": 59, "value": 1},
                    {"source": 66, "target": 62, "value": 2},
                    {"source": 66, "target": 65, "value": 2},
                    {"source": 66, "target": 48, "value": 1},
                    {"source": 66, "target": 63, "value": 1},
                    {"source": 66, "target": 61, "value": 1},
                    {"source": 66, "target": 60, "value": 1},
                    {"source": 67, "target": 57, "value": 3},
                    {"source": 68, "target": 25, "value": 5},
                    {"source": 68, "target": 11, "value": 1},
                    {"source": 68, "target": 24, "value": 1},
                    {"source": 68, "target": 27, "value": 1},
                    {"source": 68, "target": 48, "value": 1},
                    {"source": 68, "target": 41, "value": 1},
                    {"source": 69, "target": 25, "value": 6},
                    {"source": 69, "target": 68, "value": 6},
                    {"source": 69, "target": 11, "value": 1},
                    {"source": 69, "target": 24, "value": 1},
                    {"source": 69, "target": 27, "value": 2},
                    {"source": 69, "target": 48, "value": 1},
                    {"source": 69, "target": 41, "value": 1},
                    {"source": 70, "target": 25, "value": 4},
                    {"source": 70, "target": 69, "value": 4},
                    {"source": 70, "target": 68, "value": 4},
                    {"source": 70, "target": 11, "value": 1},
                    {"source": 70, "target": 24, "value": 1},
                    {"source": 70, "target": 27, "value": 1},
                    {"source": 70, "target": 41, "value": 1},
                    {"source": 70, "target": 58, "value": 1},
                    {"source": 71, "target": 27, "value": 1},
                    {"source": 71, "target": 69, "value": 2},
                    {"source": 71, "target": 68, "value": 2},
                    {"source": 71, "target": 70, "value": 2},
                    {"source": 71, "target": 11, "value": 1},
                    {"source": 71, "target": 48, "value": 1},
                    {"source": 71, "target": 41, "value": 1},
                    {"source": 71, "target": 25, "value": 1},
                    {"source": 72, "target": 26, "value": 2},
                    {"source": 72, "target": 27, "value": 1},
                    {"source": 72, "target": 11, "value": 1},
                    {"source": 73, "target": 48, "value": 2},
                    {"source": 74, "target": 48, "value": 2},
                    {"source": 74, "target": 73, "value": 3},
                    {"source": 75, "target": 69, "value": 3},
                    {"source": 75, "target": 68, "value": 3},
                    {"source": 75, "target": 25, "value": 3},
                    {"source": 75, "target": 48, "value": 1},
                    {"source": 75, "target": 41, "value": 1},
                    {"source": 75, "target": 70, "value": 1},
                    {"source": 75, "target": 71, "value": 1},
                    {"source": 76, "target": 64, "value": 1},
                    {"source": 76, "target": 65, "value": 1},
                    {"source": 76, "target": 66, "value": 1},
                    {"source": 76, "target": 63, "value": 1},
                    {"source": 76, "target": 62, "value": 1},
                    {"source": 76, "target": 48, "value": 1},
                    {"source": 76, "target": 58, "value": 1}
                ]
            };


      // var g = graphlibDot.read("digraph { A -> B;}");

     //  console.log(g.nodes);
     //  console.log(g.edges);



       var graph = new Object();
       var map = new Object();
           var index = 0;

           var linkIndex = 0;
           var Nodes = [];
           var Edges = [];
           var dataN1=[],
               dataN2=[],
               dataN3=[];
           var dataE1=[],
               dataE2=[],
               dataE3=[];




         var width = $("#trend-graph").width();
         var height = $("#trend-graph").height() ;

//        d3.select("#d3graph").selectAll("svg").remove();
        var svg = d3.select("#trend-graph").append("svg:svg")
                .attr("width", width)
                .attr("height", height);




            function zoom() {
                 svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            }




           // tool tip with the label
           var tip = d3.tip()
                   .attr('class', 'd3-tip')
                   .offset([-10, 0])
                   .html(function (d) {
                       return d.name + "";
                   })
           svg.call(tip);


          //  d3.select("the_SVG_ID").remove();
           // arrow head for the graph
           svg.append("defs").selectAll("marker")
                   .data(["suit", "licensing", "resolved"])
                   .enter().append("marker")
                   .attr("id", function (d) {
                       return d;
                   })
                   .attr("viewBox", "0 -5 10 10")
                   .attr("refX", 25)
                   .attr("refY", 0)
                   .attr("markerWidth", 6)
                   .attr("markerHeight", 6)
                   .attr("orient", "auto")
                   .append("path")
                   .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
                   .style("stroke", "#4679BD")
                   .style("opacity", "0.6");

            var tableNodes=[],tableEdges=[];
            var candidate1=" ";
            var candidate2= " ",candidate3=" ";
           var tableColor = ["#f39c12","#9b59b6","#1abc9c"];
  if(n==2){

           candidate1= topPeople[0];
           candidate2= topPeople[0];
            for(var t=0;t<n;t++){
                var tn=topPeople[t].name+"NODETWEETTABLE";
                tableNodes.push(tn);
                var te=topPeople[t].name+"EDGETWEETTABLE"
                tableEdges.push(te);

            }
            console.log(tableNodes);
             console.log(tableEdges);

          // var tableNodes = ["TRUMPNODETWEETTABLE","BERNIENODETWEETTABLE", "CLINTONNODETWEETTABLE"];
          // var tableEdges = ["TRUMPEDGETWEETTABLE","BERNIEEDGETWEETTABLE", "CLINTONEDGETWEETTABLE"];


            var nodeUrl1 = "https://"+dasIp+":9446/analytics/tables/" + tableNodes[0],
                         nodeUrl2 = "https://"+dasIp+":9446/analytics/tables/" + tableNodes[1],

                         edgeUrl1 = "https://"+dasIp+":9446/analytics/tables/" + tableEdges[0],
                         edgeUrl2 = "https://"+dasIp+":9446/analytics/tables/" + tableEdges[1];


     $.when(

/* Sending concurrent 6 ajax calls */
                     $.ajax({

                                url: nodeUrl1,
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                },
                                method: "GET",
                                contentType: "application/json",
                                success:function(data){
                                 dataN1=data;
                                 console.log(dataN1);
                                }
                            }),

                     $.ajax({

                                url: nodeUrl2,
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                },
                                method: "GET",
                                contentType: "application/json",
                                success:function(data){
                                    dataN2=data;
                                }
                            }),


                     $.ajax({

                                url: edgeUrl1,
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                },
                                method: "GET",
                                contentType: "application/json",
                                success:function(data){
                                    dataE1=data;
                                }

                            }),

                     $.ajax({

                                url: edgeUrl2,
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                },
                                method: "GET",
                                contentType: "application/json",
                                success:function(data){
                                    dataE2=data;
                                }
                            })

       ).then(function(){

          //  console.log(dataN1);
            //console.log(dataN2);
            //console.log(dataN3);
            //console.log(dataE1);
            //console.log(dataE2);
            //console.log(dataE3);

            loadNodeData2(Nodes,dataN1,dataN2);
            loadEdgesData2(Edges,dataE1,dataE2);
            renderNodesEdges(Nodes,Edges);



     });




    function loadNodeData2(Nodes,dataN1,dataN2){
                 for (var i = 0; i < dataN1.length; i++) {//
                                   var d = dataN1[i].values;
                                   d.color = tableColor[0];
                                   Nodes.push(d);


                               }
                 for (var i = 0; i < dataN2.length; i++) {//
                                   var d = dataN2[i].values;
                                   d.color = tableColor[1];
                                   Nodes.push(d);


                               }

     }

     function loadEdgesData2(Edges,dataE1,dataE2){
                         for (var i = 0; i < dataE1.length; i++) {  //
                                var d = dataE1[i].values;
                                Edges.push(d);

                            }
                         for (var i = 0; i < dataE2.length; i++) {  //
                                var d = dataE2[i].values;
                                Edges.push(d);

                            }

     }
     }else{

               candidate1= topPeople[0];
               candidate2= topPeople[0];
               candidate3= topPeople[2];
                 for(var t=0;t<n;t++){
                     var tn=topPeople[t].name+"NODETWEETTABLE";
                     tableNodes.push(tn);
                     var te=topPeople[t].name+"EDGETWEETTABLE"
                     tableEdges.push(te);

                 }
                 console.log(tableNodes);
                  console.log(tableEdges);

               // var tableNodes = ["TRUMPNODETWEETTABLE","BERNIENODETWEETTABLE", "CLINTONNODETWEETTABLE"];
               // var tableEdges = ["TRUMPEDGETWEETTABLE","BERNIEEDGETWEETTABLE", "CLINTONEDGETWEETTABLE"];


                 var nodeUrl1 = "https://"+dasIp+":9446/analytics/tables/" + tableNodes[0],
                              nodeUrl2 = "https://"+dasIp+":9446/analytics/tables/" + tableNodes[1],
                              nodeUrl3 = "https://"+dasIp+":9446/analytics/tables/" + tableNodes[2],
                              edgeUrl1 = "https://"+dasIp+":9446/analytics/tables/" + tableEdges[0],
                              edgeUrl2 = "https://"+dasIp+":9446/analytics/tables/" + tableEdges[1],
                              edgeUrl3 = "https://"+dasIp+":9446/analytics/tables/" + tableEdges[2];


          $.when(

     /* Sending concurrent 6 ajax calls */
                          $.ajax({

                                     url: nodeUrl1,
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                     },
                                     method: "GET",
                                     contentType: "application/json",
                                     success:function(data){
                                      dataN1=data;
                                      console.log(dataN1);
                                     }
                                 }),

                          $.ajax({

                                     url: nodeUrl2,
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                     },
                                     method: "GET",
                                     contentType: "application/json",
                                     success:function(data){
                                         dataN2=data;
                                     }
                                 }),

                          $.ajax({

                                     url: nodeUrl3,
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                     },
                                     method: "GET",
                                     contentType: "application/json",
                                     success:function(data){
                                         dataN3=data;
                                     }
                               }),
                          $.ajax({

                                     url: edgeUrl1,
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                     },
                                     method: "GET",
                                     contentType: "application/json",
                                     success:function(data){
                                         dataE1=data;
                                     }

                                 }),

                          $.ajax({

                                     url: edgeUrl2,
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                     },
                                     method: "GET",
                                     contentType: "application/json",
                                     success:function(data){
                                         dataE2=data;
                                     }
                                 }),

                          $.ajax({

                                     url: edgeUrl3,
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
                                     },
                                     method: "GET",
                                     contentType: "application/json",
                                     success:function(data){
                                         dataE3=data;
                                     }

                                 })

            ).then(function(){

               //  console.log(dataN1);
                 //console.log(dataN2);
                 //console.log(dataN3);
                 //console.log(dataE1);
                 //console.log(dataE2);
                 //console.log(dataE3);

                 loadNodeData3(Nodes,dataN1,dataN2,dataN3);
                 loadEdgesData3(Edges,dataE1,dataE2,dataE3);
                 renderNodesEdges(Nodes,Edges);



          });




         function loadNodeData3(Nodes,dataN1,dataN2,dataN3){
                      for (var i = 0; i < dataN1.length; i++) {//
                                        var d = dataN1[i].values;
                                        d.color = tableColor[0];
                                        Nodes.push(d);


                                    }
                      for (var i = 0; i < dataN2.length; i++) {//
                                        var d = dataN2[i].values;
                                        d.color = tableColor[1];
                                        Nodes.push(d);


                                    }
                      for (var i = 0; i < dataN3.length; i++) {//
                                        var d = dataN3[i].values;
                                        d.color = tableColor[2];
                                        Nodes.push(d);


                                    }


         }
             function loadEdgesData3(Edges,dataE1,dataE2,dataE3){
                                 for (var i = 0; i < dataE1.length; i++) {  //
                                        var d = dataE1[i].values;
                                        Edges.push(d);

                                    }
                                 for (var i = 0; i < dataE2.length; i++) {  //
                                        var d = dataE2[i].values;
                                        Edges.push(d);

                                    }
                                 for (var i = 0; i < dataE3.length; i++) {  //
                                        var d = dataE3[i].values;
                                        Edges.push(d);

                                    }

             }





     }

function renderNodesEdges(dataset1,dataset2){
                dataset1.forEach(function (d) {
                   // alert(d.name);
                   map[d.name] = index;
                   d.degree = parseInt(d.degree)
                   index++;
               });

               graph.nodes = dataset1;
            //  tlinks = new Object();
               dataset2.forEach(function (d) {

                   /*
                    Data Format Edge
                    ================
                    source
                    target
                    value

                    Data Format Vertex
                    ================
                    name
                    group
                    degree - decide size of the vertex

                    */

                   var s = map[d.source];
                   var t = map[d.target];

                   if (typeof  s === "undefined" || typeof  t === "undefined") {
                      // console.log("unknown vertex " + d.source + "->" + d.target);
                       d.source = 1
                       d.target = 2;

                   } else {
                       d.source = map[d.source];
                       d.target = map[d.target];
                       d.value = parseInt(d.value)
                   }
               });

               graph.links = dataset2;
               console.log("both loaded 2");
               drapGraph(graph);



}



   function drapGraph(graph) {

             svg.selectAll(".link").remove();
             svg.selectAll(".gnode").remove();
                var radius =30;
             var  force = self.force = d3.layout.force()
                       .nodes(graph.nodes)
                       .links(graph.links)
                       .gravity(.05)
                       .distance(60)
                       .charge(-120)
                       .size([width, height])
                       .start();
                  setTimeout(function(){force.stop();},3000);

               //map radius  domain--> range
               var rScale = d3.scale.linear()
                       .domain([d3.min(graph.nodes, function (d) {
                           return Math.log(d.group);
                       }), d3.max(graph.nodes, function (d) {
                           return Math.log(d.group);
                       })])
                       .range([0, radius]);

               var link = svg.selectAll(".link")
                       .data(graph.links)
                       .enter().append("line")
                       .attr("class", "link")
                       .style("stroke-width", 2)
                       .style("stroke-length", function (d) {return (10000/d.value);});// 2 * Math.sqrt(d.value)



               var node = svg.selectAll(".gnode")
                       .data(graph.nodes)
                       .enter().append("g")
                       .attr("class", "gnode")
                       .on('mouseover', tip.show)
                       .on('mouseout', tip.hide)
                        .on( 'click', function(d){
                            if(n==2){
                                if(d.color=="#f39c12"){
                                       ajaxPopular(DBmap.get(candidate1.name));
                                        console.log(DBmap.get(candidate1.name));
                                 }else {
                                       ajaxPopular(DBmap.get(candidate2.name));
                                        console.log(DBmap.get(candidate2.name));
                                 }
                             }else{
                                                       if(d.color=="#f39c12"){
                                                          ajaxPopular(DBmap.get(candidate1.name));
                                                           console.log(DBmap.get(candidate1.name));
                                                       }else if(d.color=="#9b59b6"){
                                                         ajaxPopular(DBmap.get(candidate2.name));
                                                           console.log(DBmap.get(candidate2.name));
                                                       }else{
                                                          ajaxPopular(DBmap.get(candidate3.name));
                                                            console.log(DBmap.get(candidate3.name));
                                                       }


                             }  } )
                       .call(force.drag);

               var maxretweets = d3.max(graph.nodes, function (d) {
                   return Math.log(d.group);
               });
               var minretweets = d3.min(graph.nodes, function (d) {
                   return Math.log(d.group);
               });
               var maxContent = d3.max(graph.nodes, function (d) {
                   return d.degree;
               });
               var minvalue = d3.min(graph.links, function (d) {
                   return d.value;
               });

               var circle = node.append("circle")
                       .attr("r", function (d) {
                           return rScale(Math.log(d.group));
                       })
                       .style("fill", function (d) {
                           return d.color;

                       })
                        .style("stroke", "#000000")
                       .on('mouseover', tip.show)
                       .on('mouseout', tip.hide)
                       .on( 'click', function(d){
                        if(n==2){
                                if(d.color=="#f39c12"){
                                       ajaxPopular(DBmap.get(candidate1.name));
                                        console.log(DBmap.get(candidate1.name));
                                 }else {
                                       ajaxPopular(DBmap.get(candidate2.name));
                                        console.log(DBmap.get(candidate2.name));
                                        console.log(candidate2.name);
                                 }
                             }else{
                                                       if(d.color=="#f39c12"){
                                                          ajaxPopular(DBmap.get(candidate1.name));
                                                           console.log(DBmap.get(candidate1.name));
                                                       }else if(d.color=="#9b59b6"){
                                                         ajaxPopular(DBmap.get(candidate2.name));
                                                           console.log(DBmap.get(candidate2.name));
                                                       }else{
                                                          ajaxPopular(DBmap.get(candidate3.name));
                                                            console.log(DBmap.get(candidate3.name));
                                                       }


                             }
                         } )
                       .call(force.drag);


       //give you nodes with labels

               var label = node.append("text")
                       .style("font-family", "sans-serif")
                       .style("text-anchor", "middle")
                       .style("font-size", "8")
                       .style("stroke", "#404040")
                       .text(function (d) {

                           if (rScale(Math.log(d.group)) > 5) {
                               return d.name;
                           }
                       });

                 /*  node.append("title")
                       .text(function (d) {
                           return d.name;
                       });  */

             /*     node.selectAll("circle.node").on("click", function() {
                   d3.select(this);
                 }); */

       force.on("tick", function () {

                     /*  node.attr("cx", function (d) {
                                 return d.x = Math.max(radius, Math.min(width - radius, d.x));
                            })
                           .attr("cy", function (d) {
                               return d.y = Math.max(radius, Math.min(height - radius, d.y));
                           }); */

                   circle.attr("cx", function (d) {
                                return d.x = Math.max(radius, Math.min(width - radius, d.x))
                            })
                           .attr("cy", function (d) {
                               return d.y = Math.max(radius, Math.min(height - radius, d.y));
                           });

                   label.attr("x", function (d) {
                       return d.x;
                   })
                           .attr("y", function (d) {
                               return d.y;
                           });

                 /*  gnodes.attr("cx", function (d) {
                                         return d.x;
                              })
                             .attr("cy", function (d) {
                                            return d.y;
                                        }); */
                    link.attr("x1", function (d) {
                                               return d.source.x;
                                               })
                                              .attr("y1", function (d) {
                                                  return d.source.y;
                                              })
                                              .attr("x2", function (d) {
                                                  return d.target.x;
                                              })
                                              .attr("y2", function (d) {
                                                  return d.target.y;
                                              });



               });

       }



}

//------------------------------------------------------------------------------------------------------------


var ajaxGarphSentiment = function(ur,TopName,secondName,ChooseName){
var Candidates = { Choose : "Bernie", Top : "Trump" , Second : "Clinton"};
        $.ajax({
            url: ur,
            dataType: "json",    
	    contentType:'application/json',
    	    data: JSON.stringify(Candidates),
            type: "POST",
            success: function(data){
                if(data){ 
		     text =  {
			  "width": 600,
			  "height": 320,
			   "data": [
			   {
			     "name": "table",
			     "values":JSON.stringify(data),
			     "format": {"type": "json", "parse": {"Date": "date", "Rate": "number", "Candidate": "string"}}
			   }
			 ],
			  "scales": [
		  	 {
			     "name": "x",
			     "type":  "time",
			     "range": "width",
			     "zero": false,
			     "domain": {"data": "table", "field": "Date"}
			   },
			    {
			     "name": "y",
			     "type": "linear",
			     "range": "height",
			     "nice": true,
			     "zero": false,
			     "domain": {"data": "table", "field": "Rate"}
			   }
			   ,
			    {
			      "name": "c",
			      "type": "ordinal",
			      "range": "category10",
			      "domain": {"data": "table", "field": "Candidate"}
			    }
			  ],
			   "axes": [
				   {"type": "x", "scale": "x","grid": true},
				   {"type": "y", "scale": "y","grid": true}
				 ],
			  "legends": [
			    {"fill": "c", "title": "Candidate"}
			  ],
			"marks": [
			    {
			      "type": "group",
			      "from": {
				"data": "table",
				"transform": [{"type": "facet", "groupby": ["Candidate"]}]
			      },
			      "marks": [
				{
				  "type": "line",
				  "properties": {
				    "update": {
				      "x": {"scale": "x", "field": "Date"},
				      "y": {"scale": "y", "field": "Rate"},
				      "stroke": {"scale": "c", "field": "Candidate"},
				      "strokeWidth": {"value": 2}
				    }
				  }
				}
			      ]
			    }
			  ]
			};
                     };	
		var viewUpdateFunction = (function(chart) {
		this.view = chart({el:"#sentimentGrP"}).update();
		}).bind(this);
		vg.parse.spec(text, viewUpdateFunction);
            },
	    error: function(er){
		alert("Error Graph Sentiment" + er);
	   }
        });
    };




var ajaxLatest = function(){
        $.ajax({
            url: "js/LatestTweetserver.jag",
            dataType: "json",
            type: "POST",
            success: function(data){
                var table = $("#nt-latest");
		$("#nt-latest"+" li").remove();
                if(data){
                    $.each(data,function(i,e){
                        table.append("<li>"+e+"</li>");
                    });
                }
            },
	    error: function(e){
		alert("Error" + e);
	   }
        });
    };
var ajaxNews = function(){
        $.ajax({
            url: "js/NewsServer.jag",
            dataType: "json",    
            type: "POST",
            success: function(data){
		//alert("sss");
                var table = $("#nt-news");
		$("#nt-news"+" li").remove();
                if(data){
                    $.each(data,function(i,e){
                        table.append("<li>"+e+"</li>");
                    });
                }
            },
	    error: function(er){
		alert("Error From News" + er);
	   }
        });
    };
var ajaxHtag = function(ID,name){
	var Candidat = { Choose : name};
	$.ajax({
            url: "js/HTagServer.jag",
            dataType: "json",    
	    contentType:'application/json',
    	    data: JSON.stringify(Candidat),
            type: "POST",
            success: function(data){
		//alert("sss");
                var table = $(ID);
		$(ID+" tr").remove();
                if(data){
                    $.each(data,function(i,e){
                        table.append("<span>"+e+"</span>");
                    });
                }
            },
	    error: function(er){
		alert("Error From HTag" + er);
	   }
        });
    };
var ajaxPopular = function(ChooseName){
var Candidat = { Choose : ChooseName};
        $.ajax({
            url: "js/PopularServer.jag",
            dataType: "json",    
	    contentType:'application/json',
    	    data: JSON.stringify(Candidat),
            type: "POST",
            success: function(data){
		//alert("sss");
                var table = $("#nt-popular");
		$("#nt-popular"+" li").remove();
                if(data){
                    $.each(data,function(i,e){
                        table.append("<li>"+e+"</li>");
                    });
                }
            },
	    error: function(er){
		alert("Error Popular Tweet" + er);
	   }
        });
    };

//----------------------------------------------------------------------------------ours----------------------
(function ($) {
    /* ========================================================================
     * pre-loader function
     * ======================================================================== */
    $.fn.loading = function (options) {
        var settings = $.extend({
            // defaults.
            action: "show",
            element: "",
            loadIcon: "fw-wso2-logo",
            loadAnimation: "fw-pulse",
            loadingText: "Fetching Data..."
        }, options);
        var loaderString = '<div class="loader-wrapper text-center"><i class="icon fw '+settings.loadIcon +' '+settings.loadAnimation+'"></i><br/><span>'+settings.loadingText+'</span><div>';
        var loaderHeight = $(this).height();

        return $(this).each(function () {
            if (settings.action === 'show') {
                $(this).children().hide();
                $(this).prepend(loaderString).addClass('loading');
                $(".loader-wrapper").height(loaderHeight);
                $(".loader-wrapper").css("padding-top", loaderHeight / 2 - 50);
            }
            if (settings.action === 'hide') {
                $(this).children().show();
                $(".loader-wrapper").remove();
            }
        });

    };
}(jQuery));
