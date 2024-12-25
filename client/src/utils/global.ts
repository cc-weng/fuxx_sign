import { createBrowserHistory } from "history"

export const constants = {
    /** 环境变量 */
    APP_TITLE: import.meta.env.VITE_APP_TITLE,
    APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    APP_AUTHOR: import.meta.env.VITE_APP_AUTHOR,
    APP_BASE: import.meta.env.VITE_BASE,
    API_BASE: import.meta.env.VITE_API_BASE,
    
    /* 缓存键名 */
    LOCAL_USER_INFO: 'userinfo',
    LOCAL_TOKEN: 'token',
}

export const history = createBrowserHistory()
export const appRoot = document.querySelector('#root')!