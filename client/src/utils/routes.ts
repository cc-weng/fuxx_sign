import { lazy } from "react"
import { RouteObject } from "react-router-dom"

export const routes: RouteObject[] = Object.entries(import.meta.glob('@/pages/**/index.tsx')).map(([key, module]) => ({
    path: key.slice(10, -10),
    Component: lazy(module as any),
}))