import { useEffect, useState } from "react"
import { RouteObject, useLocation, useNavigate, useRoutes } from "react-router-dom"

export type RouterGuardProps = {
    routes: RouteObject[]
}

export function RouterGuard(props: RouterGuardProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const [intercept, setIntercepte] = useState(false)

    useEffect(() => {
        // TODO: 权限验证
    }, [props.routes, location])

    return intercept ? <div>No!!!</div> : useRoutes(props.routes)
}