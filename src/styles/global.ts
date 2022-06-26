import baseStyled, { ThemedStyledInterface } from 'styled-components'

import {
  Input as antdInput,
  Form as antdForm,
  Drawer as antdDrawer,
  Select as antdSelect,
  Collapse as antdCollapse,
  Table as antdTable,
} from 'antd'
const { TextArea: antdTextArea } = antdInput

import { theme, mediaQuery } from 'styles'

const styled = baseStyled as ThemedStyledInterface

interface CSS {
  justifyContent: string
  alignItems: string
  width: string
  height: string
  weight: string
  color: string
  size: string
  margin: string
  position: string
  pointer: boolean
  display: boolean
  fontSize: string
  wrap: boolean
  responsive: any
  padding: string
  ellipsis: boolean
  grey: boolean
}

export const Row = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }: CSS) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }: CSS) => alignItems || 'flex-start'};
  margin: ${({ margin }: CSS) => margin || '0'};
  flex-wrap: ${({ wrap }: CSS) => wrap && 'wrap'};
  width: ${({ width }: CSS) => width || ''};
  cursor: ${({ pointer }: CSS) => pointer && 'pointer'};
  ${mediaQuery.mobile} {
    ${({ responsive }: CSS) => responsive};
  }
`

export const Column = styled(Row)`
  flex-direction: column;
`

export const ColumnCenter = styled(Column)`
  justify-content: center;
  align-items: center;
`

export const Title = styled.h1`
  font-weight: ${({ weight }: CSS) =>
    weight === '' ? theme.font.weight.medium : theme.font.weight[weight]};
  color: ${({ color }: CSS) => (color ? theme.font.color[color] : theme.font.color.primary)};
  font-size: ${({ size }: CSS) => (size ? size : theme.font.size.title)};
  margin: ${({ margin }: CSS) => margin || '0'};
  text-align: ${({ position }: CSS) => position || 'center'};
  ${({ ellipsis }: CSS) =>
    ellipsis &&
    `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  `};
`

export const Text = styled.p`
  font-weight: ${({ weight }: CSS) =>
    weight ? theme.font.weight[weight] : theme.font.weight.medium};
  color: ${({ color }: CSS) =>
    color ? theme.font.color[color] || theme.color[color] : theme.font.color.primary};
  font-size: ${({ size }: CSS) => (size ? size : theme.font.size.primary)};
  margin: ${({ margin }: CSS) => margin || '0'};
  text-align: ${({ position }: CSS) => position || 'start'};
  cursor: ${({ pointer }: CSS) => pointer && 'pointer'};
  ${({ grey }: CSS) =>
    grey &&
    `
  color: ${theme.font.color.grey}
  `};
  ${({ ellipsis }: CSS) =>
    ellipsis &&
    `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  `};
`

const defaultInput = `
background-color: white;
border-radius: 6px;
height: 45px;
border: 1px solid ${theme.color.grey};
${mediaQuery.mobile} {
  max-width: 95vw;
  width: 250px;
}
`

export const Input = styled(antdInput)`
  ${defaultInput}
  width: ${({ width }: CSS) => width || '280px'};
  color: ${theme.color.primary};
  border-radius: 6px;
  height: 40px;
`

export const InputPassword = styled(antdInput.Password)`
  ${defaultInput}
  width: ${({ width }: CSS) => width || '280px'};
  color: ${theme.color.primary};
`

export const TextArea = styled(antdTextArea)`
  ${defaultInput}
  height: ${({ height }: CSS) => (height || '150px') + '!important'};
  width: ${({ width }: CSS) => width || '450px'};
  color: ${theme.color.primary};
  ${mediaQuery.mobile} {
    max-width: 95vw;
    width: ${({ width }: CSS) => width || '450px'};
  }
`

export const Select = styled(antdSelect)`
  width: ${({ width }: CSS) => width || '280px'};
  border: none;
  border-radius: 6px;
  height: 45px;
  border: 1px solid ${theme.color.grey};
  ${mediaQuery.mobile} {
    max-width: 95vw;
    width: 250px;
  }
`

export const Form = styled(antdForm)`
  justify-content: center;
  align-items: center;
`

export const Collapse = styled(antdCollapse)`
  background-color: white;
  width: ${({ width }: CSS) => width || '200px'};
`

export const defaultButton = `
border-radius: 8px;
border: none;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
position: relative;
cursor: pointer;
`

export const Button = {
  Primary: styled.button`
    ${defaultButton}
    color: ${theme.color.white};
    background-color: ${theme.color.primary};
    font-size: ${({ fontSize }: CSS) => fontSize || '15px'};
    margin: ${({ margin }: CSS) => margin || '0'};
    width: ${({ width }: CSS) => width || ''};
    height: ${({ height }: CSS) => height || ''};
    padding: ${({ padding }: CSS) => padding || '10px 20px'};
    ${mediaQuery.mobile} {
      ${({ responsive }: CSS) => responsive};
    }
  `,
  Secondary: styled.button`
    ${defaultButton}
    color: ${theme.color.black};
    background-color: transparent;
    border: 1px solid ${theme.color.black};
    font-size: ${({ fontSize }: CSS) => fontSize || '15px'};
    width: ${({ width }: CSS) => width || ''};
    height: ${({ height }: CSS) => height || ''};
    padding: ${({ padding }: CSS) => padding || '10px 20px'};
    margin: ${({ margin }: CSS) => margin || '0'};
    ${mediaQuery.mobile} {
      ${({ responsive }: CSS) => responsive};
    }
  `,
}

export const Display = styled.div`
  display: ${({ display }: CSS) => (display ? 'block' : 'none')};
`

export const Drawer = styled(antdDrawer)`
  padding: 0;
`

export const Table = styled(antdTable)`
  width: 100%;
`
export const Card = styled.div`
  box-shadow: ${theme.shadow};
  background: white;
  border-radius: 6px;
  padding: 25px;
  width: ${({ width }: CSS) => width || ''};
  height: ${({ height }: CSS) => height || ''};
`
