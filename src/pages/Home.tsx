import illustrationImg from '../assets/images/illustration.svg'
import googleImg from '../assets/images/google-icon.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/auth.scss'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../service/firebase'


export function Home() {

    const history = useHistory()
    //importando o auth
    const {user , signInWithGoogle} = useAuth()

    const [roomCode, setRoomCode] = useState('')

    async function toCreateRoom(){
        //caso n tenha usuario logado, fazer login, caso tenha entrar direto
        if(!user){
            await signInWithGoogle();
        }else{
            history.push('/rooms/new')
        }
    }

    async function enterRoom(event:FormEvent){
        event.preventDefault()

        if(roomCode.trim()===''){
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){

            alert('Essa sala não existe')
            return
        }
        if(roomRef.val().closedAt){

            alert('Essa sala foi finalizada.')
            return
        }

        history.push(`/rooms/${roomRef.key}`)
    }

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
                    {/* botao */}
                    <Button onClick={toCreateRoom} className='create-room button' >
                        <img src={googleImg} alt="logo google" />
                        Crie sua sala com o Google
                    </Button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={enterRoom}>
                        <input type="text"  placeholder='Digite o código da sala' onChange={event => setRoomCode(event.target.value)}/>
                        <Button>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )

}