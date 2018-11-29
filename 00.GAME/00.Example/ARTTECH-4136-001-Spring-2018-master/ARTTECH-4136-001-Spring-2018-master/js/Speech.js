let speech_ready = false;
let speech_on = false;
let speech_text = '';

function speechReady(item_info) {
  let speech01 = 'Me: "Where am I...? I am lost"';
  let speech02 = 'Me: "I need to get out of here"';
  let speech03 = 'Me: "I wonder what behind those doors..?"';
  let speech04 = 'Me: "I wonder who left all these key here..."';
  let speech05 = 'Me: "I feel... something powerful nearby..."';

  let info01 = 'Old Book: ...over 1000 of years... this place was hidden from the world...';
  let info02 = 'Old Book: ...once a glorious Kingdom... was destroyed...by... ...';
  let info03 = 'Old Book: ...time will soon come... the chosen one will return...';
  let info04 = 'Old Book: ...You are close... ...it is near you...';

  let statue_iron = 'Text on the statue: ...Dov ah Zul kin... ';

  switch(item_info) {
    case "world_01_info_01":
      console.log("speech_ready = true", item_info);
      speech_text = speech01;
      speech_ready = true;
      break;
    case "world_01_info_02":
      // console.log("speech_ready = true", item_info);
      speech_text = speech02;
      speech_ready = true;
      break;
    case "world_01_info_03":
      // console.log("speech_ready = true", item_info);
      speech_text = speech03;
      speech_ready = true;
      break;
    case "world_01_info_04":
      // console.log("speech_ready = true", item_info);
      speech_text = info01;
      speech_ready = true;
      break;
    case "world_01_info_05":
      // console.log("speech_ready = true", item_info);
      speech_text = speech03;
      speech_ready = true;
      break;
    case "world_01_info_06":
      // console.log("speech_ready = true", item_info);
      speech_text = info02;
      speech_ready = true;
      break;
    case "world_01_info_07":
      // console.log("speech_ready = true", item_info);
      speech_text = info03;
      speech_ready = true;
      break;
    case "world_01_info_08":
      // console.log("speech_ready = true", item_info);
      speech_text = speech04;
      speech_ready = true;
      break;
    case "world_01_info_09":
      // console.log("speech_ready = true", item_info);
      speech_text = info04;
      speech_ready = true;
      break;
    case "world_01_info_10":
      // console.log("speech_ready = true", item_info);
      speech_text = speech05;
      speech_ready = true;
      break;
    case "statue_iron":
      // console.log("speech_ready = true", item_info);
      level01_03 = level01_03_EXIT;
      speech_text = statue_iron;
      speech_ready = true;
      break;

    default:
      break;
  }
}

function speechAction(speech_text) {
  if (speech_on && speech_ready && !warrior.keyHeld_Action) {
    console.log(warrior.keyHeld_Action);
    speech_ready = false;
  }
  if (speech_on && !speech_ready && warrior.keyHeld_Action) {
    speech_on = false;
  }

  if (warrior.keyHeld_Action && speech_ready) {
    console.log("speech_on = true");
    speech_on = true;
  }

  if (speech_on) {
    colorRect(0, 500, canvas.width, 300, 'black');
    dialogueText(speech_text, 50, canvas.height-40, 'white');
  }
}
