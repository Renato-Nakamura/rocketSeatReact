// import { useState } from "react"
import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){
    return(
        <button className='button' {...props}></button>
    )
}



// //exemplo de estado em react, nele podemos alterar o proprio botao.
// export function Button(){
//     const [counter,setCounter] = useState(0)
        
//     function increment(){
//         setCounter(counter+1);
//     }
//     return(
//         <button onClick={increment}>{counter}</button>
//     )
// }
// //Definindo as propriedades do botao para evitar erros 
// type ButtonProps = {
//     texto: string;
// }
// // Propriedades dos componentes que podem ser enviados
// export function ButtonEdit(props: ButtonProps) {
//     return(
//         <button>{props.texto}</button>
//     )
// }

// type ButtonChildrenprops = {
//     children: string;
// }
// //Propriedade de Children 
// export function ButtonChildren(props: ButtonChildrenprops) {
//     return(
//         <button>{props.children}</button>
//     )
// }