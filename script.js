$(document).ready(function() {
  var createValidURLValue = function(value) {
    value = value.trim();
    value = value.toLowerCase();

    value = value.split(' ').join('_');

    return value;
  }

  var fixResultFormat = function(result) {
    for (var i = 0; i < result.length; i++) {
      if (result[i] == "_") {
        result[i] = " ";
      }
    }
    return result;
  }

  var mkSubmitButton = $("#mkSubmit");
  console.log(mkSubmitButton);
  $("#mkSubmit").click(function(e) {
    e.preventDefault();
    var value = $("#mkInput").val();
    value = createValidURLValue(value);
    var myurl= "http://touringplans.com/magic-kingdom/attractions/" + value + ".json";
  	$.ajax({
  	    url : myurl,
        type: 'REST',
  	    dataType : "json",
  	    success : function(json) {
  		      console.log(json);
            var results = "<ul>";
            if (json.length == 0) {
              results += "<li>No such ride found. Please check your spelling and that the ride exists in this specific park</li>";
            }
            else {
              results += "<li>Single Rider option: ";
              if (json.single_rider == "false") {
                results += "no";
              }
              else {
                results += "yes";
              }
              results += "</li>";

              results += "<li>Scale of attraction: " + fixResultFormat(json.scope_and_scale_code) + "</li>";

              results += "<li>Height Restriction: " + json.height_restriction + "\"</li>";

              results += "<li>Best time to go: " + json.when_to_go + "\"</li>";
            }
            results += "</ul>"

        		$("#mkResults").html(results);
  	    }
  	});
  });

})
