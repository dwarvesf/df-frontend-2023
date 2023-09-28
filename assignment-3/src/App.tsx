import './App.css'
// import { useState, useMemo } from 'react'
// import { useLocalStorage } from 'usehooks-ts'
import { Header } from './components'
import ShowText from './components/ShowText'

// Import types
// import { Book, BookList } from './types/'

function App() {
    return(
        <>
        <Header />
        <ShowText text='123'/>
        </>
    )
}

export default App
