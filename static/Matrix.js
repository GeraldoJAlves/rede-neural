class Matrix {

    constructor(rows, cols){
        this._rows = rows
        this._cols = cols

        this._data = []

        for(let i = 0; i < rows; i++){
            let tempData = [];
            for(let j = 0; j < cols; j++){
                tempData.push(Math.floor(Math.random()*10))
            }
            this._data.push(tempData)
        }
    }

    map(func){

        this._data = this._data.map(
            (element, row) =>
                element.map( (value, col) => func(row, col, value) )
        );

        return this
    }

    get cols(){
        return this._cols
    }

    get rows(){
        return this._rows
    }

    get data(){
        return [].concat(this._data)
    }

    static add(matrixUm, matrixDois){

        let matrixResultado = new Matrix(matrixUm.rows, matrixDois.cols)

        matrixResultado.map( (row, col) =>  matrixUm.data[row][col] + matrixDois.data[row][col] )

        return matrixResultado
    }

    static multiply(matrixUm, matrixDois){
        let matrixResultado = new Matrix(matrixUm.rows, matrixDois.cols);

        matrixResultado.map( (row, col) => {
            let soma = 0;
            for(let matrixDoisRow = 0; matrixDoisRow < matrixDois.rows; matrixDoisRow++){
                let elementoUm = matrixUm.data[row][matrixDoisRow];
                let elementoDois = matrixDois.data[matrixDoisRow][col];
                soma+= elementoUm * elementoDois;
            }
            return soma;
        });

        return matrixResultado;
    }
    
    print(){
        console.table(this._data)
    }

}