export const updatePersonalCode = (sid) => {
  const personalCode = document.querySelector("#personal_code_paragraph");
  personalCode.innerHTML = sid;
};
