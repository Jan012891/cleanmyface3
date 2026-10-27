(function(){
'use strict';
const products=window.CMF.products;
const filters={types:new Set(),collections:new Set(),ingredients:new Set()};
const searchParams=new URLSearchParams(location.search);
const collection=searchParams.get('collection');
if(['Plump It Up','Stay Clear','Bundles'].includes(collection))filters.collections.add(collection);
const unique=key=>Array.from(new Set(products.map(p=>p[key]))).sort();
const createFilters=(id,values,filterKey)=>{document.getElementById(id).innerHTML=values.map(v=>`<label class="filter-option"><input type="checkbox" data-filter="${filterKey}" value="${v}" ${filters[filterKey].has(v)?'checked':''}><span>${v}</span></label>`).join('')};
createFilters('type-filters',unique('type'),'types');
createFilters('collection-filters',['Plump It Up','Stay Clear','Bundles'],'collections');
createFilters('ingredient-filters',unique('ingredient'),'ingredients');
function draw(){
 let list=products.filter(p=>(!filters.types.size||filters.types.has(p.type))&&(!filters.collections.size||filters.collections.has(p.category))&&(!filters.ingredients.size||filters.ingredients.has(p.ingredient)));
 const sort=document.getElementById('sort-select').value;
 if(sort==='low')list.sort((a,b)=>a.price-b.price);
 else if(sort==='high')list.sort((a,b)=>b.price-a.price);
 else if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
 else list.sort((a,b)=>Number(b.featured)-Number(a.featured));
 document.getElementById('shop-grid').innerHTML=list.map(window.CMF.renderCard).join('');
 document.getElementById('shop-empty').hidden=list.length>0;
 document.getElementById('results-count').textContent=`${list.length} product${list.length!==1?'s':''}`;
 const chips=[...filters.types,...filters.collections,...filters.ingredients];
 document.getElementById('active-filters').innerHTML=chips.map(v=>`<button type="button" class="filter-chip" data-chip="${v.replaceAll('"','&quot;')}">${v} <span aria-hidden="true">×</span></button>`).join('');
 if(filters.collections.size===1)document.title=[...filters.collections][0]+' | Clean My Face';else document.title='Shop | Clean My Face';
}
const clear=()=>{Object.values(filters).forEach(s=>s.clear());document.querySelectorAll('[data-filter]').forEach(e=>e.checked=false);try{history.replaceState(null,'','shop.html#shop-products')}catch(e){}draw()};
document.querySelectorAll('.filter-heading').forEach(btn=>btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));btn.querySelector('span').textContent=open?'+':'−';btn.nextElementSibling.classList.toggle('is-collapsed',open)}));
document.getElementById('filter-toggle').addEventListener('click',e=>{const btn=e.currentTarget,sidebar=document.getElementById('filter-sidebar');let open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));sidebar.classList.toggle('sidebar-hidden',open);document.querySelector('.shop-content').classList.toggle('filters-hidden',open);document.getElementById('filter-chevron').textContent=open?'⌄':'⌃'});
document.getElementById('sort-select').addEventListener('change',draw);
document.querySelectorAll('[data-filter]').forEach(input=>input.addEventListener('change',()=>{const set=filters[input.dataset.filter];if(input.checked)set.add(input.value);else set.delete(input.value);draw()}));
document.getElementById('active-filters').addEventListener('click',e=>{const b=e.target.closest('[data-chip]');if(!b)return;const v=b.dataset.chip;Object.values(filters).forEach(set=>set.delete(v));document.querySelectorAll('[data-filter]').forEach(input=>{if(input.value===v)input.checked=false});draw()});
document.getElementById('reset-filters').addEventListener('click',clear);
document.getElementById('empty-reset').addEventListener('click',clear);
draw();
})();
