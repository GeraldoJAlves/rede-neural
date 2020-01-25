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

        let matrixEntrada = Matrix.arrayToMatrix(entrada)
        let matrixOculta = this._matrixEntradaParaMatrixOculta(matrixEntrada)
        let matrixSaida = this._matrixOcultaParaMatrixSaida(matrixOculta)
        return matrixSaida
    }

    _matrixEntradaParaMatrixOculta(matrixEntrada){

        let matrixOculta = Matrix.multiply(this._weightsEntradaParaOculto, matrixEntrada)
        matrixOculta = Matrix.add(matrixOculta, this._biasEntradaParaOculto)
        matrixOculta.map((row, col, value) => Funcoes.sigmoid(value) )
        return matrixOculta
    }

    _matrixOcultaParaMatrixSaida(matrixOculta){
        
        let matrixSaida = Matrix.multiply(this._weightsOcultoParaSaida, matrixOculta)
        matrixSaida = Matrix.add(matrixSaida, this._biasOcultoParaSaida)
        return matrixSaida
    }

}