(function () {
  // Default configuration
  const config = {
    onAnalyticsConsent: null // Callback for analytics consent
  };

  // Allow external configuration
  window.CookieBannerConfig = window.CookieBannerConfig || {};
  Object.assign(config, window.CookieBannerConfig);

  // Create styles
  const styles = `
    .cookie-banner {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #2c2c2c;
      color: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      display: none;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 700px;
      width: 90%;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .cookie-banner.show {
      display: block;
      opacity: 1;
    }

    .cookie-banner p {
      margin: 0 0 15px;
      font-size: 16px;
      line-height: 1.6;
    }

    .cookie-banner .buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .cookie-banner button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s, transform 0.1s;
    }

    .cookie-banner button:hover {
      transform: translateY(-1px);
    }

    .cookie-banner .accept-all {
      background-color: #4CAF50;
      color: #fff;
    }

    .cookie-banner .accept-all:hover {
      background-color: #45a049;
    }

    .cookie-banner .settings {
      background-color: #2196F3;
      color: #fff;
    }

    .cookie-banner .settings:hover {
      background-color: #1e88e5;
    }

    .cookie-banner .save {
      background-color: #4CAF50;
      color: #fff;
    }

    .cookie-banner .save:hover {
      background-color: #45a049;
    }

    .cookie-settings {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      display: none;
    }

    .cookie-settings.show {
      display: block;
    }

    .cookie-settings label {
      display: block;
      margin: 10px 0;
      font-size: 14px;
    }

    .cookie-settings input[type="checkbox"] {
      margin-right: 8px;
      vertical-align: middle;
    }
  `;

  function injectToDom() {
    // Create style element
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create banner HTML
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.innerHTML = `
      <p>We use cookies to provide you with the best experience. You can accept all cookies, customize your preferences, or learn more in our <a href="/s/privacy-policy" style="color: #4CAF50;">Privacy Policy</a>.</p>
      <div class="buttons">
        <button class="settings" onclick="CookieBanner.toggleSettings()">Settings</button>
        <button class="accept-all" onclick="CookieBanner.acceptAll()">Accept All</button>
      </div>
      <div class="cookie-settings" id="cookieSettings">
        <label><input type="checkbox" id="essentialCookies" checked disabled> Essential Cookies (Required)</label>
        <label><input type="checkbox" id="analyticsCookies"> Analytics Cookies</label>
        <label><input type="checkbox" id="marketingCookies"> Marketing Cookies</label>
        <button class="save" onclick="CookieBanner.saveSettings()">Save Settings</button>
      </div>
    `;
    // Append banner to body
    document.body.appendChild(banner);
  }

  // CookieBanner object to manage functionality
  window.CookieBanner = {
    init() {
      document.getElementById('cookieBanner').classList.add('show');
    },

    acceptAll() {
      const consent = {
        essential: true,
        analytics: true,
        marketing: true
      }
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
      this.hideBanner();
      if (config.onAnalyticsConsent) {
        config.onAnalyticsConsent(consent);
      }
    },

    toggleSettings() {
      const settings = document.getElementById('cookieSettings');
      settings.classList.toggle('show');
    },

    saveSettings() {
      const consent = {
        essential: true,
        analytics: document.getElementById('analyticsCookies').checked,
        marketing: document.getElementById('marketingCookies').checked
      };
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
      this.hideBanner();
      config.onAnalyticsConsent(consent);
    },

    hideBanner() {
      document.getElementById('cookieBanner').classList.remove('show');
    }
  };
  function setupBanner() {
    injectToDom();
    window.CookieBanner.init();
  }
  if (document.readyState === 'loading') { // The document is still loading, so wait.
    document.addEventListener('DOMContentLoaded', setupBanner);
  } else { // The DOM is already ready.
    setupBanner();
  }
  // Initialize banner  
})();
