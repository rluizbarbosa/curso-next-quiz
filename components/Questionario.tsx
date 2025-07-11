import styles from '../styles/Questionario.module.css'

import QuestaoModel from "../model/questao"
import Questao from './Questao'
import Botao from './Botao'

interface QuestionarioProps{
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaOProximoPasso: () => void
}

export default function Questionario (props: QuestionarioProps){

    function respostaFornecida(indice: number){
        if(props.questao.naoRespondida){
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div 
            className={styles.questionario}
        >
            {props.questao 
                ?
                <Questao 
                    valor={props.questao}
                    tempoPraResposta={6}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={props.irParaOProximoPasso}
                ></Questao>
                : false
            }
            <Botao texto={props.ultima ? 'Finalizar' : 'Próxima'} onclick={props.irParaOProximoPasso}></Botao>
        </div>
    )
}