 var authenticatingString = "YWRtaW46dXNlckBkYXM=";                               //TODO :window.btoa("admin:user@das");

  var dNode;

  var Nodes=[];

    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', encodeURI('https://52.77.25.83:9453/analytics/tables/ELECTIONNODE'));
    xhr1.contentType='application/json';
    xhr1.setRequestHeader('Authorization', 'Basic ' + authenticatingString);

    xhr1.onload = function() {
        if (xhr1.status === 200) {
         //   var str ='User\'s name is ' + xhr1.responseText;
           // console.log(str);                                                                   //TODO: for testing purpose
             dNode=JSON.parse(xhr1.responseText);
             for(var k in dNode) {
                var j=dNode[k].values;
                console.log(j);
                Nodes.push(j);
             }
             postMessage(Nodes);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr1.status);
        }
    };
    xhr1.send();
