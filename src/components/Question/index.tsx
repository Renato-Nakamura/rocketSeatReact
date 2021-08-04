import { ReactNode } from "react";
import './styles.scss'

type QuestionProps = {
    content:string;
    author:{
        name:string;
        photo:string;
    };
    children?: ReactNode
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered =false,
    isHighlighted = false,

}:QuestionProps){
    return(
        <div className= {`question ${isAnswered ? 'answered' : ''} ${(isHighlighted && !isAnswered) ?'highlighted' : ''}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.photo} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div className='user-icon'>
                    {children}
                </div>
            </footer>
        </div>
    )
}