import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Rotas } from './routes/routes'
import { ModalProvider } from './components/modal/modalContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <ModalProvider>
          <Rotas />
        </ModalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
