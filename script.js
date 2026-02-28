function openTab(id){
  document.querySelectorAll('.tabcontent').forEach(t=>t.style.display='none');
  document.getElementById(id).style.display='block';
}

/* ------- 2048 -------- */
const grid=document.getElementById("grid2048");
let cells=[];
function setup2048(){
  grid.innerHTML="";
  cells=[];
  for(let i=0;i<16;i++){
    const d=document.createElement("div");
    d.textContent="";
    grid.appendChild(d);
    cells.push(d);
  }
  addNum(); addNum();
}
function addNum(){
  let empties=cells.filter(c=>!c.textContent);
  if(!empties.length) return;
  let c=empties[Math.random()*empties.length|0];
  c.textContent=2;
}
function move(dir){
  let lines=[];
  for(let i=0;i<4;i++){
    let line=[];
    for(let j=0;j<4;j++){
      let idx=dir==="left"? i*4+j :
              dir==="right"? i*4+(3-j) :
              dir==="up"? j*4+i :
              (3-j)*4+i;
      line.push(cells[idx]);
    }
    lines.push(line);
  }
  let moved=false;
  for(let line of lines){
    let nums=line.map(c=>+c.textContent||0).filter(n=>n);
    for(let i=0;i<nums.length-1;i++)
      if(nums[i]===nums[i+1]){ nums[i]*=2; nums.splice(i+1,1); }
    while(nums.length<4) nums.push(0);
    for(let i=0;i<4;i++){
      if(line[i].textContent!= (nums[i]||"")){
        line[i].textContent = nums[i]||"";
        moved=true;
      }
    }
  }
  if(moved) addNum();
}
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft") move("left");
  if(e.key==="ArrowRight") move("right");
  if(e.key==="ArrowUp") move("up");
  if(e.key==="ArrowDown") move("down");
});

/* ------- Snake -------- */
const canvas=document.getElementById("snakeCanvas");
const ctx=canvas.getContext("2d");
let snake, dir, food;

function resetSnake(){
  snake=[{x:10,y:10}];
  dir={x:1,y:0};
  placeFood();
}
function placeFood(){
  food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
}
function gameLoop(){
  let head={x:snake[0].x+dir.x, y:snake[0].y+dir.y};
  if(head.x<0||head.x>=20||head.y<0||head.y>=20||
     snake.some(s=>s.x===head.x&&s.y===head.y)){ resetSnake(); }
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y) placeFood();
  else snake.pop();
  ctx.fillStyle="#eee"; ctx.fillRect(0,0,400,400);

  ctx.fillStyle="green";
  snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,20,20));
  ctx.fillStyle="red";
  ctx.fillRect(food.x*20,food.y*20,20,20);
}
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft") dir={x:-1,y:0};
  if(e.key==="ArrowRight") dir={x:1,y:0};
  if(e.key==="ArrowUp") dir={x:0,y:-1};
  if(e.key==="ArrowDown") dir={x:0,y:1};
});
setInterval(gameLoop,150);

/* ------- Clicker with upgrades -------- */
let coins=0, perClick=1, auto=0;

document.getElementById("clickBtn").onclick=()=>{
  coins+=perClick;
  updateCoins();
};

document.getElementById("upgrade1").onclick=()=>{
  if(coins>=20){
    coins-=20;
    perClick++;
    updateCoins();
  }
};

document.getElementById("upgrade2").onclick=()=>{
  if(coins>=50){
    coins-=50;
    auto++;
    updateCoins();
  }
};

setInterval(()=>{ coins+=auto; updateCoins(); },1000);

function updateCoins(){
  document.getElementById("coins").textContent=coins;
}

/* Init */
setup2048();
resetSnake();
