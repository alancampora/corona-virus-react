import { navigate } from "@reach/router"

export const navigateTo = path => {
  const BASE_PATH = 'corona-virus-react';
  navigate(`${BASE_PATH}/${path}`)
}
