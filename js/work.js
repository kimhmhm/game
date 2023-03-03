const work = (gameList,gameMenu) => {
  const wrap = document.querySelector('.wrap');
  const prevBtn = document.createElement('button');
  prevBtn.innerText = '이전으로'
  prevBtn.addEventListener('click',(e)=>{
    e.target.remove();
    gameMenu(gameList);
    workWrap.remove();
    clearInterval(interval);
  })
  wrap.append(prevBtn)
  const workWrap = document.createElement('div');
  workWrap.style.width = '100vw'
  workWrap.style.height = '80vh'
  const descText = document.createElement('div');
  descText.style.height = '10%'
  descText.innerText = '돌 10개당 500원씩 쳐주지 빨리 일해!'
  const getCountText = document.createElement('div');
  getCountText.innerText = `채취한 돌 갯수 : 0`
  const changeMoneyBtn = document.createElement('button');
  changeMoneyBtn.innerText = '환전하기'
  changeMoneyBtn.addEventListener('click',()=>{
    if(getCount < 10){
      alert('환전은 돌 10개 부터입니다.')
      return
    }
    const result = Math.floor(getCount / 10)
    const rest = getCount % 10;
    getCount = rest
    getCountText.innerText = `채취한 돌 갯수 : ${getCount}`

    const changeMoney = result * 500
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    const newMoney = userInfo.money + changeMoney
    userInfo = {...userInfo,money : newMoney}
    console.log(userInfo);
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
    const moneyInfo = document.querySelector('.player_money')
    moneyInfo.innerHTML = '수중의 돈 : ' + newMoney.toLocaleString() + '원'
    return
  })
  descText.append(getCountText,changeMoneyBtn);
  workWrap.append(descText);
  const stoneScope = document.createElement('div');
  stoneScope.style.cssText = 'position:relative;width:100%;height:90%;'
  workWrap.append(stoneScope);

  let stoneCount = 0;
  let getCount = 0;

  let interval = setInterval(()=>{
    if (stoneCount == 10) return
    const stone = document.createElement('button');
    let count = 10
    stone.innerHTML = `돌 <br/> 체력: ${count}`
    const top = Math.floor(Math.random() * 96)
    const left = Math.floor(Math.random() * 96)
    stone.style.cssText = `position:absolute; width:5%;height:5%; top:${top}%; left:${left}%; min-width:40px`

    stone.addEventListener('click',(e)=>{
      count -= 1
      if(count == 0) {
        e.target.remove();
        stoneCount -= 1;
        getCount += 1;
        getCountText.innerText = `채취한 돌 갯수 : ${getCount}`;
        return
      }
      stone.innerHTML = `돌 <br/> 체력: ${count}`;
    }) 
    stoneScope.append(stone);
    stoneCount += 1;
  },2000)

  wrap.append(workWrap);
}

export default work