import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme, initTheme, selectTheme } from '../../app/global/themeSlice.js'

export const useTheme = () => {
    const dispatch = useDispatch()
    const mode = useSelector(selectTheme)

    useEffect(() => {
        dispatch(initTheme())
    }, [dispatch])

    useEffect(() => {
        const root = document.documentElement
        if (mode === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [mode])

    return { mode, toggle: () => dispatch(toggleTheme()) }
}
