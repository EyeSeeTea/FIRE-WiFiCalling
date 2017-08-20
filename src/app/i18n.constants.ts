export const defaultLang = 'en';
export const availableLanguages = [{
    code: 'en',
    name: 'English'
}, {
    code: 'es',
    name: 'Spanish'
}, {
    code: 'tr',
    name: 'Turkish'
}, {
    code: 'xh',
    name: 'Xhosa'
}
];

export function getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    return availableLanguages.some(x => x.code === language) ? language : defaultLang;
}
