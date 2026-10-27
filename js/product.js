(function(){
'use strict';
const id=new URLSearchParams(location.search).get('id');
const all=window.CMF.products;
const p=all.find(p=>p.id===id);
const container=document.getElementById('product-detail');
if(!p){container.innerHTML='<div class="product-not-found"><h1>Product not found</h1><p>Explore our skincare essentials.</p><a class="button button-primary" href="shop.html">Back to shop →</a></div>';return;}
document.title=p.name+' | Clean My Face';
document.getElementById('breadcrumb-product').textContent=p.name;
const safe=window.CMF.escapeHtml;
container.innerHTML=`<div class="product-detail-grid"><div class="detail-image"><img src="assets/${p.image}" alt="${safe(p.name)}"></div><div class="detail-info"><span class="eyebrow">${safe(p.category)} / ${safe(p.type)}</span><h1>${safe(p.name)}</h1><p class="detail-benefit">${safe(p.benefit)}</p><div class="detail-divider"></div><p>${safe(p.description)}</p><div class="detail-meta"><span><strong>Collection</strong>${safe(p.category)}</span><span><strong>Ingredient focus</strong>${safe(p.ingredient)}</span></div><div class="detail-price">${window.CMF.money(p.price)} <small>sample price</small></div><div class="detail-buy"><div class="quantity-control large"><button type="button" id="detail-minus" aria-label="Decrease quantity">−</button><span id="detail-quantity">1</span><button type="button" id="detail-plus" aria-label="Increase quantity">+</button></div><button class="button button-primary" type="button" id="detail-add">Add to Bag →</button></div><p class="fineprint">Website demo: confirm product benefits, full ingredient claims, prices, and availability before selling.</p><a class="text-link" href="shop.html">← Back to all products</a></div></div>`;
let qty=1;
const q=document.getElementById('detail-quantity');
document.getElementById('detail-minus').addEventListener('click',()=>{qty=Math.max(1,qty-1);q.textContent=qty});
document.getElementById('detail-plus').addEventListener('click',()=>{qty=Math.min(99,qty+1);q.textContent=qty});
document.getElementById('detail-add').addEventListener('click',()=>{window.CMF.addToCart(p.id,qty);window.CMF.openPanel('cart')});
const same=all.filter(x=>x.id!==p.id&&x.category===p.category);
const others=all.filter(x=>x.id!==p.id&&!same.includes(x));
document.getElementById('related-products').innerHTML=[...same,...others].slice(0,4).map(window.CMF.renderCard).join('');
})();
