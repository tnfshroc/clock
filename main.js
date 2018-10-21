//取得畫布
var c = document.getElementById("myCanvas");
//取得繪圖區域
var ctx = c.getContext("2d"); 
//取得螢幕尺寸，設定畫布跟變數
var ww=c.width=$(window).outerWidth();
var wh=c.height=$(window).outerHeight();
//設定中心點
var center={x: ww/2,y: wh/2};
//因為上下顛倒的關係，scaleY給-1

function getWindowSize(){
  //設定大小
  ww=c.width=$(window).outerWidth();
  wh=c.height=$(window).outerHeight();
  
  //重新設定中心點
  center={x: ww/2,y: wh/2};
  
  //將畫布的零點偏移到中心
  ctx.restore();
  ctx.translate(center.x,center.y);
}

//設定當網頁尺寸變動的時候要重新抓跟設定大小、中心
$(window).resize(getWindowSize);
getWindowSize();

//整個程式的時間，用來做些動態
var time=0;

//設定十毫秒一次
setInterval(draw,10);



function draw(){

  //清除背景
  ctx.fillStyle = "#111";
  ctx.beginPath();
  //起點/長/寬
  ctx.rect(-2000,-2000,4000,4000);
  ctx.fill();
  
  //坐標軸
  ctx.strokeStyle="rgba(255,255,255,0.1)";
  ctx.lineWidth=1;
  //x
  ctx.moveTo(-ww/2,0);
  ctx.lineTo(ww/2,0);
  //y
  ctx.moveTo(0,-wh/2);
  ctx.lineTo(0,wh/2);
  ctx.stroke();

  //------------------------------
  //繪製變動弧線
  //設定半徑
  var r=200;
  //將角度轉換為弧度
  var deg_to_pi=Math.PI/180;
  
  //重新開始繪製
  ctx.beginPath();
  ctx.lineWidth=1;
  for(var i=0;i<=200;i++){
    //設定變動的半徑跟角度
    // var var_r = r;
    var var_r = r + Math.sin(Math.PI*2*i/10+time/20)*2;
    var deg = (i/200)*360 * deg_to_pi;
    //連線
    ctx.lineTo(
      var_r * Math.cos(deg),
      var_r * Math.sin(deg)
    );
  }
  //設定顏色跟繪製
  ctx.strokeStyle="#FFF";
  ctx.stroke();
  
  
  //-----------------------------
  //繪製刻度（內圈）
  
  var r = 220;
  var count = 240;

  ctx.lineWidth=1;
  for(var i=0;i<=count;i++){
    
    //最基本的角度分佈
    var deg = 360*(i/count)*deg_to_pi;
    
    //往內偏移的量
    var pan=(i % 60 == 0 ? -4 : 0);
    
    //長度(用於數設定特定大小)
    var len= 4 + (i % 10 == 0?4:0) + (i % 60 == 0?8:0);
    var opacity=(len>4)?1:0.7;
    
    //開始分結束的半徑
    var start_r = r+pan;
    var end_r = r+pan+len;
    
    //重新開始繪製
    ctx.beginPath();
    ctx.moveTo(
      (start_r) * Math.cos(deg),
      (start_r) * Math.sin(deg)
    );
    ctx.lineTo(
      (end_r) * Math.cos(deg),
      (end_r) * Math.sin(deg)
    );
    
    //設定繪製顏色跟透明度
    ctx.strokeStyle="rgba(255,255,255,"+opacity+")";
    //繪製
    ctx.stroke();
  
  }

  //------------------------------
  //繪製刻度（外圈）
  
  var r = 400;
  var count = 80;

  ctx.lineWidth=1;
  for(var i=0;i<=count;i++){
    //往內偏移的量
    var pan=(i % 60 == 0?-4:0);
    //長度(用於數設定特定大小)
    var len= 4 + (i % 20 == 0?4:0) + (i % 60 == 0?8:0);
    var opacity=(len>4)?1:0.7;
    var deg=360*(i/count)*deg_to_pi;
    
    var start_r=r+pan;
    var end_r=r+pan+len;
    
    //重新開始繪製
    ctx.beginPath();
    ctx.moveTo(
      (start_r)*Math.cos(deg),
      (start_r)*Math.sin(deg)
    );
    ctx.lineTo(
      (end_r)*Math.cos(deg),
      (end_r)*Math.sin(deg)
    );
    
    //設定繪製顏色跟透明度
    ctx.strokeStyle="rgba(255,255,255,"+opacity+")";
    //繪製
    ctx.stroke();
  
  }
  
  function cosDeg(_deg) {
    return Math.cos(_deg * deg_to_pi)
  }
  
  function sinDeg(_deg) {
    return Math.sin(_deg * deg_to_pi)
  }

  
  //-----抓取現在的時間
  var now=new Date();
  var sec=now.getSeconds();
  var min=now.getMinutes();
  var hour=now.getHours();
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  var day=now.getDay();
  var timezone=-now.getTimezoneOffset()/60;
  //更新文字中的時間
  if (sec<10){
  	if (min<10){
    	if (hour<10){
      	if (timezone<0){
        	if (-timezone<10){
			  		$(".time").text("GMT-0"+(-timezone)+"  0"+hour+":0"+min+":0"+sec);
          }else{
			  		$(".time").text("GMT-"+(-timezone)+"  0"+hour+":0"+min+":0"+sec);
          }
        }else{
        	if (timezone<10){
			  		$(".time").text("GMT+0"+(timezone)+"  0"+hour+":0"+min+":0"+sec);
          }else{
			  		$(".time").text("GMT+"+(timezone)+"  0"+hour+":0"+min+":0"+sec);
          }        
        }
      }else{
      	if (timezone<0){
        	if (-timezone<10){
			  		$(".time").text("GMT-0"+(-timezone)+"  "+hour+":0"+min+":0"+sec);
          }else{
			  		$(".time").text("GMT-"+(-timezone)+"  "+hour+":0"+min+":0"+sec);
          }
        }else{
        	if (timezone<10){
			  		$(".time").text("GMT+0"+(timezone)+"  "+hour+":0"+min+":0"+sec);
          }else{
			  		$(".time").text("GMT+"+(timezone)+"  "+hour+":0"+min+":0"+sec);
          }        
        }
	  		//$(".time").text("+00:"+hour+":0"+min+":0"+sec);       
      }
    }else{
    	if (hour<10){
        if (timezone<0){
            if (-timezone<10){
              $(".time").text("GMT-0"+(-timezone)+"  0"+hour+":"+min+":0"+sec);
            }else{
              $(".time").text("GMT-"+(-timezone)+"  0"+hour+":"+min+":0"+sec);
            }
          }else{
            if (timezone<10){
              $(".time").text("GMT+0"+(timezone)+"  0"+hour+":"+min+":0"+sec);
            }else{
              $(".time").text("GMT+"+(timezone)+"  0"+hour+":"+min+":0"+sec);
            }        
          }
	  		//$(".time").text("+00:0"+hour+":"+min+":0"+sec);    
      }else{
      if (timezone<0){
        	if (-timezone<10){
			  		$(".time").text("GMT-0"+(-timezone)+"  "+hour+":"+min+":0"+sec);
          }else{
			  		$(".time").text("GMT-"+(-timezone)+"  "+hour+":"+min+":0"+sec);
          }
        }else{
        	if (timezone<10){
			  		$(".time").text("GMT+0"+(timezone)+"  "+hour+":"+min+":0"+sec);
          }else{
			  		$(".time").text("GMT+"+(timezone)+"  "+hour+":"+min+":0"+sec);
          }        
        }
	  		//$(".time").text("+00:"+hour+":"+min+":0"+sec);       
      }    	
    }
  }else{
		if (min<10){
    	if (hour<10){
        if (timezone<0){
            if (-timezone<10){
              $(".time").text("GMT-0"+(-timezone)+"  0"+hour+":0"+min+":"+sec);
            }else{
              $(".time").text("GMT-"+(-timezone)+"  0"+hour+":0"+min+":"+sec);
            }
          }else{
            if (timezone<10){
              $(".time").text("GMT+0"+(timezone)+"  0"+hour+":0"+min+":"+sec);
            }else{
              $(".time").text("GMT+"+(timezone)+"  0"+hour+":0"+min+":"+sec);
            }        
          }
	  		//$(".time").text("+00:0"+hour+":0"+min+":"+sec);    
      }else{
        if (timezone<0){
            if (-timezone<10){
              $(".time").text("GMT-0"+(-timezone)+"  "+hour+":0"+min+":"+sec);
            }else{
              $(".time").text("GMT-"+(-timezone)+"  "+hour+":0"+min+":"+sec);
            }
          }else{
            if (timezone<10){
              $(".time").text("GMT+0"+(timezone)+"  "+hour+":0"+min+":"+sec);
            }else{
              $(".time").text("GMT+"+(timezone)+"  "+hour+":0"+min+":"+sec);
            }        
          }
	  		//$(".time").text("+00:"+hour+":0"+min+":"+sec);       
      }
    }else{
    	if (hour<10){
        if (timezone<0){
            if (-timezone<10){
              $(".time").text("GMT-0"+(-timezone)+"  0"+hour+":"+min+":"+sec);
            }else{
              $(".time").text("GMT-"+(-timezone)+"  0"+hour+":"+min+":"+sec);
            }
          }else{
            if (timezone<10){
              $(".time").text("GMT+0"+(timezone)+"  0"+hour+":"+min+":"+sec);
            }else{
              $(".time").text("GMT+"+(timezone)+"  0"+hour+":"+min+":"+sec);
            }        
          }
	  		//$(".time").text("+00:0"+hour+":"+min+":"+sec);    
      }else{
      	if (timezone<0){
        	if (-timezone<10){
			  		$(".time").text("GMT-0"+(-timezone)+"  "+hour+":"+min+":"+sec);
          }else{
			  		$(".time").text("GMT-"+(-timezone)+"  "+hour+":"+min+":"+sec);
          }
        }else{
        	if (timezone<10){
			  		$(".time").text("GMT+0"+(timezone)+"  "+hour+":"+min+":"+sec);
          }else{
			  		$(".time").text("GMT+"+(timezone)+"  "+hour+":"+min+":"+sec);
          }        
        }
	  		//$(".time").text("+00:"+hour+":"+min+":"+sec);       
      }    	
    }  
  }
  switch (day){
    case 0:
      var myday = "Sun.";
      break;
    case 1:
    	var myday = "Mon.";
      break;
    case 2:
    	var myday = "Tue.";
      break;
    case 3:
    	var myday = "Wed.";
      break;
    case 4:
    	var myday = "Thu.";
      break;
    case 5:
    	var myday = "Fri.";
      break;
    case 6:
     	var myday = "Sat.";
      break;
    default:
    	var myday = "GetDayError";
      break;
  }
  if (month<10){
  	if (date<10){
    	$(".date").text(year+"/0"+month+"/0"+date+"  "+myday);
    }else{
    	$(".date").text(year+"/0"+month+"/"+date+"  "+myday);    	
    }
  }else{
   	if (date<10){
    	$(".date").text(year+"/"+month+"/0"+date+"  "+myday);
    }else{
    	$(".date").text(year+"/"+month+"/"+date+"  "+myday);    	
    } 
  }
  
  
  //更新訊息
  if ((hour>=23)||(hour<=5)){
  	$(".message").text("Please, Go Bed.");  
  }else if ((hour>=6)&&(hour<=9)){
    $(".message").text("Morning, Slept Well?");  	  
  }else{
    $(".message").text("Boss, CODING Please");  
  }

  // 已經有的變數
  // hour -> 小時
  ctx.beginPath(); // 我要開始畫圖了！
	ctx.lineWidth = 12; // 我的線要多寬
	ctx.moveTo(0,0); // 標出起點
	var r = 75; // 圓的半徑
	var deg = -(hour/12)*360 -(min/60)*30 -(sec/60)*0.5 + 90; // 走到幾度
  ctx.strokeStyle = "rgba(60,186,84,1)";
	ctx.lineTo((r)*cosDeg(deg),(r)*sinDeg(deg)); // 標出終點
	ctx.stroke(); // 畫線 ！
  // cosDeg -> 換cos角度
  // sinDeg -> 換sin角度

 	// min -> 分
  ctx.beginPath(); // 我要開始畫圖了！
	ctx.lineWidth = 9; // 我的線要多寬
	ctx.moveTo(0,0); // 標出起點
	var r = 140; // 圓的半徑
	var deg = -(min/60)*360 -(sec/60)*6  + 90; // 走到幾度
	ctx.strokeStyle = "rgba(244,194,13,1)";
  ctx.lineTo((r)*cosDeg(deg),(r)*sinDeg(deg)); // 標出終點
	ctx.stroke(); // 畫線 ！
  // sec -> 秒
  ctx.beginPath(); // 我要開始畫圖了！
	ctx.lineWidth = 5; // 我的線要多寬
	ctx.moveTo(0,0); // 標出起點
	var r = 180; // 圓的半徑
	var deg = -(sec/60)*360 + 90; // 走到幾度
  ctx.strokeStyle = "rgba(219,50,54,1)";
	ctx.lineTo(r*cosDeg(deg),r*sinDeg(deg)); // 標出終點
	ctx.stroke(); // 畫線 ！
  //建立中心
  ctx.beginPath();
  ctx.arc( 0,0, 10, 0, Math.PI*2, true);
  ctx.fillStyle = "rgba(72,133,237,1)";
	ctx.fill();

 
  
  
  
  //繪製外框
  var r=300;
  var count=240;
  ctx.beginPath();
  ctx.lineWidth=4;
  for(var i=0;i<=count;i++){
    //將240個點平均分布在圓周上，加上一點點時間
    deg= 360 * ( i / count) + time / 200;
    //如果每180度以內餘數 > 90度
    if ( ( deg % 180 ) > 90 ){
      //如果成立就預設要畫
      ctx.lineTo(
        r * Math.cos( deg * deg_to_pi),
        r * Math.sin( deg * deg_to_pi)
      );
    }else{
      //不成立就只移動點，不繪製
      ctx.moveTo(
        r * Math.cos( deg * deg_to_pi),
        r * Math.sin( deg * deg_to_pi)
      );
    }
  }
  
  //設定樣式跟繪製
  ctx.strokeStyle="#FFF";
  //將剛剛預設要畫的都畫出來
  ctx.stroke();
  
  //更新繪製的時間
  time=time+1;
}
