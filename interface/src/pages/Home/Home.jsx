import './Home.css'
import Welcome from '../../components/Welcome/Welcome'
import Navegacao from '../../components/Navegacao/Navegacao'
import Rodape from '../../components/Rodape/Rodape'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      // Não está logado → volta para Login
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <Navegacao />
      <Welcome />
      <Rodape />
    </>
  )
}

export default Home
