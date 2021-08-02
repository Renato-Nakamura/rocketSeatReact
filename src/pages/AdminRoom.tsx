
import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
// import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../service/firebase'

import '../styles/room.scss'

type RoomParams = {
    id: string
}
export function AdminRoom() {
    // const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const history = useHistory()
    const {questions,title} = useRoom(roomId)

    async function endRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date()
        })

        history.push('/')
    }

    async function deleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Let me ask" />
                    <div>
                    <RoomCode code={roomId}></RoomCode>
                    <Button isOutlined onClick={endRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length && <span>{questions.length} perguntas</span>}
                </div>

                {questions.map(question => {
                    return(
                        <Question 
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        
                        >
                            <img 
                            onClick={() => deleteQuestion(question.id)}
                            src={deleteImg} alt="Excluir pergunta" />
                        </Question>
                    )
                })}
            </main>
        </div>
    )
}