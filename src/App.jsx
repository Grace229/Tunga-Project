import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import SignIn from './views/SignIn'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
