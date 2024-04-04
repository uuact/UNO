//生成初始牌堆
let  reall = 0;
let  超级消消乐玩家 = false;

function generateUnoDeck() {
  const colorCodes = ['红', '蓝', '绿', '黄'];
  const deck = []; // 存放牌的数组

  // 数字卡（0-9）
  if (C3.checked) {
        for (let i = 0; i <= 9; i++) {
            colorCodes.forEach(colorCode => {
              deck.push({ color: colorCode, value: i });
              if (i !== 0) { // 0号牌每种颜色只有一张
                deck.push({ color: colorCode, value: i });
              }
            });
        }
        reall ++;
    }
  
  // 特殊卡片
  const specialCardsValues = ['+2', '反转', '禁止'];
  if (C2.checked) {
        specialCardsValues.forEach(value => {
        colorCodes.forEach(colorCode => {
            deck.push({ color: colorCode, value });
            deck.push({ color: colorCode, value });
            });
        });
        reall ++;
    }

  // 万能卡和万能+4卡
  const wildCardsValues = ['万能', '万能+4'];
  if (C1.checked) {
        wildCardsValues.forEach(value => {
            for (let i = 0; i < 4; i++) { // 每种万能牌四张
                deck.push({ color: '万能', value });
            }
        });
        reall ++;
        超级消消乐玩家 = 1;
    }

  if (reall == 0) {
    alert('YOU!😅')
    location.reload();//刷新页面
  } else {
      if (reall == 1 && 超级消消乐玩家 == 1){ console.warn('糟了，是来玩超级消消乐的') };

      // 打乱牌组
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

     return deck;//返回牌组数据
  }

}

let unoDeck = generateUnoDeck();
let a = [unoDeck.pop()];//‘当前牌’数值

if (numplay == 0 || numdeck == 0){
  alert('YOU!☹')
  location.reload();//刷新页面
}else if (numplay == 1) {
  console.warn('不要突然这么伤感啊☹');
}

let Iis = 0;//当前玩家

let players = [];
let whoq = [];//录入禁止次数
for (let i = 0; i < numplay; i++) {	 players.push([]);   whoq.push([0]);  }

//发牌
function dealCards(deck, players, numCards) {
    for (let i = 0; i < numCards; i++) { // 遍历发牌数量
        for (let j = 0; j < players.length; j++) { // 遍历玩家数
            if (deck.length == 0) {
                deck = generateUnoDeck(); // 牌用完生成新的 Uno 牌堆
            }
            const card = deck.pop(); // 从牌堆中取出一张牌
            players[j].push(card); // 将牌放入当前玩家的手牌数组中
        }
    }
 }

dealCards(unoDeck, players, numdeck); // 牌堆，所有玩家牌组，发牌数量

const uno = document.createElement('div');
uno.id = 'uno';
uno.className = 'uno';
document.body.appendChild(uno);// 将主体div插入到body元素内,因为这个，script引用得在body后
const unoDiv = document.getElementById('uno');//方便引用的定义

const adeck = document.createElement('div');
adeck.id = '当前牌';
document.body.appendChild(adeck);//插入
adeck.textContent = '当前牌：' + a[0].value;
adeck.className = 'adeck ' + a[0].color;

const me = document.createElement('div');
me.className = 'me';
unoDiv.appendChild(me); // 将本玩家div插入到主体div元素内

const button = document.createElement('div');
button.className = 'button';
button.textContent = '出牌';
button.onclick = ok;
unoDiv.appendChild(button); // 将出牌插入到主体div元素内

const no = document.createElement('div');
no.className = 'buttonNO';
no.textContent = '不出';
no.onclick = next;
unoDiv.appendChild(no); // 将不出牌插入到主体div元素内

