import { ErrorInfo, PureComponent } from "react"
import { DefaultView } from "../Default/DefaultView"
import ErrorIcon from '@/assets/images/Error.svg'

export class ErrorBoundary extends PureComponent<{children: any}, { error: Error | null }> {
    constructor(props: {children: any}) {
        super(props)
        this.state = {
            error: null
        }
    }


    componentDidCatch(error: Error, _: ErrorInfo): void {
        this.setState({
            error
        })
    }

    render() {
        if (this.state.error) {
            return <DefaultView msg={this.state.error.message} img={ErrorIcon} type="error" />
        }
        return this.props.children
    }

}