import { styled, theme } from 'styles'

export const Step = styled.div`
  width: 20px;
  height: 20px;
  border: ${({ isEnabled }: { isEnabled: boolean }) =>
    `2px solid ${isEnabled ? theme.color.primary : theme.color.grey}`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

export const Round = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${theme.color.primary};
`

export const Line = styled.div`
  background: ${theme.color.grey};
  height: 1px;
  width: 45px;
`
