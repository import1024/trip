// 新增旅行：复制一个对象并填写字段；同时将该旅行网页放入 path 对应的文件夹。
// start/end 必须带时区。end 使用最后抵达时刻，而不是最后一天的起飞时刻。
// 原有 HTML 攻略也可以直接加入，不需要改写成相同模板。
window.TRIPS = [
  {id:'hanoi-2026',title:'红河以北',dates:'2026.04.03—04.07',start:'2026-04-03T00:00:00+07:00',end:'2026-04-08T00:00:00+07:00',path:'2026/hanoi/',image:'2026/hanoi/poster.jpg',summary:'河内 · 老城的街巷、红河的日落，和一杯慢慢喝的咖啡。四人吃喝拍照攻略归档。',people:'4 人同行',type:'攻略归档',note:'2026 年 4 月的出行计划'},
  {id:'guiyang-2026',title:'洋芋王国',dates:'2026.05.01—05.05',start:'2026-05-01T00:00:00+08:00',end:'2026-05-06T00:00:00+08:00',path:'2026/guiyang/',image:'2026/guiyang/poster-v2.jpg',summary:'贵阳 · 山城老巷、黔灵山与南明河。五天 City Walk，把酸汤、咖啡、精酿和洋芋排进行程。',people:'3 人同行',type:'攻略归档',note:'2026 年 5 月的出行计划'},
  {
    id: 'yunnan-2026',
    title: '香格里拉',
    dates: '2026.09.25—09.30',
    start: '2026-09-25T09:06:00+08:00',
    end: '2026-10-01T00:00:00+08:00',
    path: '2026/yunnan/',
    image: '2026/yunnan/poster-v2.jpg',
    summary: '丽江 · 虎跳峡 · 香格里拉。从古城屋顶到峡谷高路，再进入高原湿地与雪山之间。',
    people: '1 人独行',
    type: '摄影行程',
    note: '9 月 25 日 09:06 从科韵路出发'
  },
  {
    id: 'indonesia-2026',
    title: '山燃海蓝',
    dates: '2026.10.01—10.08',
    start: '2026-10-01T07:50:00+08:00',
    end: '2026-10-09T00:30:00+08:00',
    path: '2026/indonesia/',
    image: '2026/indonesia/poster-v3.jpg',
    summary: '印尼 · 巴厘岛 · 吉隆坡。从爪哇的火山与雨林，到巴厘岛的海岸。',
    people: '3 人同行',
    type: '实时行程',
    note: '10 月 9 日凌晨抵达广州'
  }
];
