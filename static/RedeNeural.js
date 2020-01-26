class RedeNeural {

    constructor(nodesEntrada, nodesOculto, nodesSaida) {

        this._nodesEntrada = nodesEntrada
        this._nodesOculto = nodesOculto
        this._nodesSaida = nodesSaida

        this._biasEntradaParaOculto = (new Matrix(this._nodesOculto, 1)).randomize()
        this._biasOcultoParaSaida = (new Matrix(this._nodesSaida, 1)).randomize()

        this._weightsEntradaParaOculto = (new Matrix(this._nodesOculto, this._nodesEntrada)).randomize()
        this._weightsOcultoParaSaida = (new Matrix(this._nodesSaida, this._nodesOculto)).randomize()
        
    }

    static get LEARNING_RATE(){
        return 0.1
    }

    traine(entrada, saida){
        
        this._matrixEntrada = Matrix.arrayToMatrix(entrada)
        this._matrixResultado = Matrix.arrayToMatrix(saida)

        // ENTRADA -> OCULTA -> SAIDA
        let matrixEntradaOculta = this._matrixEntradaParaOculta()
        let matrixOcultaSaida = this._matrixOcultaParaSaida(matrixEntradaOculta)
        
        // ENTRADA <- OCULTA <- SAIDA
        this._matrixSaidaParaOculta(matrixOcultaSaida, matrixEntradaOculta)
        this._matrixOcultaParaEntrada(matrixOcultaSaida, matrixEntradaOculta)

    }

    predict(entrada){
        this._matrixEntrada = Matrix.arrayToMatrix(entrada)

        let matrixEntradaOculta = this._matrixEntradaParaOculta()
        let matrixOcultaSaida = this._matrixOcultaParaSaida(matrixEntradaOculta)

        return Matrix.toArray(matrixOcultaSaida)
    }

    _matrixEntradaParaOculta(){

        let matrixOculta = Matrix.multiply(this._weightsEntradaParaOculto, this._matrixEntrada)
        matrixOculta = Matrix.add(matrixOculta, this._biasEntradaParaOculto)
        matrixOculta.map((row, col, value) => Funcoes.sigmoid(value) )
        return matrixOculta
    }

    _matrixOcultaParaSaida(matrixEntradaOculta){

        let matrixSaida = Matrix.multiply(this._weightsOcultoParaSaida, matrixEntradaOculta)
        matrixSaida = Matrix.add(matrixSaida, this._biasOcultoParaSaida)
        matrixSaida.map((row, col, value) => Funcoes.sigmoid(value) )
        return matrixSaida
    }

    _matrixSaidaParaOculta(matrixOcultaSaida, matrixEntradaOculta){

        let matrixErro = Matrix.subtract(this._matrixResultado, matrixOcultaSaida)
        let matrixDerivadaSigmod = Matrix.map(matrixOcultaSaida, (row, col, value) => Funcoes.dsigmoid(value) )

        let matrixEntradaOcultaTranspose = Matrix.transpose(matrixEntradaOculta)
        
        let matrixGradient = Matrix.hadamart(matrixDerivadaSigmod, matrixErro)
        matrixGradient = Matrix.escalarMultiply(matrixGradient, RedeNeural.LEARNING_RATE)
        this._biasOcultoParaSaida = Matrix.add(this._biasOcultoParaSaida, matrixGradient)
        
        let weightsOcultoParaSaidaDelta = Matrix.multiply(matrixGradient, matrixEntradaOcultaTranspose)
        this._weightsOcultoParaSaida = Matrix.add(this._weightsOcultoParaSaida, weightsOcultoParaSaidaDelta)

        //weightsOcultoParaSaidaDelta.print()
        //this._weightsOcultoParaSaida.print()
    }

    _matrixOcultaParaEntrada(matrixOcultaSaida, matrixEntradaOculta ){

        let weightsOcultoParaSaidaTranspose = Matrix.transpose(this._weightsOcultoParaSaida)

        let matrixErro = Matrix.subtract(this._matrixResultado, matrixOcultaSaida)

        let matrixOcultaErro = Matrix.multiply(weightsOcultoParaSaidaTranspose, matrixErro)

        let matrixDerivadaSigmod = Matrix.map(matrixEntradaOculta, (row, col, value) => Funcoes.dsigmoid(value) )

        let matrixEntradaOcultaTranspose = Matrix.transpose(this._matrixEntrada)

        let matrixGradient = Matrix.hadamart(matrixDerivadaSigmod, matrixOcultaErro)
        matrixGradient = Matrix.escalarMultiply(matrixGradient, RedeNeural.LEARNING_RATE)
        
        this._biasEntradaParaOculto = Matrix.add(this._biasEntradaParaOculto, matrixGradient)

        let weightsEntradaParaOcultoDelta = Matrix.multiply(matrixGradient, matrixEntradaOcultaTranspose)

        this._weightsEntradaParaOculto = Matrix.add(this._weightsEntradaParaOculto, weightsEntradaParaOcultoDelta)

        //weightsEntradaParaOcultoDelta.print()
        //this._weightsEntradaParaOculto.print()

    }

}