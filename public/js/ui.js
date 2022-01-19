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

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.showCallingDialog(rejectCallHandler);

  // Remove all dialogs
  const parentDialog = utils.getElement("dialog");
  utils.removeChildren(parentDialog);
  utils.appendChild(parentDialog, callingDialog);
  utils.appendChild(parentDialog, callingDialog);
};

export const removeAllDialogs = () => {
  const dialog = document.querySelector("#dialog");
  utils.removeChildren(dialog);
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDialog = elements.getInfoDialog(
      "Call rejected",
      "Callee rejected your call"
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDialog = elements.getInfoDialog(
      "Callee not found",
      "Please  check personal code"
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    infoDialog = elements.getInfoDialog(
      "Call is not possible",
      "Probably busy try again later"
    );
  }

  if (infoDialog) {
    const dialog = utils.getElement("dialog");
    utils.appendChild(dialog, infoDialog);

    setTimeout(() => {
      removeAllDialogs();
    }, [4000]);
  }
};
