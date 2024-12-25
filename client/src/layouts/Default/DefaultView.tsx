import { Alert, Stack } from "@mui/material"
import css from './DefaultView.module.scss'

export type DefaultViewProps = {
    msg: string
    img?: string
    type?: 'success' | 'error' | 'warning' | 'info'
}

export function DefaultView(props: DefaultViewProps) {
    return (
        <Stack className={css.root}>
            <Alert sx={{width: {xs: '100%', md: 'fit-content'}, boxSizing: 'border-box'}} severity={props.type}>{props.msg}</Alert>
            {!!props.img && <img src={props.img} />}
        </Stack>
    )
}