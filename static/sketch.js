
let dataset = {}
let continuaTreino = false
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
        let testeUm = redeNeural.predict([1,6,6])[0] > 5
        let testeDois = redeNeural.predict([1,9,9])[0] > 8
        if(testeUm && testeDois){
            continuaTreino = false
            console.log("rede treinada com sucesso")
        }else{
            console.clear()
            console.log("testeTrue: "  + redeNeural.predict([0,1])[0])
            console.log("testeFalse: " + redeNeural.predict([1,3,4])[0])
            console.log("ainda treinando")
        }
    }
}