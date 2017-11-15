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
			D3JS(response)
		}
	});
};

//
//GREG CODE HERE
//
function D3JS(response) {
	console.log(response)
}
//
//NOT HERE
//


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
