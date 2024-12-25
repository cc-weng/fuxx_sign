import { Fade } from '@mui/material'
import { useEffect, useState } from 'react'
import css from './Loading.module.scss'


export type LoadingProps = {
    overlay?: string
    text?: string
    color?: string
}

export function Loading(props: LoadingProps) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
        return () => {
            setShow(false)
        }
    }, [])
    return (
        <Fade timeout={300} easing="ease-in" in={show}>
            <div className={`${css.root} ${props.overlay ? 'overlay' : ''}`} style={{ '--bg-color': props.overlay ?? 'transparent', '--color': props.color ?? '#888' } as any}>
                <div className={css.loadingRoot}>
                    <div className={css.loadingWrapper} data-color={props.color ? 'custom' : 'default'}>
                        <em style={{ '--offset': 0 } as any}></em>
                        <em style={{ '--offset': 1 } as any}></em>
                        <em style={{ '--offset': 2 } as any}></em>
                        <em style={{ '--offset': 3 } as any}></em>
                        <em style={{ '--offset': 4 } as any}></em>
                        <em style={{ '--offset': 5 } as any}></em>
                        <em style={{ '--offset': 6 } as any}></em>
                        <em style={{ '--offset': 7 } as any}></em>
                    </div>
                    {!!props.text && <div className={css.loadingText}>{props.text}</div>}
                </div>
            </div>
        </Fade>
    )
}