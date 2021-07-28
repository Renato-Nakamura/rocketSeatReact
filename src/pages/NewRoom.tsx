import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'

import '../styles/auth.scss'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../service/firebase'

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const  [newRoom, setNewRoom] = useState('');


    async function createRoom(event:FormEvent) {
        event.preventDefault()

        if(newRoom.trim() ===''){
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <form onSubmit={createRoom}>
                        <input type="text"  placeholder='Nome da sala' 
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}/>
                        <Button type='submit'>Criar sala</Button>
                        <p>Quer entrar em uma sala já existente? <Link to='/'>Clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )

}