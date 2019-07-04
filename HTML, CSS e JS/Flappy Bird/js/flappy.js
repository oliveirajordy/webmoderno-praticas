
function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

function ParDeBarreira(altura, abertura, x) {
    this.elemento = novoElemento('div', 'par-de-barreira')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

function Barreiras(altura, largura, abertura, espaco, notificarPronto) {
    this.pares = [
        new ParDeBarreira(altura, abertura, largura),
        new ParDeBarreira(altura, abertura, largura + espaco),
        new ParDeBarreira(altura, abertura, largura + espaco * 2),
        new ParDeBarreira(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio && par.getX() < meio
            cruzouMeio && notificarPronto()
        })
    }
}

function Passaro(altura) {
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'imgs/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMaxima = altura - this.elemento.clientHeight - 10

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }
    this.setY(altura / 2)
}

// const areaDoJogo = document.querySelector('[wm-flappy]')

// const barreiras = new Barreiras(700,1200,200,400)
// barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

// const passaro = new Passaro(700)
// areaDoJogo.appendChild(passaro.elemento)

// setInterval(()=>{
//     barreiras.animar()
//     passaro.animar()
// }, 20)

function Progresso() {
    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(passaro, barreiras) {
    let colidiu = false
    barreiras.pares.forEach(ParDeBarreira => {
        if (!colidiu) {
            const superior = ParDeBarreira.superior.elemento
            const inferior = ParDeBarreira.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu;
}

function gameOver(progresso) {
    const elemento = this.novoElemento('div', 'game-over')
    const restartBtn = this.novoElemento('input', 'restart')
    const gameOverProgresso = progresso.elemento.cloneNode(true)

    restartBtn.type = 'image'
    restartBtn.src = 'imgs/restart.png'
    restartBtn.onclick = () => {
        play.restart()
    }

    elemento.innerHTML = 'Game Over'
    elemento.appendChild(gameOverProgresso)
    elemento.appendChild(restartBtn)

    return elemento
}

function FlappyBird() {
    let pontos = 0

    const areaJogo = document.querySelector('[wm-flappy]')

    const altura = areaJogo.clientHeight
    const largura = areaJogo.clientWidth

    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 200, 400, () => progresso.atualizarPontos(++pontos))
    const passaro = new Passaro(altura)

    areaJogo.appendChild(progresso.elemento)
    areaJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaJogo.appendChild(par.elemento))

    this.start = () => {
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()
            if (colidiu(passaro, barreiras)) {
                clearInterval(temporizador)
                areaJogo.appendChild(gameOver(progresso))
            }
        }, 20)
    }

    this.restart = () => {
        while (areaJogo.firstChild) {
            areaJogo.removeChild(areaJogo.firstChild)
        }
        play = new FlappyBird()
        play.start()
    }
}

let play = new FlappyBird()
play.start()