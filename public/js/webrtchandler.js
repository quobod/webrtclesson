import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as store from "./store.js";

let connectedUserDetails;
let peerConection;
let dataChannel;

export const sendPreOffer = (callType, calleePersonalCode) => {
  connectedUserDetails = {
    callType,
    calleePersonalCode,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType == constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };

    ui.showCallingDialog(callingDialogRejectCallHandler);

    wss.sendPreOffer(data);
  }
};

export const handlePreOffer = (data) => {
  console.log(
    `\n\thandlePreoffer method invoked\n\tData:\t${JSON.stringify(data)}`
  );

  const { callType, callerSocketId } = data;

  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    console.log(`\n\tShowing call dialog`);
    ui.showIncomingCallRequest(callType, acceptCallHandler, rejectCallHandler);
  }
};

export const handlePreOfferAnswer = (data) => {
  console.log(`\n\tHandling pre offer answer\n\tData: ${JSON.stringify(data)}`);
  const { preOfferAnswer } = data;

  ui.removeAllDialogs();

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    // show dialog callee not found
    ui.showInfoDialog(preOfferAnswer);
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    // show dialog callee not able to connect
    ui.showInfoDialog(preOfferAnswer);
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    // show dialog callee rejected call
    ui.showInfoDialog(preOfferAnswer);
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
    // send webRTC answer
  }
};

function acceptCallHandler() {
  console.log(`Call accepted`);
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
}

function rejectCallHandler() {
  console.log(`Call rejected`);
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

function sendPreOfferAnswer(preOfferAnswer) {
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferAnswer,
  };

  console.log(
    `\n\tSend pre offer answer to caller\n\tData:\t${JSON.stringify(
      preOfferAnswer
    )}`
  );

  ui.removeAllDialogs();
  wss.sendPreOfferAnswer(data);
}

function callingDialogRejectCallHandler() {
  console.log(`\n\tRejecting the call`);
}
