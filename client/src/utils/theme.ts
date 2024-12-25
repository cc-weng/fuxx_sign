import { createTheme, useMediaQuery } from "@mui/material"
import { zhCN } from '@mui/material/locale'
import { useMemo } from "react"

export function useTheme() {
    const media = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = useMemo(() => createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 390,
                md: 720,
                lg: 960,
                xl: 1080,
            },
        }, 
        palette: {
            mode: media ? 'dark' : 'light',
        }
    }, zhCN), [media])
    
    return theme
}