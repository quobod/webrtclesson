import { appendChild, newElement } from "./utilities.js";

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

    appendChild(dialogButtonContainer, acceptButton);
    appendChild(dialogButtonContainer, rejectButton);
    appendChild(dialogContent, dialogButtonContainer);
    appendChild(dialog, title);
    appendChild(dialog, dialogContent);
    // appendChild(dialogHtml, dialog);
    return dialog;
  }
  return null;
};
