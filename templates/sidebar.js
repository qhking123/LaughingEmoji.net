// Function to handle sidebar toggle and active state
function setupSidebarInteractions() {
    const parentLinks = document.querySelectorAll('.sidebar-nav .parent-link');
    const currentPath = window.location.pathname.split('/').pop().split('.')[0]; // e.g., "index.html" or "flower.html"，改成”index“或”flower“

    parentLinks.forEach(link => {
        const hasChildren = link.getAttribute('data-has-children') === 'true';
        const subMenu = link.nextElementSibling;

        // Remove existing event listener to prevent duplicates
        const oldLink = link.cloneNode(true);
        link.parentNode.replaceChild(oldLink, link);
        const newLink = oldLink; // Use newLink for attaching events

        // Reset active state for parent links
        newLink.classList.remove('active-sidebar-link');
        if (subMenu) {
            subMenu.classList.remove('expanded'); // Collapse sub-menu by default
        }

        // Toggle functionality for parent links with children
        if (hasChildren) {
            newLink.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent navigation for parent links
                // Toggle only if it's not the active parent (which is expanded by default)
                if (!newLink.classList.contains('active-sidebar-link')) {
                    newLink.classList.toggle('expanded');
                    if (subMenu) {
                        subMenu.classList.toggle('expanded');
                    }
                } else {
                    // If it's the active parent, allow collapsing by clicking again
                    newLink.classList.toggle('expanded');
                    if (subMenu) {
                        subMenu.classList.toggle('expanded');
                    }
                }
            });
        }

        let shouldParentExpand = false;

        // Set active state for child links and determine if parent should expand
        if (hasChildren && subMenu) {
            subMenu.querySelectorAll('.child-link').forEach(childLink => {
                // Reset active state first
                childLink.classList.remove('active-sidebar-link');

                //alert(childLink.href + "&" + currentPath)
                if (childLink.href.includes(currentPath) && currentPath !== "") 
                //if (currentPath.includes(childLink.href) && currentPath !== "") 
                {
                    childLink.classList.add('active-sidebar-link');
                    shouldParentExpand = true; // Mark parent to be expanded
                }
            });
        }

        // Set active state for parent links and expand if necessary
        // A parent link is active if its href matches the currentPath OR if one of its children is active
        //alert(newLink.href + "&" + currentPath)
        if (newLink.href.includes(currentPath) && currentPath !== "") 
        //if (currentPath.includes(newLink.href) && currentPath !== "") 
            {
                newLink.classList.add('active-sidebar-link');
                // If parent itself is the active page, it should also expand if it has children
                if (hasChildren) {
                    shouldParentExpand = true;
                }
        }

        if (shouldParentExpand) {
            newLink.classList.add('expanded');
            if (subMenu) {
                subMenu.classList.add('expanded');
            }
        }
    });

    // Handle "Emojis" header click to go to homepage
    const sidebarHeader = document.querySelector('.sidebar-header');
    // Remove existing event listener to prevent duplicates
    const oldSidebarHeader = sidebarHeader.cloneNode(true);
    sidebarHeader.parentNode.replaceChild(oldSidebarHeader, sidebarHeader);
    const newSidebarHeader = oldSidebarHeader;

    newSidebarHeader.addEventListener('click', () => {
        window.location.href = "index.html";
    });
}

// Initial setup when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Call setupSidebarInteractions initially to set up event listeners and active states
    setupSidebarInteractions();
});

// The language switching logic is now primarily handled in index.html's script.
// The setLanguage function in index.html will call setupSidebarInteractions
// after updating text content.