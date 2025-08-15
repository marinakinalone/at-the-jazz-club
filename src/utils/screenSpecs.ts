import { UAParser } from 'ua-parser-js'

const createParser = () => {
  return new UAParser(navigator.userAgent)
}

export const isMobileDevice = () => {
  const parser = createParser()
  return parser.getDevice().type === 'mobile'
}

export const isTooSmall = () => {
  const { innerWidth, innerHeight } = window
  return innerWidth < 820 || innerHeight < 760
}
