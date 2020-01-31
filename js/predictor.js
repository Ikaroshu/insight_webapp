$(function () {
    $('form').on('submit', function (event) {
    // using this page stop being refreshing 
    event.preventDefault();
      $.ajax(
        {
            type: "GET",
            dataType: "json",
            async: false,
            url: "http://44.231.250.246/api",//url
            data: $('form').serialize(),
            success: function(result) {
                if (!result.success) {
                  document.getElementById("result").innerHTML=result.reason;
                } else {
                  var t = [];
                  for (var i = 0; i < result.res_week.length; i++) {
                    t.push('Distribution of each category of discount (if discounted):<br>'+
                    '10%~25% discount: '+ (result.discount_distri[i][0]*100).toFixed(0) + '%<br>'+
                    '25%~50% discount: '+ (result.discount_distri[i][1]*100).toFixed(0) + '%<br>'+
                    '50%~75% discount: '+ (result.discount_distri[i][2]*100).toFixed(0) + '%<br>' +
                    '70%~100% discount: '+ (result.discount_distri[i][3]*100).toFixed(0) + '%<br>')
                  }
                  var trace1 = {
                    x: result.res_week,
                    y: result.discount_prob,
                    type: 'bar',
                    text: t,
                    hoverinfo: 'text'
                  };
                  
                  var data = [trace1];
                  
                  var layout = {
                    title: 'game: ' + result.game + '<br>Probability of discount in the following weeks<br>'+'hover on the bar to show details',
                    font:{
                      family: 'Raleway, sans-serif'
                    },
                    hoverlabel: { bgcolor: "#FFF" },
                    bargap :0.05,
                    xaxis: {
                      title: 'week from now',
                      tickvals: result.res_week,
                      ticktext: result.res_week
                    },
                    yaxis: {
                      title: 'discount probability',
                      range: [0,1]
                    }
                  };     
                  Plotly.newPlot('result', data, layout);
                }
                
            },
            error : function() {     
                alert("Some thing is wrong!");    
           }    
        }
    );
    });
  });