import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webrtchandler.js";
import * as constants from "./constants.js";

// init socket connection
const socket = io("/");
wss.registerSocketEvents(socket);

// register event listener for personal code button
const personalCodeCopyButton = document.querySelector(
  "#personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// register listeners for connetion buttons
const personalCodeChatButton = document.querySelector(
  "#personal_code_chat_button"
);
const personalCodeVideoButton = document.querySelector(
  "#personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
  console.log("Personal chat button clicked");

  const calleePersonalCode = document.querySelector("#personal_code_input");
  const callType = constants.callType.CHAT_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode.value);
});

personalCodeVideoButton.addEventListener("click", () => {
  console.log("Personal video button clicked");

  const calleePersonalCode = document.querySelector("#personal_code_input");
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode.value);
});
