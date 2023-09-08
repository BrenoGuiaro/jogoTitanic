const perso = new Image()
perso.src = 'submarino.png'

const imgOBST = new Image
imgOBST.src = 'virado.png'


const imgOBST2 = new Image
imgOBST2.src = 'virado2.png'

const obstacles = []



const areaGame = {
  canvas: document.getElementById('canva'),
  frames: 0,
  running: false,
  start() {
    this.context = this.canvas.getContext('2d')
    this.interval = setInterval(updateGame, 10)
    this.running = true
  },
  clear() {
    this.context.clearRect(0, 0, 980, 470)
  },
  gameOver() {
    this.running = false
    clearInterval(this.interval)
    this.clear()
    btn.remove()
   this.context.font = '50px serif'
    this.context.fillStyle = 'red'
    this.context.fillText(`FOI DE F`, 350, 190)
    this.context.font = '30px serif '
    this.context.fillStyle = 'black'
    this.context.fillText(`Pontos: ${this.points}`, 378, 240)
    reset.style.backgroundColor = '#7979ff'
    reset.textContent = '⭯'
   
    
    
  },
  pontos() {
    this.points = Math.floor(this.frames / 5)
    this.context.font = '25px serif'
    this.context.fillStyle = 'black'
    this.context.fillText(`Pontos: ${this.points}`, 750, 50)
  },
}

const reset = document.querySelector('.reset')
reset.addEventListener('click',()=>{

  window.location.reload()

  })

class Component {
  constructor(width, height, Image, x, y) {
    this.width = width
    this.height = height
    this.Image = Image
    this.x = x
    this.y = y
    this.speedX = 0
    this.speedY = 0
  }

  left() {
    return this.x + 10
  }

  right() {
    return this.x + this.width
  }

  top() {
    return this.y
  }

  bottom() {
    return this.y + this.height - 10
  }


  newPos() {
    if(this.x + this.speedX < 0){
      this.x =0
    }
    if(this.y + this.speedY >= 400){
      this.y = 400
    }
    if(this.y + this.speedY <= 0){
      this.y = -5
    }
    if(this.x + this.speedX >= 910){
      this.x = 910
    }
    else{

      this.x += this.speedX
      this.y += this.speedY
    }
  }

  crash(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    )
  }

  draw() {
    const ctx = areaGame.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  desenha(){
    const ctx = areaGame.context
    ctx.drawImage(perso,this.x,this.y,this.width,this.height)
  }

  desenha3(){
    const ctx = areaGame.context
    ctx.drawImage(imgOBST,this.x,this.y,140,this.height)
  }


}

const player = new Component(70, 70, perso, 0, 110)

function updateObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.x -= 1
    obstacle.desenha3()
   
  })

  areaGame.frames += 1
  if (areaGame.frames % 230 === 0) {
    let x = 980
    let maxHeight = 400
    let minHeight = 20
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    )

    let minGap = 100
    let maxGap = 200
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)

     obstacles.push(new Component(15, height, imgOBST2, x, 0))
    obstacles.push(
      new Component(15, x - height - gap, imgOBST, x, height + gap),

    
    )
  }
}

function checkGameOver() {
  const crashed = obstacles.some((obstacle) => {
    return player.crash(obstacle)
  })
  if (crashed) {
    areaGame.gameOver()
  }
}

const btn = document.querySelector('#start')

function updateGame() {
  areaGame.clear()
  player.newPos()
  player.desenha()
  updateObstacles()
  areaGame.pontos()
  checkGameOver()
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      player.speedY -= 1
      break
    case 'ArrowDown':
      player.speedY += 1
      break
    case 'ArrowLeft': // left arrow
      player.speedX -= 1
      break
    case 'ArrowRight': // right arrow
      player.speedX += 1
      break
  }
})


  const startT = document.querySelector('#start').addEventListener('click', (e) => {
    if (!areaGame.running) {
      areaGame.start()
      e.target.innerText = 'PAUSE'
      const back = document.querySelector('.back')
      const titu = document.querySelector('#titanTITU')
      const imgT = document.querySelector('#TITANIC')
      const btn = document.querySelector('#start')
      back.remove()
      titu.remove()
      imgT.remove()
      
     
      btn.innerText = 'PAUSE'
    } 
    else {
      areaGame.running = false
      clearInterval(areaGame.interval)
      e.target.innerText = 'START'
    }
  })

  



document.addEventListener('keyup', (e) => {
  player.speedX = 0
  player.speedY = 0
})
