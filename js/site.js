(function(){
 'use strict';
 const $ = (s,root=document)=>root.querySelector(s);
 const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
 const asset = 'assets/';
 const products = window.CMF_PRODUCTS || [];
 const money=window.CMF_PRICE|| (n=>String(n));
 const storeKey='cmf-demo-cart-v1';
 const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let cart=[];
 try { cart=JSON.parse(localStorage.getItem(storeKey))||[]; if(!Array.isArray(cart))cart=[] } catch(e){cart=[]}
 const state={cart,modal:null};
 const path=location.pathname.split('/').pop()||'index.html';
 const isHome=path==='index.html';
 const links=[['Home','index.html'],['Our Purpose','index.html#purpose'],['Products','shop.html'],['Routines','index.html#routines'],['Skin Care','index.html#science'],['Story','index.html#story']];
 const linkHtml=links.map(([label,href])=>`<a href="${href}" class="nav-link${(href===path||(isHome&&href==='index.html'&&label==='Home'))?' is-current':''}">${label}</a>`).join('');
 const header=document.getElementById('site-header');
 if(header) header.innerHTML=`<div class="header-inner"><a class="brand" href="index.html" aria-label="Clean My Face, home"><span>clean</span><em>myface</em></a><nav class="desktop-nav" aria-label="Main navigation">${linkHtml}</nav><div class="header-actions"><a class="header-shop" href="shop.html">Shop Products <span aria-hidden="true">→</span></a><button class="icon-button search-toggle" type="button" aria-label="Search products"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5"/></svg></button><button class="icon-button cart-toggle" type="button" aria-label="Open shopping bag"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.4 13H5.4L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><span class="cart-count" aria-label="0 items">0</span></button><button class="icon-button menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button></div></div><nav class="mobile-nav" aria-label="Mobile navigation">${linkHtml}<a href="shop.html" class="mobile-shop-link">Shop Products →</a></nav>`;
 const footer=document.getElementById('site-footer');
 if(footer)footer.innerHTML=`<div class="footer-main"><div class="footer-brand"><a class="brand brand-light" href="index.html"><span>clean</span><em>myface</em></a><p class="footer-tagline">CLEAN WITH PURPOSE</p><p>Skincare for real skin, real routines, and real results.</p></div><div class="footer-col"><h3>Explore</h3><a href="index.html#purpose">Our Purpose</a><a href="index.html#story">Our Story</a><a href="index.html#science">Skin Science</a><a href="index.html#routines">Find Your Routine</a></div><div class="footer-col"><h3>Shop</h3><a href="shop.html">All Products</a><a href="shop.html?collection=Plump%20It%20Up">Plump It Up</a><a href="shop.html?collection=Stay%20Clear">Stay Clear</a><a href="shop.html?collection=Bundles">Routine Sets</a></div><div class="footer-col"><h3>Help</h3><a href="contact.html">Contact</a><a href="contact.html#faq">FAQs</a><button type="button" class="footer-text-button search-toggle">Search products</button><span class="footer-note">Brand contact and store policies must be confirmed before launch.</span></div></div><div class="footer-bottom"><span>© <span id="year"></span> Clean My Face. All rights reserved.</span><span>Made for purposeful skincare.</span></div>`;
 const year=$('#year'); if(year)year.textContent=String(new Date().getFullYear());
 const overlay=document.createElement('div'); overlay.innerHTML=`<div class="overlay" id="global-overlay" hidden></div><aside class="drawer" id="cart-drawer" aria-label="Shopping bag" aria-modal="true" role="dialog" inert><div class="drawer-top"><h2>Your Bag <span class="small-label">Demo cart</span></h2><button type="button" class="icon-button close-cart" aria-label="Close bag">×</button></div><div id="cart-contents" class="drawer-contents"></div><div class="drawer-bottom"><div class="cart-total"><span>Sample subtotal</span><strong id="cart-subtotal">₱0.00</strong></div><p class="fineprint">Sample pricing only. Checkout/payment setup required before launch.</p><button id="checkout-demo" class="button button-primary" type="button">Checkout setup needed</button><a class="view-bag-shop" href="shop.html">Continue shopping →</a></div></aside><div class="search-modal" id="search-modal" role="dialog" aria-modal="true" aria-label="Search products" inert><div class="search-top"><label for="site-search-input">What are you looking for?</label><button type="button" class="icon-button close-search" aria-label="Close search">×</button></div><input type="search" id="site-search-input" placeholder="Try cleanser, toner, Stay Clear…" autocomplete="off"/><div class="search-results" id="search-results"></div></div><div class="toast" id="toast" aria-live="polite" role="status"></div>`;
 document.body.append(...Array.from(overlay.children));
 const overlayEl=$('#global-overlay'); const drawer=$('#cart-drawer'); const search=$('#search-modal');
 let toastTimer;
 const toast=message=>{const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3300)};
 const saveCart=()=>{try{localStorage.setItem(storeKey,JSON.stringify(state.cart))}catch(e){}updateCount()};
 const updateCount=()=>{const n=state.cart.reduce((a,b)=>a+b.qty,0);$$('.cart-count').forEach(el=>{el.textContent=n;el.setAttribute('aria-label',`${n} items`)});};
 const renderCart=()=>{
  const box=$('#cart-contents');
  if(!state.cart.length){ box.innerHTML='<div class="empty-cart"><span aria-hidden="true">♡</span><h3>Your bag is waiting.</h3><p>Add purposeful skincare to begin your routine.</p><a class="button button-outline" href="shop.html">Explore products</a></div>';$('#cart-subtotal').textContent=money(0);return; }
  box.innerHTML=state.cart.map(item=>{const p=products.find(p=>p.id===item.id);if(!p)return '';return `<div class="cart-line"><img src="${asset+p.image}" alt="${escapeHtml(p.name)}" loading="lazy"><div class="cart-line-info"><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a><span>${money(p.price)} <small>sample</small></span><div class="quantity-control"><button type="button" data-qty="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button type="button" data-qty="1" data-id="${p.id}" aria-label="Increase quantity">+</button></div></div><button type="button" class="cart-remove" data-remove="${p.id}" aria-label="Remove ${escapeHtml(p.name)}">×</button></div>`}).join('');
  const sum=state.cart.reduce((a,i)=>{const p=products.find(p=>p.id===i.id);return a+(p?p.price*i.qty:0)},0);$('#cart-subtotal').textContent=money(sum);
 };
 const lock=on=>document.body.classList.toggle('modal-open',on);
 const closePanels=()=>{overlayEl.hidden=true;drawer.classList.remove('is-open');search.classList.remove('is-open');drawer.inert=true;search.inert=true;lock(false);state.modal=null};
 const openPanel=which=>{closePanels();overlayEl.hidden=false;const panel=which==='search'?search:drawer; panel.inert=false;panel.classList.add('is-open');state.modal=which;lock(true);if(which==='cart')renderCart();else{$('#site-search-input').value='';renderSearch('');setTimeout(()=>$('#site-search-input').focus(),80)}};
 const addToCart=(id,qty=1)=>{const p=products.find(p=>p.id===id);if(!p)return;const line=state.cart.find(l=>l.id===id);if(line)line.qty+=qty;else state.cart.push({id,qty});saveCart();toast(`${p.name} added to bag`);if(state.modal==='cart')renderCart()};
 const renderSearch=(term)=>{const q=term.trim().toLowerCase();const found=products.filter(p=>`${p.name} ${p.category} ${p.type} ${p.ingredient}`.toLowerCase().includes(q));$('#search-results').innerHTML=found.length?found.map(p=>`<a class="search-result" href="product.html?id=${p.id}"><img src="${asset+p.image}" alt=""/><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.category)} · ${escapeHtml(p.benefit)}</small></span><span aria-hidden="true">→</span></a>`).join(''):'<p class="no-results">No matching products. Try another term.</p>'};
 document.addEventListener('click',e=>{
  if(e.target.closest('.search-toggle')){e.preventDefault();openPanel('search')}
  if(e.target.closest('.cart-toggle')){e.preventDefault();openPanel('cart')}
  if(e.target.closest('.close-cart,.close-search,#global-overlay'))closePanels();
  if(e.target.closest('.menu-toggle')){const n=$('.mobile-nav'),b=$('.menu-toggle');const expanded=n.classList.toggle('is-open');b.setAttribute('aria-expanded',String(expanded));}
  if(e.target.closest('.mobile-nav a')){$('.mobile-nav').classList.remove('is-open');$('.menu-toggle').setAttribute('aria-expanded','false')}
  const add=e.target.closest('[data-add-to-cart]');if(add){e.preventDefault();addToCart(add.dataset.addToCart,Number(add.dataset.qty||1))}
  const r=e.target.closest('[data-remove]');if(r){state.cart=state.cart.filter(x=>x.id!==r.dataset.remove);saveCart();renderCart()}
  const qty=e.target.closest('[data-qty]');if(qty){const i=state.cart.find(x=>x.id===qty.dataset.id);if(i){i.qty+=Number(qty.dataset.qty);if(i.qty<=0)state.cart=state.cart.filter(x=>x!==i);saveCart();renderCart()}}
  if(e.target.closest('#checkout-demo'))toast('Checkout is a demo. Connect a payment provider and verify product prices before launch.');
 });
 $('#site-search-input').addEventListener('input',e=>renderSearch(e.target.value));
 window.addEventListener('keydown',e=>{if(e.key==='Escape')closePanels()});
 updateCount();
 window.CMF={products,asset,money,toast,addToCart,openPanel,escapeHtml,renderCard(p){return `<article class="product-card"><a href="product.html?id=${p.id}" class="product-image" aria-label="View ${escapeHtml(p.name)}"><img loading="lazy" src="${asset+p.image}" alt="${escapeHtml(p.name)}"><span class="product-card-arrow" aria-hidden="true">↗</span></a><div class="product-card-body"><div class="product-category">${escapeHtml(p.category)}</div><a class="product-name" href="product.html?id=${p.id}">${escapeHtml(p.name)}</a><p>${escapeHtml(p.benefit)}</p><div class="product-card-bottom"><span class="product-price">${money(p.price)} <small>sample</small></span><button type="button" class="quick-add" data-add-to-cart="${p.id}" aria-label="Add ${escapeHtml(p.name)} to bag">+</button></div></div></article>`;}};
})();
