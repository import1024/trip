const DAYS=[
['10-01','启程 · 雅加达','广州出发',8,'07:50','前往深圳机场途中留意时间；深圳起飞时间为北京时间。'],
['10-02','雅加达 → 泗水','城市与转场',7,'08:00','上午参观顺序按现场调整，最迟 11:30 从市中心出发前往机场。'],
['10-03','赛武千层瀑布','走入雨林',7,'07:00','雨林溯溪重点防滑、防水，手机与相机做好二次防水。'],
['10-04','布罗莫火山','火山日出',7,'00:00','凌晨风大注意保暖；N95 必带，相机尽量少换镜头。'],
['10-05','宜珍 → 罗威纳','从火山到海边',7,'01:00','进入巴厘岛后时钟快 1 小时。宜珍路线、蓝火焰观赏以现场开放情况为准。'],
['10-06','罗威纳 · 乌布 · 金巴兰','海豚与梯田',8,'06:00','晚间海滩活动视体力决定；金巴兰酒店不在海边，需要打车。'],
['10-07','佩尼达岛 → 吉隆坡','海岛与夜航',8,'06:00','22:15 国际航班。快船或海况延误时以返程赶机为优先，不增加额外项目。'],
['10-08','吉隆坡 → 广州','城市漫步',8,'02:20','16:30–17:00 搭乘机场快线；20:15 起飞，10 月 9 日 00:30 抵达广州。']
].map((x,i)=>({date:'2026-'+x[0],title:x[1],short:x[2],offset:x[3],start:x[4],notice:x[5],i}));
const EVENTS=[];
function add(day,time,title,note='',maps=[],important=false,offset=null){const d=DAYS[day-1];EVENTS.push({id:'e'+EVENTS.length,day:day-1,date:d.date,time,title,note,maps,important,offset:offset??d.offset,at:Date.parse(d.date+'T'+time+':00+0'+(offset??d.offset)+':00')});}
add(1,'07:50','车陂出发','地铁至新塘约 40 分钟，步行至新塘南约 13 分钟。',[['车陂站','Chebei Station Guangzhou'],['新塘南站','Xintangnan Railway Station']],true);
add(1,'09:11','C4963 · 新塘南 → 沙井西','10:24 抵达，随后打车去吃鱼粉。',[['沙井西站','Shajing West Railway Station']],true);
add(1,'10:24','沙井西抵达 · 午餐','打车至杨婆渔粉郴州非遗美食工坊。',[['杨婆渔粉','杨婆渔粉郴州非遗美食工坊 深圳']]);
add(1,'11:15','最迟离开餐厅 · 前往机场','打车至沙井 A 地铁口，11 号线前往机场 T3。',[['沙井站','Shajing Metro Station Shenzhen'],['深圳机场 T3','Shenzhen Baoan International Airport Terminal 3']],true);
add(1,'14:10','深圳 → 雅加达','起飞 14:10（北京时间）；抵达 18:20（雅加达时间）。',[],true);
add(1,'18:20','抵达雅加达 · 入境与入住','住宿 MAXONE Rota Wahid Hasyim。晚上 Sarinah → Bundaran HI，附近吃饭散步。到店时间依交通而定。',[['雅加达机场','Soekarno Hatta International Airport'],['酒店','MAXONE Rota Wahid Hasyim Jakarta'],['Sarinah','Sarinah Jakarta'],['Bundaran HI','Bundaran HI Jakarta']],false,7);
add(2,'08:00','雅加达地标散步','建议 08:00 开始（预留时间）。Monas → 伊斯蒂克拉尔清真寺 → 主教座堂，10:30 左右结束。',[['Monas','Monas Jakarta'],['清真寺','Istiqlal Mosque Jakarta'],['主教座堂','Jakarta Cathedral']]);
add(2,'10:30','结束参观 · 简单午餐','附近用餐，准备离开市中心。');
add(2,'11:30','最迟出发前往雅加达机场','给道路拥堵、安检和登机留出余量。',[['雅加达机场','Soekarno Hatta International Airport']],true);
add(2,'15:05','雅加达 → 泗水','15:05–16:35，均为爪哇当地时间。',[],true);
add(2,'16:35','泗水抵达 · 旅行社接机','住宿泗水首都酒店（预计，具体酒店待团方确认）。附近吃饭，早点休息。',[['泗水机场','Juanda International Airport Surabaya']]);
add(3,'07:00','早餐','带好防水装备。');
add(3,'07:30','酒店大堂集合','出发前往赛武千层瀑布，具体抵达时间以团方安排为准。',[['赛武千层瀑布','Tumpak Sewu Waterfall Lumajang']],true);
add(3,'12:00','瀑布游览 · 午餐','12:00 为午间占位时间；雨林溯溪、周边用餐均以团方安排为准。',[['赛武千层瀑布','Tumpak Sewu Waterfall']]);
add(3,'14:30','前往布罗莫方向','14:30 为按车程倒推的预计出发时间，车程约 4 小时。');
add(3,'18:30','预计抵达布罗莫公园酒店','酒店具体名称和位置待团方确认。晚餐后直接休息，午夜退房。');
add(4,'00:00','退房 · 出发布罗莫','前往火山小镇，凌晨至上午进行日出及火山区域游览。',[['布罗莫火山','Mount Bromo']],true);
add(4,'10:30','结束火山游览','准备返回火山小镇。');
add(4,'11:00','返回小镇 · 前往宜珍方向','长途转场，途中尽量休息。');
add(4,'16:00','预计入住阿斯顿外南梦酒店','简单晚餐后休息，次日 01:00 集合。',[['阿斯顿酒店','ASTON Banyuwangi Hotel Conference Center']]);
add(5,'01:00','酒店集合 · 宜珍徒步','蓝火焰观赏取决于开放与现场条件，火山口按团方安排使用防毒面具。',[['宜珍火山','Kawah Ijen']],true);
add(5,'08:00','结束宜珍徒步','休整，准备转场巴厘岛。');
add(5,'10:30','前往巴厘岛','此时间为爪哇时间。进入巴厘岛后，与北京时间相同。',[],true);
add(5,'15:00','入住罗威纳酒店','此时间为巴厘岛时间。具体酒店待团方确认。海边散步、日落、晚餐，早点休息。',[['罗威纳海滩','Lovina Beach Bali']],false,8);
add(6,'06:00','罗威纳出海看海豚','按团方集合与船只安排出海。',[['罗威纳','Lovina Beach Bali']],true);
add(6,'08:00','返回酒店 · 早餐','休整后继续行程。');
add(6,'11:00','乌布皇宫 · 艺术市场','逛皇宫和市场。',[['乌布皇宫','Ubud Palace Bali'],['艺术市场','Ubud Art Market Bali']]);
add(6,'12:30','乌布午餐','自行用餐。');
add(6,'14:00','德格拉朗梯田','按团方安排游览。',[['德格拉朗梯田','Tegallalang Rice Terrace Bali']]);
add(6,'15:00','前往库塔 / 金巴兰','预计 17:00 左右入住。');
add(6,'17:00','入住 · 金巴兰日落','贝斯特韦斯特卡马拉金巴兰酒店。体力允许再 Grab 前往海滩看日落和吃饭。',[['酒店','Best Western Kamala Jimbaran'],['金巴兰海滩','Jimbaran Beach Bali']]);
add(7,'06:00','早餐','带上护照与航班所需物品，确认行李安排。');
add(7,'07:00','酒店大堂集合','前往码头，具体码头以团方通知为准。',[],true);
add(7,'09:00','佩尼达岛','海况影响船程，请留意团方返程安排。',[['佩尼达岛','Nusa Penida Bali']]);
add(7,'10:00','卡玛湾浮潜','中文地点可能存在译名差异，请团方确认实际浮潜点。',[['佩尼达岛浮潜区域','Nusa Penida snorkeling']]);
add(7,'12:30','午餐','按团方安排。');
add(7,'13:30','精灵坠崖 · 天神浴池 · 天仙裂缝','结合当日体力与海况调整，不增加项目。',[['精灵坠崖','Kelingking Beach Nusa Penida'],['天神浴池','Angels Billabong Nusa Penida'],['天仙裂缝','Broken Beach Nusa Penida']]);
add(7,'16:30','计划返回巴厘岛','攻略中的返程节点，是否为离岛或抵达时间需团方确认；延误时优先赶航班。',[],true);
add(7,'18:00','晚餐','根据返程进度调整。');
add(7,'19:30','送机 · 巴厘岛机场','国际航班 22:15 起飞。',[['巴厘岛机场','I Gusti Ngurah Rai International Airport']],true);
add(7,'22:15','巴厘岛 → 吉隆坡','次日 01:20 抵达，两地时间相同。',[],true);
add(8,'01:20','抵达吉隆坡机场','入境后前往酒店。航站楼请以机票为准。',[['吉隆坡机场','Kuala Lumpur International Airport']]);
add(8,'02:20','预计打车前往黄金酒店','Lot 12952, Jalan BBN 1/7d, Putra Nilai。预计时间取决于入境进度。',[['黄金酒店地址','Lot 12952 Jalan BBN 1/7d Putra Nilai Malaysia']]);
add(8,'09:00','起床 · 早餐','按睡眠和体力调整市区行程。');
add(8,'10:00','退房 · 前往 KL Sentral','Grab 前往车站，约 11:00 寄存行李。',[['KL Sentral','KL Sentral Kuala Lumpur']],true);
add(8,'11:00','KL Sentral 寄存行李','确认寄存点位置和取件时间。',[['KL Sentral','KL Sentral Kuala Lumpur']]);
add(8,'11:20','独立广场','参观至约 12:00。',[['独立广场','Merdeka Square Kuala Lumpur']]);
add(8,'12:00','中央市场','步行前往 Central Market。',[['中央市场','Central Market Kuala Lumpur']]);
add(8,'12:30','茨厂街午餐','约 13:30 结束。',[['茨厂街','Petaling Street Market Kuala Lumpur']]);
add(8,'13:45','前往 KLCC','预留约 30 分钟转场。',[['KLCC','Suria KLCC Kuala Lumpur']]);
add(8,'14:15','双子塔 · KLCC 公园','以外观与公园散步为主，15:30 离开。',[['双子塔','Petronas Twin Towers'],['KLCC 公园','KLCC Park Kuala Lumpur']]);
add(8,'15:30','返回 KL Sentral','预计 16:15 抵达，取行李。',[['KL Sentral','KL Sentral Kuala Lumpur']],true);
add(8,'16:15','取行李','准备搭乘机场快线。');
add(8,'16:30','KLIA Ekspres 前往机场','计划 16:30–17:00 出发。确认航班航站楼，勿将此时间当成固定车次。',[['KL Sentral','KL Sentral Kuala Lumpur'],['吉隆坡机场','Kuala Lumpur International Airport']],true);
add(8,'20:15','吉隆坡 → 广州','10 月 9 日 00:30 抵达广州，两地时间相同。',[],true);
EVENTS.push({id:'arrival',day:7,date:'2026-10-09',time:'00:30',title:'抵达广州 · 旅程结束',note:'跨日抵达：10 月 9 日 00:30（北京时间）。',maps:[['广州白云机场','Guangzhou Baiyun International Airport']],important:true,offset:8,at:Date.parse('2026-10-09T00:30:00+08:00')});
EVENTS.sort((a,b)=>a.at-b.at);
if(typeof module!=='undefined')module.exports={DAYS,EVENTS};
