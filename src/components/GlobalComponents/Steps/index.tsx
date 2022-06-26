import React from 'react'

import { Row } from 'styles/global'
import { Step, Round, Line } from './style'

const Steps = ({ currentStep, stepCount }: { currentStep: number; stepCount: number }) => {
  const steps = Array.from({ length: stepCount }, (step, index) => (
    <Row key={`step${index}`} alignItems="center">
      <Step isEnabled={index + 1 === currentStep}>{index + 1 <= currentStep && <Round />}</Step>
      {index < stepCount - 1 && <Line />}
    </Row>
  ))
  return <Row>{steps}</Row>
}

export default Steps
