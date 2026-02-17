// RTL Language Detection and Application
(function() {
    // List of RTL languages (ISO 639-1 codes)
    const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'yi', 'ji', 'iw', 'ps', 'sd'];

    /**
     * Detects if a language code is RTL
     * @param {string} langCode - Language code (e.g., 'ar', 'en')
     * @returns {boolean} True if RTL language
     */
    function isRTLLanguage(langCode) {
        if (!langCode) return false;
        // Extract primary language code (e.g., 'ar' from 'ar-SA')
        const primaryLang = langCode.split('-')[0].toLowerCase();
        return RTL_LANGUAGES.includes(primaryLang);
    }

    /**
     * Applies RTL direction to the document
     * @param {boolean} isRTL - Whether to apply RTL
     */
    function applyRTL(isRTL) {
        const htmlElement = document.documentElement;
        if (isRTL) {
            htmlElement.setAttribute('dir', 'rtl');
        } else {
            htmlElement.setAttribute('dir', 'ltr');
        }
    }

    /**
     * Detects current page language and applies RTL if needed
     */
    function detectAndApplyLanguage() {
        // Check multiple sources for language detection
        
        // 1. Google Translate meta tag
        const googleTranslateMeta = document.querySelector('meta[name="google"]');
        if (googleTranslateMeta && googleTranslateMeta.content.includes('notranslate')) {
            // Check if Google Translate has set a language
            const lang = document.documentElement.lang;
            if (isRTLLanguage(lang)) {
                applyRTL(true);
                return;
            }
        }
        
        // 2. HTML lang attribute
        const htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang) {
            applyRTL(isRTLLanguage(htmlLang));
            return;
        }

        // 3. Navigator language
        const navLang = navigator.language || navigator.userLanguage;
        if (navLang) {
            applyRTL(isRTLLanguage(navLang));
            return;
        }
    }

    /**
     * Sets up a MutationObserver to detect language changes
     * This handles Google Translate and similar tools that modify the page
     */
    function setupLanguageChangeObserver() {
        const htmlElement = document.documentElement;
        
        // Observer callback to detect attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    if (mutation.attributeName === 'lang') {
                        // Language attribute changed
                        const newLang = htmlElement.getAttribute('lang');
                        applyRTL(isRTLLanguage(newLang));
                    }
                    if (mutation.attributeName === 'dir') {
                        // Ensure our RTL logic is applied
                        const currentLang = htmlElement.getAttribute('lang');
                        if (isRTLLanguage(currentLang) && htmlElement.getAttribute('dir') !== 'rtl') {
                            htmlElement.setAttribute('dir', 'rtl');
                        }
                    }
                }
            });
        });

        // Start observing the html element for attribute changes
        observer.observe(htmlElement, {
            attributes: true,
            attributeFilter: ['lang', 'dir']
        });
    }

    /**
     * Manually set language and apply RTL
     * @param {string} langCode - Language code (e.g., 'ar', 'en')
     */
    window.setLanguage = function(langCode) {
        document.documentElement.setAttribute('lang', langCode);
        applyRTL(isRTLLanguage(langCode));
    };

    /**
     * Get current language setting
     * @returns {string} Current language code
     */
    window.getCurrentLanguage = function() {
        return document.documentElement.getAttribute('lang') || 'en';
    };

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            detectAndApplyLanguage();
            setupLanguageChangeObserver();
        });
    } else {
        detectAndApplyLanguage();
        setupLanguageChangeObserver();
    }

    // Also listen for Google Translate's language change event
    window.addEventListener('load', function() {
        // Check if Google Translate element exists
        if (window.google && window.google.translate) {
            const checkGoogleTranslate = setInterval(() => {
                const googleTranslateElement = document.querySelector('.goog-te-combo');
                if (googleTranslateElement) {
                    googleTranslateElement.addEventListener('change', function() {
                        setTimeout(() => {
                            detectAndApplyLanguage();
                        }, 100);
                    });
                    clearInterval(checkGoogleTranslate);
                }
            }, 100);

            // Stop checking after 5 seconds
            setTimeout(() => clearInterval(checkGoogleTranslate), 5000);
        }
    });
})();
