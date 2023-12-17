import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider, Route,} from "react-router-dom"
import Home from './pages/Home.jsx'
import CreateChat from './pages/CreateChat.jsx'
import Chat from './pages/Chat.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "new",
    element: <CreateChat/>
  },
  {
    path: "chat/:chat_name",
    element: <Chat/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router}/>
)
