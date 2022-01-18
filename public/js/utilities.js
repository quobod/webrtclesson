export const newElement = (type) => {
  if (type) {
    return document.createElement(type);
  }
  return null;
};

export const getElement = (idOrClass) => {
  if (document.querySelector(`#${idOrClass}`)) {
    return document.querySelector(`#${idOrClass}`);
  } else if (document.querySelector(`.${idOrClass}`)) {
    return document.querySelector(`.${idOrClass}`);
  }
  return null;
};

export const appendChild = (parent, child) => {
  parent.appendChild(child);
};

export const addAttribute = (element, attribute, value) => {
  element.addAttribute(attribute, value);
};

export const removeChildren = (parent) => {
  parent.querySelectorAll("*").forEach((dialog) => {
    dialog.remove();
  });
};

export const registerHandler = (element, whichEvent, handlerMethod) => {
  element.addEventListener(whichEvent, handlerMethod);
};
