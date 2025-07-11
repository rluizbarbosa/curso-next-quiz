export default class RespostaModel{
    #valor: string
    #certa: boolean
    #revelada: boolean

    constructor(valor: string, certa: boolean, revelada: boolean){
        this.#valor = valor
        this.#certa = certa
        this.#revelada = revelada
    }

    get valor(){
        return this.#valor
    }

    get certa(){
        return this.#certa
    }

    get revelada(){
        return this.#revelada
    }

    static certa(valor){
        return new RespostaModel(valor, true, false)
    }

    static errada(valor){
        return new RespostaModel(valor, false, false)
    }

    revelar(){
        return new RespostaModel(this.#valor, this.#certa, true)
    }

    static criarUsandoObjeto(obj: RespostaModel): RespostaModel {
        return new RespostaModel(obj.valor, obj.certa, obj.revelada)
    }

    converterParaObjeto(){
        return {
            valor: this.#valor,
            revelada: (this.#revelada !== undefined) ? this.#revelada : false,
            certa:  this.#certa
        }
    }
}