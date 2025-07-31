// common.js
let translations = {};

// Function to get the user's preferred language from localStorage or the browser
function getPreferredLanguage() {
    // Check if a language is saved in localStorage
    const savedLang = localStorage.getItem('userLang');
    if (savedLang) {
        return savedLang;
    }

    // If not, detect the browser's language
    const browserLang = navigator.language.split('-')[0];
    return browserLang;
}

function setLanguage(lang) {
    document.documentElement.lang = lang; // Set HTML lang attribute

    // Save the selected language to localStorage
    localStorage.setItem('userLang', lang);

    // Update meta tags and title
    document.querySelector('title').textContent = translations[lang]['pageTitle'];
    document.querySelector('meta[name="description"]').setAttribute('content', translations[lang]['metaDescription']);
    // document.querySelector('meta[property="og:title"]').setAttribute('content', translations[lang]['ogTitle']);
    // document.querySelector('meta[property="og:description"]').setAttribute('content', translations[lang]['ogDescription']);
    // document.querySelector('meta[property="twitter:title"]').setAttribute('content', translations[lang]['twitterTitle']);
    // document.querySelector('meta[property="twitter:description"]').setAttribute('content', translations[lang]['twitterDescription']);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key === "footerBranding" || key === "footerDescription") {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}