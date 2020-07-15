let timerObj = {
  minutes: 0,
  seconds: 0,
  timerId: 0
}


function soundAlarm(){
  let amount = 10;

  let audio = new Audio("Timer_Sound_Effect.mp3");

  function playSound(){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  for(let i=0; i<amount; i++){
    setTimeout(playSound, 1200*i);
  }
}



function updateValue(key, value){

  if(value < 0){
    value = 0;
    console.log("Positive values only");
  }

  if(key=="minutes"){
    if(value>300){
      value = 300;
    }
  }

  if(key=="seconds"){

    if(!value){value = 0}
    /*if(value==0){
      value = "00";
    }
    else if(value<10){
      value = "0" + value;
    }*/
    if(value < 10){
      value = "0" + value;
    }
    if(value>59){
      value = 59;
    }
  }

  $("#"+key).html(value || "0");
  timerObj[key] = value;
  console.log("min", timerObj.minutes);
  console.log("sec", timerObj.seconds);

}


(function detectChange(key){
  console.log("changes detected");

  let input = "#" + key + "-input";

  $(input).change(function(){
    updateValue(key, $(input).val());
  })

  $(input).keyup(function(){
    updateValue(key, $(input).val());
  })

  return arguments.callee;
})("minutes")("seconds");











function stopTimer(){
  clearInterval(timerObj.timerId);
  buttonManager(["start", true], ["stop", false], ["pause", false]);
  unfreezeInputs();
  updateValue("minutes", $("#minutes-input").val());
  updateValue("seconds", $("#seconds-input").val());
}

function startTimer(){
  buttonManager(["start", false], ["stop", true], ["pause", true]);
  freezeInputs();

  timerObj.timerId = setInterval(function(){
    timerObj.seconds--;
    if(timerObj.seconds<0){
      if(timerObj.minutes==0){
        soundAlarm();
        return stopTimer();
      }
      timerObj.minutes--;
      timerObj.seconds = 59;
    }

    updateValue("minutes", timerObj.minutes);
    updateValue("seconds", timerObj.seconds);
  }, 1000)
}

function pauseTimer(){
  clearInterval(timerObj.timerId);
  buttonManager(["start", true], ["stop", true], ["pause", false]);
  unfreezeInputs();
}

function buttonManager(...buttonsArray){
  for(let i=0; i<buttonsArray.length; i++){
    let button = "#"+buttonsArray[i][0]+"-button";
    if(buttonsArray[i][1]){
      $(button).removeAttr("disabled");
    }
    else{
      $(button).attr("disabled", "disabled");
    }
  }
}

function freezeInputs(){
  $("#minutes-input").attr("disabled", "disabled");
  $("#seconds-input").attr("disabled", "disabled");
}

function unfreezeInputs(){
  $("#minutes-input").removeAttr("disabled");
  $("#seconds-input").removeAttr("disabled");
}
