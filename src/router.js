import './style.css';

const routes = {
  '/': '/src/pages/login.html',
  '/index.html': '/src/pages/login.html',
  '/login': '/src/pages/login.html',
  '/board': '/src/pages/board.html'
};

async function loadPage(path) {
  // Normalize path
  let targetPath = path;
  if (path === '' || path === '/') {
    targetPath = '/';
  }

  // Get current session
  const userJson = localStorage.getItem('user');
  let user = null;
  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (e) {
    console.error('Error parsing user from localStorage', e);
    localStorage.removeItem('user');
  }

  // Route Guards:
  // If not logged in and target is a protected route (like /board), redirect to login
  if (!user && targetPath === '/board') {
    window.history.replaceState({}, '', '/login');
    targetPath = '/login';
  }
  // If logged in and target is auth route (like /login or /), redirect to board
  else if (user && (targetPath === '/' || targetPath === '/login' || targetPath === '/index.html')) {
    window.history.replaceState({}, '', '/board');
    targetPath = '/board';
  }

  const pageUrl = routes[targetPath] || routes['/'];
  
  try {
    const response = await fetch(pageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch page ${pageUrl}: ${response.statusText}`);
    }
    const htmlText = await response.text();
    
    // Parse the fetched HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    // Apply body classes to document.body and #app (to prevent flex collapse inside the SPA container)
    const bodyEl = doc.querySelector('body');
    const appEl = document.getElementById('app');
    if (bodyEl) {
      document.body.className = bodyEl.className;
      appEl.className = bodyEl.className + " w-full h-full";
      appEl.innerHTML = bodyEl.innerHTML;
    } else {
      appEl.className = "";
      appEl.innerHTML = htmlText;
    }
    
    // Clean old page styles and inject new ones
    document.querySelectorAll('.dynamic-page-style').forEach(el => el.remove());
    doc.querySelectorAll('style').forEach(styleTag => {
      const newStyle = document.createElement('style');
      newStyle.className = 'dynamic-page-style';
      newStyle.textContent = styleTag.textContent;
      document.head.appendChild(newStyle);
    });

    // Clean old page scripts and inject new ones to execute them
    document.querySelectorAll('.dynamic-page-script').forEach(el => el.remove());
    
    // Extract and run script tags
    const scripts = doc.querySelectorAll('script');
    for (const scriptTag of scripts) {
      // Skip Vite client script to avoid HMR duplicates and console errors
      const srcAttr = scriptTag.getAttribute('src');
      if (srcAttr && srcAttr.includes('/@vite/client')) {
        continue;
      }

      const newScript = document.createElement('script');
      newScript.className = 'dynamic-page-script';
      
      // Copy all attributes (like src, type, etc.)
      Array.from(scriptTag.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Set content if inline script
      if (!scriptTag.src) {
        newScript.textContent = scriptTag.textContent;
      }
      
      document.body.appendChild(newScript);
    }
    
  } catch (error) {
    console.error('Error loading page:', error);
    document.getElementById('app').innerHTML = `
      <div style="padding: 20px; color: red; font-family: sans-serif; text-align: center;">
        <h2>Error loading page</h2>
        <p>${error.message}</p>
        <button onclick="window.navigateTo('/')" style="margin-top: 15px; padding: 8px 16px; background: #5300b7; color: white; border: none; border-radius: 6px; cursor: pointer;">Go to Login</button>
      </div>
    `;
  }
}

// Expose navigateTo globally
window.navigateTo = (path) => {
  window.history.pushState({}, '', path);
  loadPage(path);
};

// Handle history navigation (back/forward)
window.addEventListener('popstate', () => {
  loadPage(window.location.pathname);
});

// Intercept links
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (anchor) {
    const href = anchor.getAttribute('href');
    if (href && (href.startsWith('/') || href === '') && !href.startsWith('//')) {
      e.preventDefault();
      window.navigateTo(href);
    }
  }
});

// Initial load
const initRoute = () => {
  loadPage(window.location.pathname);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRoute);
} else {
  initRoute();
}

