import * as constants from "./constants.js";
import * as elements from "./elements.js";
import * as utils from "./utilities.js";

export const updatePersonalCode = (sid) => {
  const personalCode = document.querySelector("#personal_code_paragraph");
  personalCode.innerHTML = sid;
};

export const showIncomingCallRequest = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "chat" : "video";

  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // Remove all dialogs
  const parentDialog = utils.getElement("dialog");
  utils.removeChildren(parentDialog);
  utils.appendChild(parentDialog, incomingCallDialog);
};
