import { preOfferAnswer } from "./constants.js";
import { appendChild, newElement, addHandler } from "./utilities.js";

export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log(`\n\tReceived call incoming call dialog`);
  const dialogHtml = document.querySelector("#dialog");
  const dialog = newElement("div");
  const dialogContent = newElement("div");
  const title = newElement("p");
  const dialogButtonContainer = newElement("div");
  const acceptButton = newElement("button");
  const rejectButton = newElement("button");

  if (
    null != dialog &&
    null != dialogHtml &&
    null != dialogContent &&
    null != title &&
    null != dialogButtonContainer &&
    null != acceptButton &&
    null != rejectButton
  ) {
    dialog.classList.add("dialog_wrapper");
    dialogContent.classList.add("dialog_content");
    title.classList.add("dialog_title");
    title.innerHTML = `Incoming ${callTypeInfo} Call`;
    dialogButtonContainer.classList.add("dialog_button_container");
    acceptButton.classList.add(`dialog_accept_call_button`);
    rejectButton.classList.add(`dialog_reject_call_button`);

    acceptButton.innerHTML = "Accept Call";
    rejectButton.innerHTML = "Reject Call";

    // register buttons click event
    addHandler(acceptButton, "click", acceptCallHandler);
    addHandler(rejectButton, "click", rejectCallHandler);

    appendChild(dialogButtonContainer, acceptButton);
    appendChild(dialogButtonContainer, rejectButton);
    appendChild(dialogContent, title);
    appendChild(dialogContent, dialogButtonContainer);
    appendChild(dialog, dialogContent);

    return dialog;
  }
  return null;
};

export const showCallingDialog = (rejectCallHandler) => {
  const dialog = newElement("div");
  const dialogContent = newElement("div");
  const title = newElement("p");
  const dialogButtonContainer = newElement("div");
  const rejectButton = newElement("button");

  if (
    null != dialog &&
    null != dialogContent &&
    null != title &&
    null != dialogButtonContainer &&
    null != rejectButton
  ) {
    dialog.classList.add("dialog_wrapper");
    dialogContent.classList.add("dialog_content");
    title.classList.add("dialog_title");
    dialogButtonContainer.classList.add("dialog_button_container");
    rejectButton.classList.add(`dialog_reject_call_button`);

    rejectButton.innerHTML = "Hangup Call";
    title.innerHTML = "<h3>Calling</h3>";

    // register buttons click event
    addHandler(rejectButton, "click", rejectCallHandler);

    appendChild(dialogButtonContainer, rejectButton);
    appendChild(dialogContent, title);
    appendChild(dialogContent, dialogButtonContainer);
    appendChild(dialog, dialogContent);
    return dialog;
  }
};

export const getInfoDialog = (dialogTitle, dialogDescription) => {
  const dialog = newElement("div");
  const dialogContent = newElement("div");
  const title = newElement("p");
  const description = newElement("p");

  if (
    null != dialog &&
    null != dialogContent &&
    null != title &&
    null != description
  ) {
    dialog.classList.add("dialog_wrapper");
    dialogContent.classList.add("dialog_content");
    title.classList.add("dialog_title");

    title.innerHTML = `<h3>${dialogTitle}</h3>`;
    description.innerHTML = `<h3>${dialogDescription}</h3>`;

    appendChild(dialog, dialogContent);
    appendChild(dialogContent, title);
    appendChild(dialogContent, description);

    return dialog;
  }
};
