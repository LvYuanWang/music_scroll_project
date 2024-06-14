(function () {
  /**
   * 从网络获取歌词数据
   * @returns Promise
  */
  async function getLrc() {
    return await fetch('https://study.duyiedu.com/api/lyrics')
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }
  const lrc = `
  [00:00.000] 作词 : 唐思淼
  [00:01.000] 作曲 : 关天天
  [00:02.000] 编曲 : 关天天
  [00:03.000] 制作人 : 关天天/姚政
  [00:17.433]什么是完整的睡眠
  [00:24.684]清醒的黑夜 在撕碎 梦一片片
  [00:31.933]睁开眼犹豫的指尖
  [00:37.682]该不该挽留 让你陪在身边
  [00:45.942]来时路的终点 是和你遇见
  [00:53.187]唯有你让那誓言 漫过时间
  [01:01.445]痛到失去了语言
  [01:04.939]我 心里却非苦似甜
  [01:08.440]依旧是倔强的少年
  [01:14.433]我要张开我怀抱 变成你城堡
  [01:21.696]只有你是我的 解药
  [01:29.187]让我为你画一幅画  用我全部生命做沙
  [01:32.683]倾注所有情绪也罢  画出属于我们的家
  [01:36.381]那些幽暗过去在下着雨
  [01:38.389]想念你的情绪害怕失去
  [01:40.133]乘着光和勇气再踏着雨
  [01:42.135]用尽所有生命在画着你
  [01:43.892]我 心如四海 放眼望去 那些高楼全部坍塌
  [01:47.136]你也 从不后悔 哪怕剩下背影 也要在我身旁安家
  [01:50.630]唯一解药被你得到
  [01:52.632]永远等候你的怀抱
  [01:54.380]做你生命中的依靠
  [01:56.562]漫漫人生路上最需要
  [01:58.571]来时路的终点 是和你遇见
  [02:05.812]我们和从前挥别 就在今天
  [02:14.030]当你握住我的手
  [02:17.521]我拥有一整个宇宙
  [02:21.267]而你是星光照亮我
  [02:27.522]我要张开我怀抱 变成你城堡
  [02:34.763]只有你是我的 解药
  [02:54.524]当你握住我的手
  [02:57.771]我拥有一整个宇宙
  [03:01.267]而你是星光照亮我
  [03:08.012]我要张开我怀抱 变成你城堡
  [03:14.766]只有你是我的 解药
  [03:43.853]本歌曲来自 网易 “归乐计划”
  [03:44.388] 吉他 : 关天天
  [03:44.923] 贝斯 : 关天天
  [03:45.458] 吉他Solo : 劳国贤
  [03:45.993] RAP编写 : Yeger
  [03:46.528] 混音 : 刘城函
  [03:47.063] 母带 : Ted Jensen
  [03:47.598] 弦乐 : 国际首席爱乐乐团
  [03:48.133] 伴唱 : 队长/俞建明
  [03:48.668] 和声编写 : 队长
  [03:49.203] 原著作者：巫哲
  [03:49.738] 
  [03:50.273] 合作平台：晋江文学城
  [03:50.808] 
  [03:51.343] 本歌曲为晋江文学城作品《解药》官方主题曲`;
  let lrcData;
  let list = '';
  function $(select) {
    return document.querySelector(select);
  }
  const doms = {
    audio: $('audio'),
    ul: $('.ul-container')
  }
  const size = {
    liHeight: 30,
    containerHeight: $('.container').offsetHeight
  }
  // 初始化
  function init() {
    lrcData = lrc.split("\n").filter(item => item).map(item => {
      const parts = item.split(']');
      const timeParts = parts[0].trim().replace('[', '').split(':');
      list += `<li>${parts[1]}</li>`;
      return {
        time: +timeParts[0] * 60 + + timeParts[1],
        text: parts[1]
      };
    });
    doms.ul.innerHTML = list;
  }
  init();

  // 交互事件
  doms.audio.addEventListener('timeupdate', function () {
    setStatus(this.currentTime);
  })
  function setStatus(time) {
    // 微调
    time += 0.3;
    const active = $('.active');
    active && active.classList.remove('active');
    const index = lrcData.findIndex(lrc => lrc.time > time) - 1;
    if (index < 0) {
      return;
    }
    doms.ul.children[index].classList.add('active');
    // 调整li的滚动
    let top = size.liHeight * index - size.containerHeight / 2;
    top = -top;
    console.log(top);
    if (top > 0) {
      top = 0;
    }
    doms.ul.style.transform = `translateY(${top}px)`;
  }
})()
