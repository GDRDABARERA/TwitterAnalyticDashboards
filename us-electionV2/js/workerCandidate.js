/*
*Getting top candidates
*/

var tstart = 0,
    tcount = 5;
var authenticatingString = "YWRtaW46dXNlckBkYXM=";                               //TODO :window.btoa("admin:user@das");

var xhr = new XMLHttpRequest();
xhr.open('GET', encodeURI('https://52.77.25.83:9453/analytics/tables/TOP5'));
xhr.contentType='application/json';
xhr.setRequestHeader('Authorization', 'Basic ' + authenticatingString);

xhr.onload = function() {
    if (xhr.status === 200) {
        //var str ='User\'s name is ' + xhr.responseText;
        //postMessage(str);                                                                   TODO: for testing purpose
        var data=JSON.parse(xhr.responseText);
           var j = 1;
                var array = new Array();

                for (var i = 0; i < 4; i++) {

                    var nameID = "#Cname" + (j);
                    var imageID = "#Cimage" + (j);
                    var countID = "#Ccount" + (j);
                    var cloudDiv = "single-word-cloud" + (j);
                    var ImgUrl=data[i].values.imageUrl;
                    var retweet=data[i].values.retweet;
                    var fullName=data[i].values.fullName;
                    var party=data[i].values.party;
                    var color= data[i].values.color;
                    j++;
                    var jsonOb = new Object();;
                    jsonOb.nameID = nameID;
                    jsonOb.imageID = imageID;
                    jsonOb.countID = countID;
                    jsonOb.cloudDiv = cloudDiv;
                    jsonOb.ImgUrl=ImgUrl;
                    jsonOb.retweet=retweet;
                    jsonOb.fullName=fullName;
                    jsonOb.party=party;
                    jsonOb.color=color;

                    array.push(jsonOb);
                }
                var jsonArray = JSON.parse(JSON.stringify(array))
                console.log(JSON.stringify(jsonArray));
                postMessage(jsonArray);
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();
