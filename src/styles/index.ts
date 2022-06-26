import baseStyled, { ThemedStyledInterface, ThemeProvider, css, keyframes } from 'styled-components'

export { ThemeProvider, css, keyframes }
export const styled = baseStyled as ThemedStyledInterface
export { theme } from 'styles/theme'
export { mediaQuery } from 'styles/mediaQuery'
