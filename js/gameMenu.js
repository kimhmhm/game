const gameMenu = (ruletGame)=>{
  const wrap = document.querySelector('.wrap');
  const rulet = document.createElement('button');
  rulet.innerText = '룰렛게임';
  rulet.addEventListener('click',(e)=>ruletGame(e,gameMenu));
  wrap.append(rulet);
}

export default gameMenu