import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import Punks from './routes/Punks'

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'punks', element: <Punks /> }
    ]
  }
])
