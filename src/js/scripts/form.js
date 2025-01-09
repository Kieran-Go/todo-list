// Imported scripts
import * as dom from "./domUtility.js";
import { saveToLocalStorage } from "./storageFunctions.js";
//Imported classes
import Project from "../classes/project.js";

const createForm = (manager, onProjectAdded) => {
  const formElement = dom.newElement("div", null, null, [
    "form",
    "form-project",
  ]);

  const show = () => {
    document.body.appendChild(formElement);
    document.querySelector(".content").classList.add("blur");
  };

  const hide = () => {
    document.body.removeChild(formElement);
    document.querySelector(".content").classList.remove("blur");
  };

  const render = () => {
    formElement.innerHTML = ""; // Clear form content

    // Close button
    const closeBtn = dom.newElement("p", "X", null, ["close-form-btn"]);
    closeBtn.addEventListener("click", hide);
    formElement.appendChild(closeBtn);

    // Form title
    formElement.appendChild(dom.newElement("h1", "New Project"));
    formElement.appendChild(dom.newLabel("project-title", "Project Title:"));

    const titleInput = dom.newInput("text", null);
    formElement.appendChild(titleInput);
    titleInput.focus();

    // Form input validation message
    const validationMsg = dom.newElement("p", "Max Characters: 25", null, [
      "validation-msg",
    ]);
    formElement.appendChild(validationMsg);

    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () => {
      // Validate the form
      const title = titleInput.value.trim();
      if (title === "") {
        validationMsg.textContent = "Error: Empty title";
        validationMsg.classList.add("invalid");
        return;
      }
      if (title.length > 25) {
        validationMsg.textContent = "Error: Title is over 25 characters";
        validationMsg.classList.add("invalid");
        return;
      }

      const newProject = new Project(title, []);
      manager.addProject(newProject);
      saveToLocalStorage("manager", manager);
      onProjectAdded(); // Callback to re-render the sidebar
      hide(); // Close the form
    });

    formElement.appendChild(confirmBtn);
  };

  render(); // Initial render
  return { show, hide };
};

export default createForm;
