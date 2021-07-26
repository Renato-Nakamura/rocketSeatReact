import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

import '../styles/auth.scss'

export function NewRoom() {

    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Imagem ilustrando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Let me ask" />
                    <form >
                        <input type="text"  placeholder='Nome da sala' />
                        <Button>Criar sala</Button>
                        <p>Quer entrar em uma sala já existente? <Link to='/'>Clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )

}