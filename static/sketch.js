
let dataset = {}
let continuaTreino = true
let limiteTeste = 1000
let redeNeural

function setup() {
    createCanvas(displayWidth, displayHeight);
    textSize(32);
    textAlign(CENTER, CENTER);

    redeNeural = new RedeNeural(2, 4, 1)

    //redeNeural.traine([1,2],[1])

    //apenas testa o xor
    dataset = {
        inputs: [
            [0, 0],
            [1, 1],
            [1, 0],
            [0, 1],
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
    background(255)

    textSize(30)
    text("Rede Neural", 300, 100)
    textSize(20)
    text("- XOR -", 300, 130)
    if (continuaTreino) {
        let numTeste = 0;
        while (numTeste < limiteTeste) {
            let index = numTeste % dataset.inputs.length
            redeNeural.traine(dataset.inputs[index], dataset.output[index])
            numTeste++
        }
        let testeUm = redeNeural.predict([1, 0])[0] > 0.98
        let testeDois = redeNeural.predict([1, 1])[0] < 0.02
        if (testeUm && testeDois) {
            continuaTreino = false
            console.log("Para testar a rede utilize")
            console.log("Tabela Xor")
            console.table([
                ["entrada", "entrada", "resultado"],
                [0,0,0],
                [0,1,1],
                [1,0,1],
                [1,1,0]
            ])
            console.log("redeNeural.predict([0,1])[0]")
            console.log("redeNeural.predict([1,1])[0]")
        } else {
            textSize(15)
            text("1 XOR 0 = " + redeNeural.predict([0, 1])[0].toFixed(4), 300, 160)
            text("1 XOR 1 = " + redeNeural.predict([1, 1])[0].toFixed(4), 300, 180)
            text("(Treinando)", 300, 200)

        }
    } else {
        textSize(15)
        text("Rede treinada com sucesso, aperte F12", 300, 160)
        text("e confira no console.", 300, 180)
    }
}