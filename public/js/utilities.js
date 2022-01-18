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

export const append = (parent, child) => {
  parent.append(child);
};

export const addAttribute = (theElement, whichAttribute, attributeValue) => {
  if (null != theElement) {
    theElement.setAttribute(whichAttribute, attributeValue);
  }
};

export const removeAttribute = (theElement, whichAttribute) => {
  if (null != theElement) {
    if (theElement.hasAttribute(whichAttribute)) {
      theElement.removeAttribute(whichAttribute);
    }
  }
};

export const removeChildren = (parent) => {
  parent.querySelectorAll("*").forEach((dialog) => {
    dialog.remove();
  });
};

export const addHandler = (theElement, whichEvent, method) => {
  if (null != theElement && null != whichEvent && typeof method == "function") {
    theElement.addEventListener(whichEvent, method);
  }
};

export const size = (arg = null) => {
  if (null != arg) {
    if (Array.isArray(arg)) {
      return arg.length;
    } else if (arg instanceof Object && !Array.isArray(arg)) {
      return Object.keys(arg).length;
    } else if (
      !(arg instanceof Object) &&
      !Array.isArray(arg) &&
      typeof arg == "string"
    ) {
      return arg.length;
    } else {
      return NaN;
    }
  }
  return NaN;
};
