const yabawee = (gameMenu) => {
  const wrap = document.querySelector('.wrap');
  const prevBtn = document.createElement('button');
  prevBtn.innerText = '이전으로'
  prevBtn.addEventListener('click',(e)=>{
    e.target.remove();
    gameMenu();
    yabaweeWrap.remove();
    clearInterval(interval);
    clearTimeout(timer)
  })
  wrap.append(prevBtn)
  const yabaweeWrap = document.createElement('div');
  yabaweeWrap.style.cssText = `
      width:100%; height: 30vh;
      position:relative;
    `
  const btnWrap = document.createElement('div')
  const btn3 = document.createElement('button');
  const btn5 = document.createElement('button');
  const btn8 = document.createElement('button');
  btn3.style.display = 'block';
  btn5.style.display = 'block';
  btn8.style.display = 'block';
  btn3.innerText = '컵 3개 (정답시 1.5배)';
  btn5.innerText = '컵 5개 (정답시 2배)';
  btn8.innerText = '컵 8개 (정답시 3배)';
  btnWrap.append(btn3,btn5,btn8)
  yabaweeWrap.append(btnWrap)
  const setYabawee = (cupCount)=>{

    const centerCha = (100 / cupCount) / 2;
    const cupWidth = (100 / cupCount) - 5;
    let cups = []
    let sum = 1
    for (let i = 1; i <= cupCount; i++) {
      const cup = document.createElement('div');
  
      cup.style.cssText = `
        width:${cupWidth}%;
         height:50%; 
         clip-path: polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%);
         background-color:#3CB371;
         position:absolute; 
         bottom:0; 
         left: calc(${centerCha * sum}% - ${cupWidth / 2}% ); transition: all 0.4s linear`;
      yabaweeWrap.append(cup)
      cups.push(cup)
      sum += 2
    }
  }

  // let interval = setInterval(() => {
  //   cups.sort(() => Math.random() - 0.5);
  //   sum = 1
  //   cups.forEach((cup, idx) => {
  //     cup.style.left = `calc(${centerCha * sum}% - ${cupWidth / 2}% )`;
  //     sum += 2
  //   })
  // }, 500)

  // let timer = setTimeout(() => {
  //   clearInterval(interval)
  // }, 10000)
  wrap.append(yabaweeWrap);
}

export default yabawee