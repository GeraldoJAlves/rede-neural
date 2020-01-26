
let dataset = {}
let continuaTreino = true
let limiteTeste = 10000
let redeNeural

function setup() {
    
    redeNeural = new RedeNeural(2,3,1)

    //redeNeural.traine([1,2],[1])

    //apenas testa o xor
    dataset = {
        inputs: [
            [0,0],
            [1,1],
            [1,0],
            [0,1],
        ],
        output: [
            [0],
            [0],
            [1],
            [1]
        ]
    }
}

function draw() {
    if(continuaTreino){
        let numTeste = 0;
        while(numTeste < limiteTeste){
            let index = numTeste % dataset.inputs.length
            redeNeural.traine(dataset.inputs[index], dataset.output[index])
            numTeste++
        }
        let testeUm = redeNeural.predict([1,1])[0] > 0.991
        let testeDois = redeNeural.predict([1,0])[0] < 0.004
        if(testeUm && testeDois){
            continuaTreino = false
            console.log("rede treinada com sucesso")
        }else{
            console.clear()
            console.log(" 1 0 = "  + redeNeural.predict([0,1])[0])
            console.log(" 1 1 = " + redeNeural.predict([1,1])[0])
            console.log("ainda treinando")
        }
    }
}