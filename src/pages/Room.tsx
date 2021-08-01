import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../service/firebase'
import '../styles/room.scss'

type RoomParams = {
    id: string
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        photo: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        photo: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}


export function Room() {
    const params = useParams<RoomParams>()
    const { user } = useAuth()
    const roomId = params.id
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            // const databaseRoom = room.val()
            const firebaseQuestion: FirebaseQuestions = room.val().questions ?? {}

            const parsecQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(room.val().title);
            setQuestions(parsecQuestions);
        })
    }, [roomId])

    async function sendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return
        }
        if (!user) {
            throw new Error('Você precisa estar logado')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                photo: user.photo
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Let me ask" />
                    <RoomCode code={roomId}></RoomCode>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length && <span>{questions.length} perguntas</span>}
                </div>

                <form onSubmit={sendQuestion}>
                    <textarea placeholder="O que você deseja perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className='user-info'>
                                <img src={user.photo} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.
                            </span>
                        )}
                        <Button disabled={!user} type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}