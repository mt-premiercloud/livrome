(function () {
  'use strict';

  var COOKIE_NAME = 'ph_consent';
  var COOKIE_DAYS = 365;
  var BANNER_ID = 'ph-cookie-banner';
  var MODAL_ID = 'ph-cookie-modal';

  function readConsent() {
    var match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
    if (!match) return null;
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch (e) {
      return null;
    }
  }

  function writeConsent(choice) {
    var payload = {
      essential: true,
      analytics: !!choice.analytics,
      marketing: !!choice.marketing,
      ts: Date.now(),
      v: 1,
    };
    var expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
    document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(payload)) +
      '; expires=' + expires + '; path=/; SameSite=Lax';
    window.phConsent._state = payload;
    window.dispatchEvent(new CustomEvent('ph:consent', { detail: payload }));
    if (window.gtag && payload.analytics) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  window.phConsent = {
    _state: null,
    get: function (key) {
      var s = this._state || readConsent();
      return s ? !!s[key] : false;
    },
    reset: function () {
      document.cookie = COOKIE_NAME + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      this._state = null;
      showBanner();
    },
  };

  function closeBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) el.setAttribute('hidden', '');
  }

  function showBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) el.removeAttribute('hidden');
  }

  function openModal() {
    var el = document.getElementById(MODAL_ID);
    if (!el) return;
    var state = readConsent() || { analytics: false, marketing: false };
    var analyticsInput = el.querySelector('[data-ph-consent-toggle="analytics"]');
    var marketingInput = el.querySelector('[data-ph-consent-toggle="marketing"]');
    if (analyticsInput) analyticsInput.checked = state.analytics;
    if (marketingInput) marketingInput.checked = state.marketing;
    el.removeAttribute('hidden');
    el.setAttribute('aria-hidden', 'false');
    var firstFocus = el.querySelector('input, button');
    if (firstFocus) firstFocus.focus();
  }

  function closeModal() {
    var el = document.getElementById(MODAL_ID);
    if (el) {
      el.setAttribute('hidden', '');
      el.setAttribute('aria-hidden', 'true');
    }
  }

  function wire() {
    var existing = readConsent();
    if (existing) {
      window.phConsent._state = existing;
      closeBanner();
    } else {
      showBanner();
    }

    document.querySelectorAll('[data-ph-consent-action]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var action = btn.getAttribute('data-ph-consent-action');
        if (action === 'accept-all') {
          writeConsent({ analytics: true, marketing: true });
          closeBanner();
          closeModal();
        } else if (action === 'essential') {
          writeConsent({ analytics: false, marketing: false });
          closeBanner();
          closeModal();
        } else if (action === 'customize') {
          openModal();
        } else if (action === 'save-custom') {
          var modal = document.getElementById(MODAL_ID);
          var analytics = !!(modal && modal.querySelector('[data-ph-consent-toggle="analytics"]') && modal.querySelector('[data-ph-consent-toggle="analytics"]').checked);
          var marketing = !!(modal && modal.querySelector('[data-ph-consent-toggle="marketing"]') && modal.querySelector('[data-ph-consent-toggle="marketing"]').checked);
          writeConsent({ analytics: analytics, marketing: marketing });
          closeBanner();
          closeModal();
        } else if (action === 'close-modal') {
          closeModal();
        }
      });
    });

    document.querySelectorAll('[data-ph-consent-open]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
