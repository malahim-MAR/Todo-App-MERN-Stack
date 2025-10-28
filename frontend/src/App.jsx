import React from 'react'
import { Route, Router, Routes } from 'react-router'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  return (
    <>
      <div data-theme="forest">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='notedetail/:id' element={<NoteDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </>

  )
}

export default App