import * as wss from "./wss.js";
import * as ui from "./ui.js";
import * as constants from "./constants.js";

export const sendPreOffer = (callType, calleePersonalCode) => {
  const data = {
    callType,
    calleePersonalCode,
  };

  wss.sendPreOffer(data);
};

export const handlePreOffer = (data) => {
  console.log(
    `\n\thandlePreoffer method invoked\n\tData:\t${JSON.stringify(data)}`
  );

  const { callType, callerSocketId } = data;

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallRequest(callType, acceptCallHandler, rejectCallHandler);
  }
};

const acceptCallHandler = () => {
  console.log(`Call accepted`);
};

const rejectCallHandler = () => {
  console.log(`Call rejected`);
};
