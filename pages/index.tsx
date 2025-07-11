import { useEffect, useState } from "react";
import QuestaoModel from "../model/questao";
import Questionario from "../components/Questionario";
import { useRouter } from "next/router";
  
const BASE_URL = 'https://curso-next-quiz-ecru.vercel.app/api'

export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    setQuestao(QuestaoModel.criarUsandoObjeto(json))
  }

  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta(){
    const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
    console.log(idsDasQuestoes[proximoIndice])
    return idsDasQuestoes[proximoIndice]
  }

  function irParaOProximoPasso(){
    const promixoId = idProximaPergunta()
    promixoId ? irParaProximaQuestao(promixoId) : finalizar()
  }

  function irParaProximaQuestao(promixoId: number){
    carregarQuestao(promixoId)
  }

  function finalizar(){
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return (
    <>
    {questao ? 
      <Questionario
        questao={questao}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irParaOProximoPasso={irParaOProximoPasso}
      ></Questionario>
    : false}
    </>
  );
}
