import Botao from '../components/Botao'
import Estatistica from '../components/Estatistica'
import styles from '../styles/Resultado.module.css'
import { useRouter } from "next/router"

export default function Resultado(){
    const router = useRouter()

    const total = +router.query.total
    const certas = +router.query.certas
    const percentual = Math.round((certas / total) * 100)

    return (
        <div className={styles.resultado}>
            <h1>Resultado</h1>
            <div style={{display: "flex"}}>
                <Estatistica valor={total} texto='Perguntas'></Estatistica>
                <Estatistica valor={certas} texto='Certas' corFundo='#9CD2A4'></Estatistica>
                <Estatistica valor={`${percentual}%`} texto='Percentual' corFundo='#DE6A33'></Estatistica>
            </div>
            <Botao href='/' texto='Tentar novamente'></Botao>
        </div>
    )
}