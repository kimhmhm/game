const gameMenu = (gameList)=>{
  const wrap = document.querySelector('.wrap');
  const ruletBtn = document.createElement('button');
  const btnWrap = document.createElement('div');

  ruletBtn.innerText = '룰렛게임';
  ruletBtn.style.display = 'block';
  ruletBtn.addEventListener('click',(e)=>{
    btnWrap.remove();
    gameList.rulet(e,gameMenu,gameList)
  });
  btnWrap.append(ruletBtn);
  const workBtn = document.createElement('button');
  workBtn.innerText = '지하 노역장'
  workBtn.style.display = 'block';
  workBtn.addEventListener('click',()=>{
    btnWrap.remove();
    gameList.work(gameList,gameMenu)
  })
  btnWrap.append(workBtn);

  wrap.append(btnWrap)
}

export default gameMenu