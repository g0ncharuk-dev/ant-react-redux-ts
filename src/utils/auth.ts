const parse: any = JSON.parse;
const stringify: any  = JSON.stringify;

const TOKEN_KEY = 'TOKEN_KEY';

const auth = {
    get(key: string) {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key));
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    },
    set(value: any, key: string, isLocalStorage: boolean) {

        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }

        if (sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }

        return null;
    },
    clear(key: string) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    },
    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }
        if (sessionStorage) {
            sessionStorage.clear();
        }
    },

    getToken(tokenKey = TOKEN_KEY) {
        return auth.get(tokenKey);
    },
    setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
        return auth.set(value, tokenKey, isLocalStorage);
    }

};

export default auth