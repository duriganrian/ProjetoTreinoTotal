import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import { ROUTES } from '../../appconfig'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Button } from 'react-bootstrap'
import { MdLogout } from 'react-icons/md'
import style from './Navegacao.module.css'
import logo from '../../assets/treino.jpg'

function Navegacao() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [vizualizacaoLogin, setVizualizacaoLogin] = useState(false)
  const navigate = useNavigate()

  // ✅ Checa a sessão do Supabase ao carregar
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsAuthenticated(true)
        // Usa o metadata do Supabase se existir, senão o email
        setUsername(session.user.user_metadata?.nome || session.user.email)
      } else {
        setIsAuthenticated(false)
      }
    }

    checkSession()

    // Listener de mudanças na sessão (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true)
        setUsername(session.user.user_metadata?.nome || session.user.email)
      } else {
        setIsAuthenticated(false)
        setUsername('')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Navega para login
  const handleLogin = () => {
    navigate('/login')
  }

  // Faz logout no Supabase
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setUsername('')
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className={style.bgBodyTertiary}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="80"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id={style.basicNavbarNav}>
          <Nav className={style.meAuto}>
            <Nav.Link href="/" className={style.navLink}>Home</Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link href="/treinos" className={style.navLink}>Registro de Treinos</Nav.Link>

                <NavDropdown title="Cadastrar Treino" id={style.basicNavDropdown}>
                  <NavDropdown.Item href='/CadastroTreino' className={style.navDropdown}>Cadastrar Treino</NavDropdown.Item>
                  <NavDropdown.Item href='/FichaTreino' className={style.navDropdown}>Ficha Treino</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Listagens" id={style.basicNavDropdown}>
                  <NavDropdown.Item href="/listaaluno" className={style.navDropdown}>Lista dos Alunos</NavDropdown.Item>
                  <NavDropdown.Item href="/listaprofessor" className={style.navDropdown}>Lista dos Professores</NavDropdown.Item>
                  <NavDropdown.Item href="/ListaAparelho" className={style.navDropdown}>Lista dos Aparelhos</NavDropdown.Item>
                  <NavDropdown.Item href="/ListaExercicio" className={style.navDropdown}>Lista dos Exercícios</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Cadastre-se" id={style.basicNavDropdown}>
                  <NavDropdown.Item href="/loginaluno" className={style.navDropdown}>Login Aluno</NavDropdown.Item>
                  <NavDropdown.Item href="/loginprofessor" className={style.navDropdown}>Login Professor</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={`Olá ${username.split(' ')[0]}`}
                  id={style.collapsibleNavDropdown}
                  show={vizualizacaoLogin}
                  onMouseEnter={() => setVizualizacaoLogin(true)}
                  onMouseLeave={() => setVizualizacaoLogin(false)}
                >
                  <NavDropdown.Item href={ROUTES.ATUALIZAR_SENHA_PROFESSOR} className={style.navDropdown}>Atualizar Senha</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout} className={style.navDropdown}>
                    <MdLogout /> Sair
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button onClick={handleLogin} className={style.botao} variant="primary">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navegacao
