const gameMenu = (ruletGame)=>{
  const wrap = document.querySelector('.wrap');
  const menuWrap = document.createElement('div');
  const rulet = document.createElement('button');
  rulet.innerText = '룰렛게임';
  rulet.addEventListener('click',(e)=>ruletGame(e,gameMenu));
  menuWrap.append(rulet);
  wrap.append(menuWrap);
}

export default gameMenu