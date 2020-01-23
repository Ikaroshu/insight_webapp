$(function () {
    $('form').on('submit', function (event) {
    // using this page stop being refreshing 
    event.preventDefault();
      $.ajax(
        {
            type: "GET",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            async: false,
            url: "https://9upfi662ch.execute-api.us-east-1.amazonaws.com/pred/api",//url
            // data: $('#form1').serialize(),
            success: function(result) {
                document.getElementById("result").innerHTML="Predicted 20% dicount probability "
            },
            error : function() {     
                alert("Some thing is wrong!");    
           }    
        }
    );
    });
  });