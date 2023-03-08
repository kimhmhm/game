const yabawee = (gameMenu) => {
  const wrap = document.querySelector('.wrap');
  const prevBtn = document.createElement('button');
  prevBtn.innerText = '이전으로'
  prevBtn.addEventListener('click', (e) => {
    e.target.remove();
    gameMenu();
    yabaweeWrap.remove();
    // clearInterval(interval);
    // clearTimeout(timer)
  })
  wrap.append(prevBtn)
  const yabaweeWrap = document.createElement('div');
  yabaweeWrap.style.cssText = `
      width:100%; height: 30vw;
      position:relative;
    `

  function createbutton(text) {
    this.btn = document.createElement('button');
    this.btn.innerText = text;
    this.btn.style.cssText = 'display:block; margin-bottom:10px';
  }

  const btnWrap = document.createElement('div')
  const btn3 = new createbutton('컵 3개 (정답시 배팅금의 1.2배)');
  const btn5 = new createbutton('컵 5개 (정답시 배팅금의 2배)');
  const btn9 = new createbutton('컵 9개 (정답시 배팅금의 3배)');

  btn3.btn.addEventListener('click', () => {
    btnWrap.remove();
    setYabawee(3,1.2);
  });
  btn5.btn.addEventListener('click', () => {
    btnWrap.remove();
    setYabawee(5,2);
  });
  btn9.btn.addEventListener('click', () => {
    btnWrap.remove();
    setYabawee(9,3);
  });

  btnWrap.append(btn3.btn, btn5.btn, btn9.btn)
  yabaweeWrap.append(btnWrap)

  const setYabawee = (cupCount, baesu) => {
    const centerCha = (100 / cupCount) / 2;
    const cupWidth = (100 / cupCount) - 2;
    let cups = []
    let sum = 1
    for (let i = 1; i <= cupCount; i++) {
      const cup = {
        dom: document.createElement('div'),
        isCenter: false
      };
      cup.dom.innerText = '컵'
      cup.dom.style.cssText = `
        width:${cupWidth}%;
         height:50%; 
         clip-path: polygon(10% 0%, 90% 0%,100% 100%, 0% 100%);
         background-color:#C21010;
         position:absolute;
         border-bottom: 2px solid #fff ;
         bottom:0;
         color:#fff;
         text-align:center;
         left: calc(${centerCha * sum}% - ${cupWidth / 2}% ); transition: all 0.2s linear`;

      if (i == Math.ceil(cupCount / 2)) {
        cup.dom.style.bottom = `${cupWidth / 3}vw`;
        cup.isCenter = true
      }

      yabaweeWrap.append(cup.dom)
      cups.push(cup)
      sum += 2
    }

    const ball = document.createElement('div');
    ball.style.cssText = `
      width:${cupWidth / 3}vw;
      height:${cupWidth / 3}vw;
      position:absolute;
      bottom:0;
      left:50%;
      transform:translateX(-50%);
      background-color:yellow;
      border-radius:50%;
      z-index:-1;
      `
    yabaweeWrap.append(ball)

    // 배팅관련 나중에 모듈화 시켜야할듯함========
    const inputBox = document.createElement('div');
    const input = document.createElement('input');
    const submitBtn = document.createElement('button');
    let playerInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    submitBtn.innerText = '배팅하기';
    input.placeholder = '최소금액 1000원';
    input.type='number';
    inputBox.style.cssText = 'position:absolute; top:100%; padding-top:50px;'
    inputBox.append('배팅금 : ',input)
    inputBox.append(submitBtn)

    let ok = false
    submitBtn.addEventListener('click', () => {
      if (input.value < 1000) {
        alert('최소금액은 1000원입니다. 1000원 이상 배팅해주세요.')
        return
      }
      if (input.value > playerInfo.money) {
        alert('소지금이 부족하시네요....');
        return
      }
      ok = window.confirm('정말 배팅하시겠습니까?')
      if (!ok) return
      inputBox.innerHTML = `당신의 배팅금 : ${input.value}원`
    })

    yabaweeWrap.append(inputBox)
    // ===========================================

    const startBtn = document.createElement('button');
    startBtn.innerText = '시작!'
    startBtn.addEventListener('click', (e) => {
      if(!ok) {
        alert('배팅을하셔야 시작할 수 있습니다.')
        return
      }
      e.target.remove();
      reSelectBtn.remove();
      cups.forEach((cup) => {
        if (!cup.isCenter) return
        cup.dom.style.bottom = '0px';
      })
      setTimeout(() => {

        let interval = setInterval(() => {
          cups.sort(() => Math.random() - 0.5);
          sum = 1
          cups.forEach((cup, idx) => {
            cup.dom.style.left = `calc(${centerCha * sum}% - ${cupWidth / 2}% )`;
            if (cup.isCenter) {
              ball.style.transform = 'translateX(-50%)'
              ball.style.opacity = '0'
              ball.style.left = `calc(${centerCha * sum}% - ${cupWidth / 2}% + ${cupWidth / 2}%)`;
            }
            sum += 2
          })
        }, 300)

        let timer = setTimeout(() => {
          clearInterval(interval)
          const textbox = document.createElement('div')
          textbox.innerText = '섞기가 끝났습니다. 공이 들어있는 컵을 선택해주세요!'
          yabaweeWrap.append(textbox);

          cups.forEach((cup) => {
            cup.dom.addEventListener('click', () => {
              textbox.remove();
              ball.style.opacity = '1';
              cup.dom.style.bottom = `${cupWidth / 3}vw`;
              let newInfo = {...playerInfo}
              const userMoney = wrap.querySelector('.player_money');
              if (cup.isCenter) {
                newInfo.money += input.value * baesu;
              } else {
                newInfo.money -= input.value;
              }
              window.localStorage.setItem('userInfo',JSON.stringify(newInfo))
              setTimeout(() => {
                if (cup.isCenter) {
                  alert('정답입니다!!');
                } else {
                  alert('실패');
                }
                inputBox.remove();
                userMoney.innerText = '수중의 돈 : ' + newInfo.money.toLocaleString() + '원'
                cups.forEach((cup) => {
                  cup.dom.style.bottom = `${cupWidth / 3}vw`;
                })

                const retryBtn = document.createElement('button');
                retryBtn.innerText = '다시하기';
                retryBtn.style.cssText = `
                  position:absolute;
                  top:105%;
                `
                retryBtn.addEventListener('click', (e) => {
                  e.target.remove();
                  yabaweeWrap.remove();
                  prevBtn.remove();
                  yabawee(gameMenu);
                })
                yabaweeWrap.append(retryBtn);
              }, 500)
            })
          })
        }, 15000)

      }, 300)

    })
    yabaweeWrap.append(startBtn);

    const reSelectBtn = document.createElement('button');
    reSelectBtn.style.cssText = `
    display:block;
  `
    reSelectBtn.innerText = '컵 갯수 재선택';
    reSelectBtn.addEventListener('click', (e) => {
      e.target.remove()
      yabaweeWrap.remove()
      prevBtn.remove()
      yabawee(gameMenu)
    })
    yabaweeWrap.append(reSelectBtn)

  }

  wrap.append(yabaweeWrap);
}

export default yabawee