function bbb(){//刷新玩家牌组的显示
  while (me.firstChild) { //清空div
    me.removeChild(me.firstChild);
  }
  for (let i=0; i<players[Iis].length; i++){//增加div
   const deckdiv = document.createElement('div')
   //deckdiv.id = i;
   deckdiv.className = `${players[Iis][i].color}`;
   deckdiv.onclick = function() { choose(this);};
   deckdiv.textContent = players[Iis][i].value;
   me.appendChild(deckdiv);
  }
}
bbb();

let chooseDeck = [];//临时牌组
let n = a;

let BBB;
function bt(www) {//为了方便数组读取，真是难为我的小脑子了
  BBB =parseInt( www ) + steer; //parseInt解决了一个奇妙的特性
  if (BBB < 0 && steer == -1) {                      //用于数组
    BBB = numplay -1; // 如果位置小于0，就给到最后一个玩家
  } else if (BBB >= numplay && steer == 1) {
    BBB = 0; // 如果位置超出了玩家总数，就给到第一个玩家
  }
}

let colors;
let randomIndex;
let randomColor;
function color(){
colors = ["salmon", "gold", "yellowgreen", "orange", "violet"];
randomIndex = Math.floor(Math.random() * colors.length);
randomColor = colors[randomIndex]; // 获取随机颜色
}

/*选牌*/  // <(//v//)>脑容溢出，已傻
function choose(element) {
  let d = element.className;
  let b = element.textContent; 
  let z = n[0].color;//n=a，a是当前牌
  let y = n[0].value;

  if (element.style.color !== '') { //反选
    element.style.color = '';//样式
    element.style.backgroundColor = '';

    let c = chooseDeck.findIndex(card => card.color == d && card.value == b);//如果选中的颜色、数值的索引是同一个
    if (c == chooseDeck.length-1 && chooseDeck.length > 2) {//如果选的是最后一张，而牌组有两张以上则重置为上一张
      n = chooseDeck[1]
    }else if (c == chooseDeck.length-1 && chooseDeck.length == 1){//如果选的是最后一张，且只剩下这一张时则重置n为当前牌
      n = a;
    }
    chooseDeck.splice(c,1);

  }else if (d == z && chooseDeck.length == 0) {//以下是选择，d、z是颜色 b、y是数字
    n = [{color : d, value : b}] //颜色只有第一张拥有正确的选择意义
    wath();
  }else if (b == y) {
    n = [{color : d, value : b}]//数值相同
    wath();
  }else if (z == '万能'){
    n = [{color : d, value : b}]//如果开局第一张是万能，则允许任何改动
    wath();
  }else if (d == '万能' && z == '万能' || d == '万能' && chooseDeck.length == 0){
    n = [{color : d, value : b}]//如果选牌是万能且上一张是万能或选牌是第一张选牌，则更改为万能
    wath();
  }

  function wath() {//因为都要用就单独拎了出来
    element.style.backgroundColor = 'rgba(0, 0, 0, 0)';//选中样式
    if (d === '红'){
      element.style.color = "salmon";
    }else if (d === '蓝'){
      element.style.color = 'aqua';
    }else if (d === '黄'){
      element.style.color = 'gold';
    }else if (d === '绿'){
      element.style.color = 'yellowgreen';
    }else if (d === '万能'){
      element.style.color = 'violet'
  }
  chooseDeck.push({color : d, value : b});//往预备牌组添加选牌
  }
}

