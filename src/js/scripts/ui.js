// Imported Scripts
import * as dom from "./domUtility.js";
// Imported media
import deleteSVG from "../../media/images/del-btn.svg";

// Function to populate the sidebar with projects
export function populateSidebar(manager) {
    const sidebar = document.querySelector(".sidebar");

    // Reset the content in the sidebar
    

    manager.projects.forEach(project => {
        // Create a div for each project
        const div = dom.newElement("div", null, null, ["sidebar-project"]);
        
        // Append the project title
        div.appendChild(dom.newElement("p", project.title));

        // Append the delete button (using an image as the delete icon)
        div.appendChild(dom.newImg(deleteSVG, null, null, ["del-btn"]));

        // Append the project div to the sidebar
        sidebar.appendChild(div);
    });
}
