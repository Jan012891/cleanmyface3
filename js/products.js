/* Demo catalog based on the product images provided with the design brief.
   Prices are SAMPLE PRICES for interface demonstration—not confirmed retail prices.
   Replace here before publishing a real online store. */
window.CMF_PRODUCTS = [
  {id:'heartleaf-oil',name:'Heartleaf Cleansing Oil',category:'Stay Clear',type:'Cleansers',description:'A gentle cleansing oil for your everyday routine.',benefit:'Cleanse + Comfort',image:'product-heartleaf-oil.webp',price:1150,featured:true,ingredient:'Heartleaf'},
  {id:'bha-gel-cleanser',name:'2% BHA Gel Cleanser',category:'Stay Clear',type:'Cleansers',description:'A targeted gel cleanser for an oily-to-troubled skin routine.',benefit:'Clarify + Balance',image:'product-bha-gel-cleanser.webp',price:890,featured:true,ingredient:'BHA'},
  {id:'cleansing-balm',name:'Cleansing Balm',category:'Plump It Up',type:'Cleansers',description:'A balm cleanser designed for an easy first cleansing step.',benefit:'Melt + Cleanse',image:'product-cleansing-balm.webp',price:1090,featured:true,ingredient:'Barrier Care'},
  {id:'milky-essence-toner',name:'Fermented Milky Essence Toner',category:'Plump It Up',type:'Toners',description:'A lightweight milky essence step for everyday comfort.',benefit:'Hydrate + Comfort',image:'product-milky-essence-toner.webp',price:980,featured:true,ingredient:'Ferments'},
  {id:'soft-peeling-gel',name:'Soft Peeling Gel',category:'Plump It Up',type:'Treatments',description:'A soft-textured exfoliating step for your routine.',benefit:'Refine + Refresh',image:'product-soft-peeling-gel.webp',price:980,featured:false,ingredient:'Peeling Gel'},
  {id:'rice-barrier-mask',name:'Rice Barrier Cream Mask',category:'Plump It Up',type:'Moisturizers',description:'A comforting creamy mask with a nourishing skin feel.',benefit:'Replenish + Comfort',image:'product-rice-barrier-mask.webp',price:1120,featured:true,ingredient:'Rice'},
  {id:'dry-spot-balm',name:'Dry Spot Rescue Balm',category:'Plump It Up',type:'Treatments',description:'A focused balm step for dry-looking areas.',benefit:'Soothe + Restore',image:'product-dry-spot-balm.webp',price:650,featured:false,ingredient:'Barrier Care'},
  {id:'daily-routine-set',name:'Daily Routine Set',category:'Bundles',type:'Sets',description:'A curated mix of skincare essentials for a purposeful routine.',benefit:'Your daily essentials',image:'product-daily-routine-set.webp',price:3250,featured:true,ingredient:'Mixed Routine'}
];
window.CMF_PRICE = n => '₱' + Number(n).toLocaleString('en-PH', {minimumFractionDigits:2, maximumFractionDigits:2});
