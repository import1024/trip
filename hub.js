(() => {
 const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const safe = s => { const u = new URL(s, location.href); return ['https:','http:','file:'].includes(u.protocol) ? e(s) : '#'; };
 function render() {
  const now = Date.now();
  const trips = [...(window.TRIPS || [])].sort((a,b)=>Date.parse(b.start)-Date.parse(a.start));
  const stories = [...(window.STORIES || [])];
  const current = trips.filter(t=>now>=Date.parse(t.start)&&now<Date.parse(t.end));
  const future = trips.filter(t=>Date.parse(t.start)>now).sort((a,b)=>Date.parse(a.start)-Date.parse(b.start));
  const status = t => now<Date.parse(t.start)?'即将出发':now<Date.parse(t.end)?'旅途中':'已结束';
  const chosen = current[0] || future[0];
  const featured = document.getElementById('featured');
  featured.innerHTML = chosen ? `<div class="featured"><div><span class="eyebrow">${current.length?'当前旅程':'下一段旅程'}</span><h2>${e(chosen.title)}</h2><p>${e(chosen.dates)} · ${e(chosen.people)}</p><p>${e(chosen.summary)}</p><a class="button" href="${safe(chosen.path)}">${current.length?'查看当前安排':'查看旅行计划'} ↗</a></div><div class="count"><span>${current.length?'正在旅途中':'距离出发'}</span><strong>${current.length?'旅途中':Math.ceil((Date.parse(chosen.start)-now)/86400000)+' 天'}</strong><span>${e(chosen.note)}</span></div></div>` : '<p class="finished">已收录的旅途都已结束，随时可以打开重温。</p>';
  document.getElementById('total').textContent=`${trips.length} 段旅途`;
  document.getElementById('trips').innerHTML=trips.map(t=>`<a class="trip" href="${safe(t.path)}">${t.image?`<img src="${safe(t.image)}" alt="${e(t.title)}旅行海报" loading="lazy">`:`<div class="noimage">${e(t.title)}</div>`}<div><div class="meta"><span class="badge">${status(t)}</span><span>${e(t.type || '旅行攻略')}</span></div><h3>${e(t.title)}</h3><p class="dates">${e(t.dates)} · ${e(t.people)}</p><p>${e(t.summary)}</p><span class="open">查看旅程 ↗</span></div></a>`).join('') || '<p>尚未收录旅途记录。</p>';
  document.getElementById('story-total').textContent=`${stories.length} 篇记录`;
  document.getElementById('stories').innerHTML=stories.map(s=>`<a class="story-card" href="${safe(s.path)}">${s.image?`<img src="${safe(s.image)}" alt="${e(s.title)}封面照片" loading="lazy">`:''}<div><div class="meta"><span class="badge record">旅途记录</span><span>${e(s.type || '旅行随笔')}</span></div><h3>${e(s.title)}</h3><p class="dates">${e(s.dates)} · ${e(s.meta || '')}</p><p>${e(s.summary)}</p><span class="open">阅读记录 ↗</span></div></a>`).join('') || '<p>尚未收录旅途记录。</p>';
 }
 render(); setInterval(render,60000); document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
})();
