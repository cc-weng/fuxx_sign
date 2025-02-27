/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_BASE: string // api前缀
    readonly VITE_BASE: string // 根路径
    readonly VITE_DEV_PORT: string // 开发服务器的运行端口

    readonly VITE_APP_TITLE: string // 应用标题
    readonly VITE_APP_DESCRIPTION: string // 应用描述
    readonly VITE_APP_AUTHOR: string // 作者
    readonly VITE_APP_VERSION: string // 版本
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}