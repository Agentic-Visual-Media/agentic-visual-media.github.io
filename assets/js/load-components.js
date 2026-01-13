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
            footerElement.innerHTML = footerContent;
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