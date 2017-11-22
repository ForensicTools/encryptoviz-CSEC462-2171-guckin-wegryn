$(document).ready(function(){
	$("#input-form").on("submit", function(e){
		e.preventDefault();
		var form=$("#input-form")[0];
		post_subnet($("#subnet").val())
	});
});

function post_subnet(subnet){
	var form_data = new FormData();
	form_data.append("subnet", subnet);
	$.ajax({
		"type": "POST",
		"dataType": "text",
		"data": form_data,
		"contentType": false,
		"processData": false,
		beforeSend: function(xhr, settings) {
			if (!csrfSafeMethod(settings.type)  && !this.crossDomain) {
				xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
			}
		},
		success: function(response) {
			charts(response)
			graph(response)
		}
	});
};

//
//This function is used to render the port charts
//
function charts(response) { 
	console.log(response); // for tesing
	response = JSON.parse(response)
	for(var port in response["port_data"]) {  //move through port data
		$("#port_graphs").append( // used to display port number
			'<div class="port_graph"><canvas id="port_' + port + '"></canvas><span>' + port + '</span></div>');
		var ctx = document.getElementById('port_' + port).getContext("2d") //create doughnut
		ctx.width = 235 //set position of doughnut
		ctx.height = 235
		new Chart(ctx, {
			type : "doughnut",
			data : {
				datasets : [{
					data : response["port_data"][port],
					backgroundColor : [
						"rgb(255, 99, 132)", //red
						"rgb(201, 203, 207)", //grey
						"rgb(75, 192, 192)" //green
					]
				}],
				labels : [
					"open",
					"filtered",
					"closed"
				]
			},
			options : {
				responsive : false,
				maintainAspectRatio: false,
				legend : { display : false },
				animation : {
					animateScale : true,
					animateRotate : true
				}
			}
		})
	} // for loop
}


//
//
//
function graph(response) {
	response = JSON.parse(response)
// Add a method to the graph model that returns an
    // object with every neighbors of a node inside:
    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
        var k, neighbors = {}, index = this.allNeighborsIndex[nodeId] || {};
        for (k in index) neighbors[k] = this.nodesIndex[k];
        return neighbors;
    });
	map = new sigma({
		container : "network_map",
		graph : response["map_data"],
		settings : { defaultNodeColor: "#ec5148" }
	})
// We first need to save the original colors of our
            // nodes and edges, like this:
            map.graph.nodes().forEach(function(n) { n.originalColor = n.color; });
            map.graph.edges().forEach(function(e) { e.originalColor = e.color; });
            
            // When a node is clicked, we highlight all of it's immediate neighbors
            map.bind('clickNode', function(e) {
                var nodeId = e.data.node.id, 
                    toKeep = map.graph.neighbors(nodeId);
                toKeep[nodeId] = e.data.node;
                
                map.graph.nodes().forEach(function(n) {
                    if (toKeep[n.id]) n.color = n.originalColor;
                    else n.color = '#eee';
                });
                map.graph.edges().forEach(function(e) {
                    if (toKeep[e.source] && toKeep[e.target]) e.color = e.originalColor;
                    else e.color = '#eee';
                });
                map.refresh();
            });

            // When the stage is clicked, set everything back
            map.bind('clickStage', function(e) {
                map.graph.nodes().forEach(function(n) {
                    n.color = n.originalColor;
                });
                map.graph.edges().forEach(function(e) {
                    e.color = e.originalColor;
                });
                map.refresh();
            });

	force_atlas(map)
}// end of function

function force_atlas(sigInstance){
    var nodes = sigInstance.graph.nodes(), len = nodes.length;
    for (var i = 0; i < len; i++) {
        nodes[i].x = Math.random();
        nodes[i].y = Math.random();
    }
    // Refresh the display:
    sigInstance.refresh();
    // ForceAtlas Layout
    sigInstance.startForceAtlas2({startingIterations : 5});//start but dont recurse
	sigInstance.stopForceAtlas2()
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
