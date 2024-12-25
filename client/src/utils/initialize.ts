import { userActions } from "@/data/features/user"
import { store } from "@/data/store"
import { constants } from "./global"
import localforage from "localforage"
import { systemActions } from "@/data/features/system"
import { ux } from "./tools"

export async function initialize() {
    localforage.setDriver([localforage.LOCALSTORAGE])
    store.dispatch(userActions.setToken(await localforage.getItem(constants.LOCAL_TOKEN)))
    store.dispatch(userActions.setUserInfo(await localforage.getItem(constants.LOCAL_USER_INFO)))

    const updateSize = () => {
        store.dispatch(systemActions.flush())
        document.body.style.setProperty('--vw', `${store.getState().system.size.width / 100}px`)
        document.body.style.setProperty('--vh', `${store.getState().system.size.height / 100}px`)
    }

    
    /** 注册改变窗口事件 */
    window.onresize = ux.debounce(() => {
        updateSize()
    }, 50, ux.DebounceType.POST)

    const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
    themeMedia.addEventListener('change', ({ matches }) => {
        ux.toggleTheme(matches ? ux.Theme.LIGHT : ux.Theme.DARK)
        store.dispatch(systemActions.flushMediaTheme())
    })

    /** 初始化应用主题 */
    if (themeMedia.matches) {
        ux.toggleTheme(ux.Theme.LIGHT)
    } else {
        ux.toggleTheme(ux.Theme.DARK)
    }

    updateSize()
    
    /** 移除首页加载效果 */
    const overlay: HTMLDivElement = document.querySelector('div.app-overlay')!
    overlay.classList.add('hide')
    setTimeout(() => {
        overlay.remove()
        document.querySelector('style[data-name="preload"]')?.remove()
    }, 250)
}