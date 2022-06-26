import React, { ReactElement } from 'react'
import LoadImage from 'assets/icons/loader.svg'
import { Wrapper, LoaderIcon } from './style'

function Loader({ isDisplayed }: { isDisplayed: boolean }): ReactElement {
  if (isDisplayed) {
    return (
      <Wrapper>
        <LoaderIcon id="loader" src={LoadImage} />
      </Wrapper>
    )
  }
  return <></>
}

export default Loader
