
import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import likeImg from '../assets/images/like.svg'
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
    async function checkQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }
    async function answerQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
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
                        isHighlighted = {question.isHighlighted}
                        isAnswered = {question.isAnswered}
                        >
                            <div className='like'>
                            <span>{question.likeCount}</span>
                            <img src={likeImg} alt="" />
                            </div>
                            {!question.isAnswered && (
                            <><img 
                            onClick={() => checkQuestion(question.id)}
                            src={checkImg} alt="Excluir pergunta" />
                            <img 
                            onClick={() => answerQuestion(question.id)}
                            src={answerImg} alt="Excluir pergunta" />
                            </>
                            )}
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