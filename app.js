const offers = [
  {name:'Northstar Card', logo:'northstar-card.svg', type:'Travel credit card', category:'cards', profile:['travel'], score:9.4, rating:4.8, reviews:512, apr:'18.49%–28.49%', fee:'$0', tag:'Best fit for travel', placement:'Partner offer', description:'A flexible rewards card for everyday spending, with simple terms and broad acceptance.', benefits:['Generous rewards program','No foreign transaction fees','Easy-to-use mobile app']},
  {name:'Harborline Account', logo:'harborline-account.svg', type:'Online banking', category:'banking', profile:['low-fees'], score:9.1, rating:4.6, reviews:384, apr:'N/A', fee:'$0', tag:'Low fees', description:'A modern checking account with no monthly fees and helpful digital tools.', benefits:['No monthly maintenance fees','Early direct deposit access','Built-in budgeting tools']},
  {name:'Nova Builder', logo:'nova-builder.svg', type:'Secured credit card', category:'cards', profile:['building'], score:8.7, rating:4.4, reviews:296, apr:'25.99%', fee:'$0', tag:'Build credit', description:'A straightforward secured card designed to help build credit responsibly.', benefits:['Reports to major credit bureaus','Low minimum deposit','Clear path to upgrade']},
  {name:'SummitFlex Loan', logo:'summitflex-loan.svg', type:'Personal loan', category:'loans', profile:['flexibility'], score:8.4, rating:4.2, reviews:278, apr:'9.99%–29.99%', fee:'Varies', tag:'Flexible terms', description:'A flexible personal loan with competitive rates and a simple online application.', benefits:['Flexible repayment terms','No prepayment penalties','Fast, streamlined application']},
  {name:'Cedar Savings', logo:'cedar-savings.svg', type:'High-yield savings', category:'banking', profile:['low-fees'], score:8.1, rating:4.1, reviews:219, apr:'4.15% APY', fee:'$0', tag:'For savers', description:'A high-yield savings account that makes it easy to reach your goals.', benefits:['Competitive interest rate','No monthly fees','FDIC insurance (up to limits)']},
  {name:'MetroMint Card', logo:'metromint-card.svg', type:'Cash-back credit card', category:'cards', profile:['all'], score:7.8, rating:3.9, reviews:184, apr:'20.99%–29.99%', fee:'$39', tag:'Cash back', description:'A straightforward cash back card with easy rewards and no annual fee.', benefits:['Unlimited cash back','No annual fee','Simple, transparent terms']}
];
const list = document.querySelector('#offerList');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyState');
const money = s => s === '$0' ? 0 : 1;
function render(){
  const cat = document.querySelector('#categoryFilter').value;
  const profile = document.querySelector('#profileFilter').value;
  const sort = document.querySelector('#sortFilter').value;
  let filtered = offers.filter(o => (cat==='all'||o.category===cat) && (profile==='all'||o.profile.includes(profile)||o.profile.includes('all')));
  filtered.sort((a,b) => sort==='apr' ? a.apr.localeCompare(b.apr) : sort==='fee' ? money(a.fee)-money(b.fee) : b.score-a.score);
  count.textContent = `Showing ${filtered.length} of ${offers.length} products`;
  empty.hidden = filtered.length>0;
  list.innerHTML = filtered.map((o,i)=>`<article class="offer-card${i===0?' top-pick':''}"><div class="rank">${i+1}${i===0?'<span class="top-badge">TOP PICK</span>':''}</div><div><img class="offer-icon" src="logos/${o.logo}" alt="${o.name} logo" /><div class="offer-name">${o.name}</div><div class="offer-type">${o.type}</div><div class="stars">★★★★★<span>${o.rating} (${o.reviews})</span></div></div><div class="offer-desc"><p>${o.description}</p></div><div class="benefit-col"><ul class="benefits">${o.benefits.map(b=>`<li>${b}</li>`).join('')}</ul><span class="tag">${o.tag}</span>${o.placement?`<span class="placement">${o.placement}</span>`:''}</div><div class="score"><small>Editorial score</small><strong>${o.score}</strong><small>/ 10</small></div><div class="actions"><a class="primary" href="#" data-action="visit" data-name="${o.name}">Visit provider&nbsp; →</a><button class="secondary" data-action="details" data-name="${o.name}">Read review</button></div></article>`).join('');
}
document.querySelectorAll('select').forEach(el=>el.addEventListener('change',render));
document.querySelector('.mobile-menu').addEventListener('click',()=>document.querySelector('.site-header').classList.toggle('menu-open'));
document.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(!el)return;e.preventDefault();const name=el.dataset.name;showToast(el.dataset.action==='visit'?`Demo link: ${name}`:`Full fictional review for ${name} would open here.`)});
document.querySelector('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#newsletterMessage').textContent='Demo submitted — no email was saved.';e.target.reset()});
function showToast(msg){const toast=document.querySelector('#toast');toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
render();
