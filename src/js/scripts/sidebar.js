// Imported Scripts
import * as dom from "./domUtility.js";
import { saveToLocalStorage } from "./storageFunctions.js";
import createForm from "./form.js";
import createTaskList from "./taskList.js";
// Imported media
import deleteSVG from "../../media/images/del-btn.svg";

const createSidebar = (manager) => {
  const sidebarElement = document.querySelector(".sidebar");

  // Render the sidebar
  const render = () => {
    // Clear the sidebar
    const content = document.querySelectorAll(".sidebar-project");
    content.forEach((project) => {
      project.remove();
    });

    // Add all projects to the dom
    manager.projects.forEach((project) => addProjectToDom(project));
  };

  // Add a project to the DOM
  const addProjectToDom = (project) => {
    // Create the project div
    const div = dom.newElement("div", null, `project${project.id}`, [
      "sidebar-project",
    ]);

    // Project title
    div.appendChild(dom.newElement("p", project.title));

    // Delete button
    const delBtn = dom.newImg(deleteSVG, null, null, ["del-btn"]);
    delBtn.addEventListener("click", () => deleteProject(project));
    div.appendChild(delBtn);

    // Click event for selecting a project
    div.addEventListener("click", (e) => {
      if (e.target !== delBtn) {
        const taskList = createTaskList(manager, project);
        taskList.init();
      }
    });

    sidebarElement.appendChild(div);
  };

  const deleteProject = (project) => {
    // First delete the project from the manager
    manager.deleteProject(project.id);
    saveToLocalStorage("manager", manager);

    // Re-render the sidebar
    render();

    // Focus on the previous project if the deleted one was in focus
    if (manager.projects.length > 0) {
      const renderedProjectTitle =
        document.querySelector(".main-header h1").textContent;
      if (project.title === renderedProjectTitle) {
        const newFocus = project.id - 1;
        if (newFocus >= 0)
          createTaskList(manager, manager.projects[newFocus]).init();
        else createTaskList(manager, manager.projects[0]).init();
      }
    } else {
      createTaskList(manager, null).init();
    }
  };

  const initAddProjectButton = () => {
    document.querySelector(".add-project-btn").addEventListener("click", () => {
      const form = createForm(manager, render); // Initialize the form
      form.projectForm(); // Setup a project form
      form.show(); // Show the form
    });
  };

  // Initialize the sidebar
  const init = () => {
    render();
    initAddProjectButton();
  };

  return { init };
};

export default createSidebar;
