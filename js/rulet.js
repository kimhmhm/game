const rulet = (e, callBack) => {
  if (e) e.target.remove();
  const prev = document.createElement('button');
  prev.style.display = 'block'
  prev.innerText = '이전으로'
  let timer
  prev.addEventListener('click', () => {
    if(timer) clearTimeout(timer)
    prev.remove()
    canvas.remove()
    canvasWrap.remove()
    arrow.remove()
    inputBox.remove()
    callBack(rulet)
  });
  const wrap = document.querySelector('.wrap');
  const arrow = document.createElement('div')
  const canvasWrap = document.createElement('div')
  const wonpan = document.createElement('div');
  wrap.append(prev)
  const info = [{ color: 'red', val: '1.2배', deg: 270 }, { color: 'orange', val: '꽝', deg: 225 }, { color: 'yellow', val: '2배', deg: 180 }, { color: 'green', val: '꽝', deg: 135 }, { color: 'blue', val: '1.2배', deg: 90 }, { color: 'Indigo', val: '꽝', deg: 45 }, { color: 'purple', val: '3배', deg: 360 }, { color: 'brown', val: '꽝', deg: 315 }]
  wonpan.innerHTML = `<canvas width=500px height=500px></canvas>`
  canvasWrap.style.cssText = 'display:inline-block;position:relative;width:500px;height:500px;'
  wonpan.style.cssText = `position:absolute;width:100%;height:100%;top:0;left:0;`
  canvasWrap.append(wonpan)
  wrap.append(canvasWrap)
  let j = 0
  for (let i = 0; i < 9; i++) {
    if (!info[i]) break;
    const div = document.createElement('div');
    div.style.cssText = `position:absolute; top:0;left:50%; transform-origin:50% 100%;transform:translateX(-50%) rotate(${(45 * i) + 22.5}deg);width:50%;height:50%;text-align:center;padding-top:40px;box-sizing:border-box;
    font-size:20px;font-weight:bold;`
    if (i + 6 > 7) {
      div.innerText = info[j].val;
      j++
    } else {
      div.innerText = info[i + 6].val;
    }
    wonpan.append(div)
  }
  canvasWrap.append(arrow)
  const canvas = document.querySelector('canvas');
  arrow.style.cssText = 'width:0;position:absolute;top:0;left:50%;transform:translateX(-50%);border: 20px solid transparent;border-top: 50px solid black;'
  const ctx = canvas.getContext('2d');
  const deg45toRadian = (Math.PI / 180) * 45
  wonpan.style.transition = 'all 10s ease-in-out';
  for (let i = 1; i <= 8; i++) {
    ctx.beginPath();
    ctx.arc(250, 250, 250, deg45toRadian * (i - 1), deg45toRadian * i, false);
    ctx.lineTo(250, 250);
    ctx.closePath();
    ctx.fillStyle = info[i - 1].color
    ctx.fill();
    ctx.stroke();
  }
  const inputBox = document.createElement('div');
  const submitBtn = document.createElement('button');
  let playerInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  submitBtn.innerText = '배팅하기'
  inputBox.innerHTML = `배팅금 : <input type='number' placeholder='최소 금액 1000원'/> `
  inputBox.append(submitBtn)
  const input = inputBox.querySelector('input')
  const btn = document.createElement('button')
  btn.innerText = '돌리기!'

  btn.addEventListener('click', () => {
    btn.remove()
    const index = Math.floor(Math.random() * info.length)
    const degree = Math.floor(Math.random() * 46) + info[index].deg - 45;
    const rotationCount = degree + 3600
    wonpan.style.transform = `rotate(${rotationCount}deg)`;
    timer = setTimeout(() => {
      alert(`${info[index].val} 입니다!`)
      if (info[index].val == '꽝') {
        playerInfo.money = playerInfo.money - input.value;
        window.localStorage.setItem('userInfo', JSON.stringify(playerInfo));
      } else {
        playerInfo.money = playerInfo.money + parseFloat(info[index].val) * input.value;
        window.localStorage.setItem('userInfo', JSON.stringify(playerInfo));
      }
      const userMoney = wrap.querySelector('.player_money');
      const newMoney = JSON.parse(window.localStorage.getItem('userInfo')).money
      userMoney.innerText = '수중의 돈 : ' + newMoney.toLocaleString() + '원'
      canvas.remove()
      canvasWrap.remove()
      arrow.remove()
      inputBox.remove()
      prev.remove()
      return rulet(null,callBack)
    }, 10800)
  })

  submitBtn.addEventListener('click', () => {
    if (input.value < 1000) {
      alert('최소금액은 1000원입니다. 1000원 이상 배팅해주세요.')
      return
    }
    if (input.value > playerInfo.money) {
      alert('소지금이 부족하시네요....');
      return
    }
    const ok = window.confirm('정말 배팅하시겠습니까?')
    if (!ok) return
    inputBox.innerHTML = `당신의 배팅금 : ${input.value}원`
    wrap.append(btn)
  })
  wrap.append(inputBox)

}

export default rulet