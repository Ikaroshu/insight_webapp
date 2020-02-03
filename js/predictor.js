$(function () {
    $('form').on('submit', function (event) {
    // using this page stop being refreshing 
    event.preventDefault();
      $.ajax(
        {
            type: "GET",
            dataType: "json",
            async: false,
            url: "https://99dittcacj.execute-api.us-west-2.amazonaws.com/ec2gateway/api",//url
            data: $('form').serialize(),
            success: function(result) {
                if (!result.success) {
                  document.getElementById("result").innerHTML=result.reason;
                } else {
                  document.getElementById("steamlink").innerHTML="Steam link: "+"<a href="+"'https://store.steampowered.com/app/"+result.appid+"' target='_blank'>"+result.game+"</a>";
                  var ds;
                  if (result.mostlikely == 1) {
                    ds = "10%~25% discount";
                  } else if (result.mostlikely == 2) {
                    ds = "25%~50% discount";
                  } else if (result.mostlikely == 3) {
                    ds = "50%~75% discount";
                  } else {
                    ds = "70%~100% discount";
                  }
                  if (result.suggestion) {
                    document.getElementById("suggestion").innerHTML="Suggest to buy at "+result.idx+" weeks from now, most likely to have "+ds;
                  } else {
                    document.getElementById("suggestion").innerHTML="Oops, it seems there won't be good chance to have sales, suggest to buy it now."
                  }              
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
                    title: 'Game: ' + result.game + '<br>Probability of discount in the following weeks<br>'+'Hover on the bar to show details',
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