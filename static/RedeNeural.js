class RedeNeural {

    constructor(nodesEntrada, nodesOculto, nodesSaida) {

        this._nodesEntrada = nodesEntrada
        this._nodesOculto = nodesOculto
        this._nodesSaida = nodesSaida

        this._biasEntradaParaOculto = (new Matrix(this._nodesOculto, 1)).randomize()
        this._biasOcultoParaSaida = (new Matrix(this._nodesSaida, 1)).randomize()

        this._weightsEntradaParaOculto = (new Matrix(this._nodesOculto, this._nodesEntrada)).randomize()
        this._weightsOcultoParaSaida = (new Matrix(this._nodesSaida, this._nodesOculto)).randomize()

        //this._biasEntradaParaOculto.print()
        //this._biasOcultoParaSaida.print()
        //this._weightsOcultoParaSaida.print()
        //this._weightsEntradaParaOculto.print()
    }

    feedForFoward(entrada) {

        // ENTRADA -> OCULTO
        let matrixEntrada = Matrix.arrayToMatrix(entrada)

        let matrixOculto = Matrix.multiply(this._weightsEntradaParaOculto, matrixEntrada)

        matrixOculto = Matrix.add(matrixOculto, this._biasEntradaParaOculto)

        matrixOculto.map((row, col, value) => Funcoes.sigmoid(value) )

        //OCULTO -> SAIDA

        let matrixSaida = Matrix.multiply(this._weightsOcultoParaSaida, matrixOculto)
        Matrix.add(matrixSaida, this._biasOcultoParaSaida)
        matrixSaida.print()
        
    }

}