import { Route }         from 'react-router'
import { BrowserRouter } from 'react-router-dom'

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={() => <div>Hello World</div>} />
    </BrowserRouter>
  )
}