/*出牌*/
let q=0;//被禁止的次数
let steer = 1;//反转
let AAA;//这很难解释
let LLL;//这很难解释
//let who;//谁被禁
function ok() {
  BBB = Iis + 1;
  console.log('玩家'+ BBB +'出了：' + chooseDeck.length +'张卡牌', chooseDeck);

  if (chooseDeck.length !==0) {
    let o = 0;
    LLL = BBB;//玩家的显示号数
    bt(Iis);
    AAA = BBB;//下一个玩家的真实号
    BBB = AAA + 1;//下一个玩家的显示号数

    for (o = 0;o<chooseDeck.length ; o++) {
      let d = chooseDeck[o].color;
      let b = chooseDeck[o].value;
      let c = players[Iis].findIndex(card => card.color ==d && card.value == b);

      players[Iis].splice(c,1)
      console.log('玩家',LLL,d,b,players[Iis])

      if (players[Iis].length == 0){
        sz.style.width = 98+'%';
        sz.style.height = 97+'%';
        let qqq = document.createElement('div');
        qqq.className = 'nnn';
        sz.appendChild(qqq);
        const ppp = document.createElement('h1');

        setInterval(function() {
          color();
          ppp.remove();
          ppp.textContent = `玩家${LLL}获得了胜利！`;
          ppp.style.color = randomColor;
          qqq.appendChild(ppp);
          console.log(`%c玩家${LLL}获得了胜利！`, `font-weight: bold; font-size: 50px; color: ${randomColor}`);
        },500)

        setTimeout(function() {
          location.reload();
        },5000)
      }else{

        if (b == '万能+4'){
          console.log('玩家'+ BBB +'被加牌4张');
          for (i = 0 ; i < 4 ; i++) {
            if (unoDeck.length == 0) {
              unoDeck = generateUnoDeck();
              i--; //补一次
            } else {
              players[AAA].push(unoDeck.pop()); //将牌加给下一个玩家
            }
          }
          console.log(BBB + '号玩家被+4  现有牌数：'+  players[AAA].length , players[AAA])          

        }else if (b == '+2'){

          console.log('玩家'+ BBB +'被加牌2张');
          for (i = 0 ; i < 2 ; i++) {
            if (unoDeck.length == 0) {
              unoDeck = generateUnoDeck();
              i--; //补一次
            } else {
              players[AAA].push(unoDeck.pop()); //将牌加给下一个玩家
            }
          }
          console.log(BBB + '号玩家被+2  现有牌数：'+  players[AAA].length , players[AAA])

        }else if (b == '反转'){
          steer = steer*-1;

        }else if (b == '禁止'){
          q++;
          whoq[AAA] =[q];  //whoq的序列等于Iis排序
        }

        if (o == chooseDeck.length-1) {
          a = [chooseDeck[chooseDeck.length-1]];//重置，a怎么跟个备份的一样(饶头
          n = a;
          adeck.textContent = '当前牌：' + a[0].value;
          adeck.className = 'adeck ' + a[0].color;
          chooseDeck.length = 0; //清零
          nextplayer();
        }        
      }
    }
  }
}


/*不出牌*/
function next() {
  if (unoDeck.length == 0){//检查牌数
    unoDeck = generateUnoDeck();
  }else{
    players[Iis].push(unoDeck.pop())//加牌

    nextplayer();
  }
}

/*换人*/
function nextplayer() {
  bt(Iis);//下一个玩家的真实号
  Iis = BBB;
  BBB = Iis + 1;//下一个玩家的显示号数，因为Iis+1必然等于

  let w = whoq[Iis].indexOf(0);
  if (w == -1){
    q = whoq[Iis][0];
    console.log('玩家'+ BBB +'需要等待'+ q +'回合才可以出牌' );
    q--;
    whoq[Iis] = [q];

    bt(Iis);
    Iis = BBB;
    BBB = Iis + 1;
  }
    
  bbb();//更新用户卡组显示
  console.warn('轮到玩家' + BBB);

  sz.style.width = 98+'%';
  sz.style.height = 97+'%';

  color();
  let qqq = document.createElement('div');
  qqq.className = 'nnn';
  sz.appendChild(qqq);

  const ppp = document.createElement('h1');
  ppp.textContent = `轮到玩家 ${BBB}`;
  ppp.style.color = randomColor;
  qqq.appendChild(ppp);

  setTimeout(function() {
    while (sz.firstChild) {//清空设置div内的所有元素
      sz.removeChild(sz.firstChild);
    }
    sz.style.width = 0+'%';
    sz.style.height = 0+'%';
  }, 1000);

}
