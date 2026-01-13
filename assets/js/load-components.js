/**
 * Component Loader Script
 * This script loads shared header and footer components into pages
 */

// Function to load HTML content from a file
async function loadComponent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading component:', error);
        console.warn('This might be due to CORS policy when opening HTML files directly. Please use a local server.');
        return null; // Return null to indicate failure
    }
}

// Function to set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (href === `./${currentPage}` || 
            (currentPage === 'index.html' && href === './index.html') ||
            (currentPage === '' && href === './index.html')) {
            link.classList.add('active');
        }
    });
}

// Function to initialize components
async function initializeComponents() {
    // Load header component
    const headerElement = document.getElementById('shared-header');
    if (headerElement) {
        const headerContent = await loadComponent('./components/header.html');
        if (headerContent !== null) {
            headerElement.innerHTML = headerContent;
            // Set active navigation item after header is loaded
            setTimeout(setActiveNavItem, 100);
        } else {
            // Show error message if component failed to load
            headerElement.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                    <strong>组件加载失败</strong><br>
                    无法加载header组件。请通过HTTP服务器访问页面，而不是直接打开HTML文件。<br>
                    <small>提示：可以使用 <code>python3 -m http.server 8000</code> 启动本地服务器</small>
                </div>
            `;
        }
    }
    
    // Load footer component
    const footerElement = document.getElementById('shared-footer');
    if (footerElement) {
        const footerContent = await loadComponent('./components/footer.html');
        if (footerContent !== null) {
            // Create a temporary container to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = footerContent;
            
            // Extract script tags before inserting content
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(script => {
                // Remove script from tempDiv
                script.remove();
                // Create new script element and execute it
                const newScript = document.createElement('script');
                if (script.id) newScript.id = script.id;
                if (script.type) newScript.type = script.type;
                if (script.src) newScript.src = script.src;
                if (script.textContent) newScript.textContent = script.textContent;
                // Append to body to execute
                document.body.appendChild(newScript);
            });
            
            // Insert the content without script tags
            footerElement.innerHTML = tempDiv.innerHTML;
            
            // Force limit map size after it loads (for mapmyvisitors)
            const limitMapSize = () => {
                const widgetContainer = footerElement.querySelector('.widgetContainer');
                if (widgetContainer) {
                    // Find all map-related elements
                    const allElements = document.querySelectorAll('*');
                    allElements.forEach(el => {
                        const id = el.id || '';
                        const src = el.src || '';
                        const className = el.className || '';
                        
                        // Check if this element is related to mapmyvisitors
                        if (id.includes('map') || 
                            src.includes('mapmyvisitors') || 
                            className.includes('map') ||
                            (el.tagName === 'IFRAME' && src.includes('map')) ||
                            (el.tagName === 'CANVAS' && (id.includes('map') || className.includes('map')))) {
                            
                            // If element is not inside widgetContainer, move it there
                            if (!widgetContainer.contains(el) && el.parentNode) {
                                try {
                                    widgetContainer.appendChild(el);
                                } catch(e) {
                                    // Element might already be moved
                                }
                            }
                            
                            // Force size constraints
                            if (el.style) {
                                el.style.maxWidth = '300px';
                                el.style.width = '300px';
                                el.style.position = 'relative';
                                el.style.left = 'auto';
                                el.style.right = 'auto';
                                el.style.top = 'auto';
                                el.style.bottom = 'auto';
                            }
                        }
                    });
                }
            };
            
            // Try multiple times to catch the map after it loads
            setTimeout(limitMapSize, 100);
            setTimeout(limitMapSize, 500);
            setTimeout(limitMapSize, 1000);
            setTimeout(limitMapSize, 2000);
            
            // Use MutationObserver to catch dynamically added elements
            const observer = new MutationObserver(() => {
                limitMapSize();
            });
            observer.observe(footerElement, { childList: true, subtree: true });
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            // Show error message if component failed to load
            footerElement.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                    <strong>组件加载失败</strong><br>
                    无法加载footer组件。请通过HTTP服务器访问页面，而不是直接打开HTML文件。<br>
                    <small>提示：可以使用 <code>python3 -m http.server 8000</code> 启动本地服务器</small>
                </div>
            `;
        }
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeComponents);

// Re-initialize components if page is loaded via AJAX or similar
window.addEventListener('load', () => {
    setTimeout(setActiveNavItem, 200);
});