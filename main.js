const c = document.querySelector('canvas')
const ctx = c.getContext('2d')
const cw = c.width = innerWidth
const ch = c.height = innerHeight//*0.9
const dots = Array(750)
const dur = 25
const hue = 105
const mPos = {x:cw/2, y:ch}

c.onpointermove = (e)=> gsap.to(mPos, {x:e.offsetX, y:e.offsetY})

for (let i=0; i<dots.length; i++){
  dots[i] = {
    x: cw*Math.random(),
    y: -10,
    r: gsap.utils.random(1.5,4.5,0.1)
  }
}

function drawDot(x, y, r){
  const dist = Math.abs(x-mPos.x) + Math.abs(y-mPos.y) //distance from pointer alters lightness of color
  ctx.fillStyle = 'hsl('+hue+',100%,'+Math.max(1-dist/(dots.length-1), 0.5)*80+'%)'
  ctx.beginPath()
  ctx.arc(x, y, r*r*Math.max(1-dist/(dots.length-1), 0.1), 0, 2*Math.PI)
  ctx.fill()
}

function redraw(){
  ctx.clearRect(0,0,cw,ch)
  dots.forEach(dot => drawDot(dot.x, dot.y, dot.r))
}

gsap.timeline({ onUpdate:redraw })
.from(dots, {
  duration:dur,
  ease:'none',
  x:(i)=>'+=random(-99,99)',
  y:(i,t)=>t.r*ch, //larger dots move further/faster to imply depth
  r:()=>'+=random(-1,2)',
  repeatRefresh:true,
  stagger:{from:'random', amount:dur, repeat:-1},
})
.seek(dur) //fast-forward past the initial run