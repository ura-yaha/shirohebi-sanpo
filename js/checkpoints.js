/* チェックポイントの定義。ここだけ書き換えれば増減できる */
const CP_LIST = [
  { id: 1, name: '<ruby>第一<rt>だいいち</rt></ruby>のしるし', place: 'バラ<ruby>園<rt>えん</rt></ruby>のそば',
    lat: 34.685675, lng: 135.493860, radius: 15,
    quiz: '<ruby>世界<rt>せかい</rt></ruby>バラ<ruby>会議<rt>かいぎ</rt></ruby> <ruby>大阪<rt>おおさか</rt></ruby><ruby>大会<rt>たいかい</rt></ruby>は、<ruby>何年<rt>なんねん</rt></ruby>にひらかれた？',
    choices: ['2006<ruby>年<rt>ねん</rt></ruby>', '1999<ruby>年<rt>ねん</rt></ruby>', '2026<ruby>年<rt>ねん</rt></ruby>'], answer: 0,
    hint: '<ruby>石<rt>いし</rt></ruby>にはめこまれた<ruby>板<rt>いた</rt></ruby>の、まんなかあたりに<ruby>大<rt>おお</rt></ruby>きな<ruby>数字<rt>すうじ</rt></ruby>があるよ。',
    voice: 'ここ、むかしは<ruby>水辺<rt>みずべ</rt></ruby>だったんだ。<ruby>花<rt>はな</rt></ruby>の<ruby>下<rt>した</rt></ruby>に、まだ<ruby>海<rt>うみ</rt></ruby>のにおいが<ruby>残<rt>のこ</rt></ruby>ってる。',
    pic: './img/cp1.jpg' },

  { id: 2, name: '<ruby>第二<rt>だいに</rt></ruby>のしるし', place: '<ruby>彫像<rt>ちょうぞう</rt></ruby>のひろば',
    lat: 34.685077, lng: 135.494170, radius: 15,
    quiz: 'ひろばにいるリアルな「ちょうぞう」。\n<ruby>全部<rt>ぜんぶ</rt></ruby>で<ruby>何体<rt>なんたい</rt></ruby>いるかな？',
    choices: ['5', '6', '7'], answer: 2,
    hint: 'ぐるっと<ruby>見<rt>み</rt></ruby>わたして、みんなを<ruby>数<rt>かぞ</rt></ruby>えてあげてね。',
    voice: '<ruby>木<rt>き</rt></ruby>はね、<ruby>人<rt>ひと</rt></ruby>より<ruby>長<rt>なが</rt></ruby>く<ruby>生<rt>い</rt></ruby>きる。だから<ruby>人<rt>ひと</rt></ruby>の<ruby>願<rt>ねが</rt></ruby>いを、よーく<ruby>覚<rt>おぼ</rt></ruby>えてるんだ。',
    pic: './img/cp2.jpg' },

  { id: 3, name: '<ruby>第三<rt>だいさん</rt></ruby>のしるし', place: '<ruby>公園<rt>こうえん</rt></ruby>のはし',
    lat: 34.684920, lng: 135.493454, radius: 15,
    quiz: '<ruby>花壇<rt>かだん</rt></ruby>の<ruby>中<rt>なか</rt></ruby>にある<ruby>小<rt>ちい</rt></ruby>さな<ruby>塔<rt>とう</rt></ruby>\n<ruby>屋根<rt>やね</rt></ruby>はどんな<ruby>形<rt>かたち</rt></ruby>でしょう？',
    choices: ['ひらべったい', 'とんがっている', 'まるまっている'], answer: 1,
    hint: '<ruby>塔<rt>とう</rt></ruby>がある<ruby>花壇<rt>かだん</rt></ruby>は<br>ボランティアと<ruby>靭幼稚園<rt>うつぼようちえん</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>たち<br>がきれいにしてくれてるんだ',
    voice: 'そのすぐ<ruby>近<rt>ちか</rt></ruby>くにある<br><ruby>大<rt>おお</rt></ruby>きい<ruby>道路<rt>どうろ</rt></ruby>を<ruby>渡<rt>わた</rt></ruby>った<ruby>向<rt>む</rt></ruby>こうに<br>おいらの<ruby>帰<rt>かえ</rt></ruby>る<ruby>木<rt>き</rt></ruby>があるよ。',
    pic: './img/cp3.jpg'  }
];
  
  /* 進捗の保存・読み出し */
  const Stamp = {
    all()      { try { return JSON.parse(localStorage.getItem('shirohebi_stamps') || '[]'); } catch(e) { return []; } },
    has(id)    { return this.all().includes(id); },
    add(id)    { const s = this.all(); if (!s.includes(id)) { s.push(id); localStorage.setItem('shirohebi_stamps', JSON.stringify(s)); } },
    count()    { return this.all().length; },
    isComplete(){ return this.count() >= CP_LIST.length; },
    reset()    { localStorage.removeItem('shirohebi_stamps'); }
  };
  
  /* 2点間の距離（メートル） */
  function distanceM(a, b, c, d) {
    const R = 6371000, r = Math.PI / 180;
    const dLat = (c - a) * r, dLng = (d - b) * r;
    const x = Math.sin(dLat/2)**2 + Math.cos(a*r) * Math.cos(c*r) * Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  