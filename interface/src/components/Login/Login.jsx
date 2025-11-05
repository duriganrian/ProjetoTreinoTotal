import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import { GiPadlock } from "react-icons/gi"
import { MdAlternateEmail } from "react-icons/md"
import { IoPersonCircleSharp } from "react-icons/io5"
import styles from './StyleLogin.module.css'
import { ROUTES } from '../../appconfig'

function Login() {
    const [formLogin, setFormLogin] = useState({ email: '', senha: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormLogin(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
  e.preventDefault()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formLogin.email,
    password: formLogin.senha
  })

  if (error) {
    setErrorMessage('Usuário e/ou senha incorretos.')
    return
  }

  // Verifica se a sessão foi criada
  if (!data.session) {
    setErrorMessage('Falha ao iniciar a sessão. Tente novamente.')
    return
  }

  // Salva usuário e sessão
  localStorage.setItem('user', JSON.stringify(data.user))
  localStorage.setItem('session', JSON.stringify(data.session))

  // Redireciona só depois de salvar
  navigate(ROUTES.HOME)
}


    const handleForgotPassword = () => {
        navigate(ROUTES.FORGOT_PASSWORD)
    }

    return (
        <div className={styles.containerLogin}>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <div className="person"><IoPersonCircleSharp className={styles.person} /></div>

                <label>Email:</label>
                <div className={styles.emailWrapper}>
                    <MdAlternateEmail className={styles.email} />
                    <input
                        type="text"
                        name="email"
                        value={formLogin.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        className={styles.inpuLogin}
                    />
                </div>

                <label>Password:</label>
                <div className={styles.passwordWrapper}>
                    <GiPadlock className={styles.cadeado} />
                    <input
                        type="password"
                        name="senha"
                        value={formLogin.senha}
                        onChange={handleChange}
                        placeholder="Senha"
                        className={styles.inpuPassword}
                    />
                </div>

                <button type="submit" className={styles.buttonLogin}>Login</button>

                <button type="button" onClick={handleForgotPassword} className={styles.forgotPasswordButton}>
                    Esqueci minha senha
                </button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Login
