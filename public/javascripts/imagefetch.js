$(document).ready(function(){

	$(":button").click(function(){
		/*$.get( "/api/images/getImg?id=0", function( data ) {
			  console.log("DATA IN FE:: "+data);
			  var data = response.data;
	          var url = window.URL || window.webkitURL;
	          var src = url.createObjectURL(data);
	          $("#result").attr("src", src);
			  //$("#result").attr("src","data:image/png;base64," + data.toString());
			  //$('#result').html('<img src="data:image/jpeg;base64,' + data + '" />');
		});*/
		
		$.ajax({
				type : "GET",
				url : "/api/images/getImg?id="+this.id,
				success : function( data ) {
		          $("#result").attr("src", data);
		}});
		
	});

});