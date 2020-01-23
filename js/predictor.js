$(function () {
    $('form').on('submit', function (event) {
    // using this page stop being refreshing 
    event.preventDefault();
      $.ajax(
        {
            type: "GET",
            dataType: "json",
            async: false,
            url: "https://9upfi662ch.execute-api.us-east-1.amazonaws.com/pred/api",//url
            data: $('form').serialize(),
            success: function(result) {
                document.getElementById("result").innerHTML=result.body;
            },
            error : function() {     
                alert("Some thing is wrong!");    
           }    
        }
    );
    });
  });