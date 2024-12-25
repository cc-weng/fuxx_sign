import { BrowserHistory } from 'history'
import { ReactNode, memo, useLayoutEffect, useState } from 'react'
import { Router as ReactRouter } from 'react-router-dom'

export type RouterProps = {
    basename?: string
    children?: ReactNode
    history: BrowserHistory
}

export const Router = memo((props: RouterProps) => {
    const [state, setState] = useState({
        action: props.history.action,
        location: props.history.location
    })

    useLayoutEffect(() => {
        props.history.listen(setState)
    }, [props.history])
    return (
        <ReactRouter
            basename={props.basename}
            children={props.children}
            location={state.location}
            navigator={props.history}
            navigationType={state.action} />
    )
})