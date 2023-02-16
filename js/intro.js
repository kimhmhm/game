const introModule = (callBack) => {
  const wd = window;
  const storage = wd.localStorage;
  // const logOutBtn = document.querySelector('#logOut');
  // logOutBtn.addEventListener('click', () => {
  //   storage.clear()
  // })
  window.onload = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 123) {
        e.preventDefault()
      }
    })
    window.addEventListener('mousedown', (e) => {
      if (e.button == 2) {
        console.log(e)
        return false
        e.preventDefault()
      }
    })
    const wrap = document.querySelector('.wrap');
    const btn = document.createElement('button');
    const startBtn = document.createElement('button');
    startBtn.innerText = '시작'
    btn.innerText = '다음';
    let num = 0;
    const intro = () => {
      if (num == 0) {
        wrap.innerText = '늦은 밤 퇴근길... 당신은 어느골목길 앞에서 멈춘다...';
        ++num
        wrap.append(btn)
      } else if (num == 1) {
        wrap.innerText = '당신은 이상한 소리에 이끌려 어두운 골목길로 들어간다 그곳에는....';
        ++num
        wrap.append(btn)
      } else if (num == 2) {
        wrap.innerText = '안전놀이터!!!!!';
        num = 0
        wrap.append(startBtn)
      }
    }
    intro();
    btn.addEventListener('click', () => {
      wrap.innerText = ''
      intro()
    });
    wrap.append(btn)
    startBtn.addEventListener('click', () => {
      wrap.innerText = '';
      const userInfoItem = JSON.parse(storage.getItem('userInfo'))
      let userInfo = {}
      userInfo = { ...userInfoItem }
      if (Object.keys(userInfo).length == 0) {
        let flag = true
        while(flag){
          userInfo.name = prompt('어서오세요! 당신의 이름을 적어주세요', '홍길동')
          flag = !userInfo.name ? true : false
        }
        userInfo.money = 100000
        userInfo.lucky = 0.3
        storage.setItem('userInfo', JSON.stringify(userInfo))
        userInfo = { ...JSON.parse(storage.getItem('userInfo')) }
      }
      alert('안전놀이터에 온 것을 환영합니다! ' + userInfo.name + ' 님!')
      const profile = document.createElement('div')
      const money = document.createElement('div')
      const desc = document.createElement('div')
      profile.classList.add('player_name');
      money.classList.add('player_money');
      desc.style.cssText = 'font-size:11px;'
      profile.innerText = '이름 : ' + userInfo.name
      money.innerText = '수중의 돈 : ' + userInfo.money.toLocaleString() + '원'
      desc.innerText = '* 아직 룰렛밖에 없습니다. 추후 업데이트 예정 *'
      wrap.append(profile, money, desc)
      if (callBack) { callBack() }
    });
  }
}

export default introModule