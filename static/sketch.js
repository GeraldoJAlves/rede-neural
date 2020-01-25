function setup() {
    let matrix = new Matrix(1, 2);
    let matrix2 = new Matrix(2, 1);

    matrix.print();
    matrix2.print();

    resultado = Matrix.multiply(matrix, matrix2);

    resultado.print();
}

function draw() {
    
}