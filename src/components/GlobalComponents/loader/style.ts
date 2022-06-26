import { styled } from 'styles'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
`

export const LoaderIcon = styled.img`
  width: 180px;
  height: 180px;
`
