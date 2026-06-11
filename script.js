'use strict';

var STORAGE_KEY = 'reybar_costeo_dashboard_v4_real_export';
var chartToken = 0;

var initialData = {
  meta:{ app:'Reybar Costeo', schemaVersion:5, createdAt:'', updatedAt:'', exportedFor:'real_system_or_ai_migration' },
  auditLog:[],
  snapshots:[],
  settings:{ idealFoodCost:35, dangerFoodCost:45, daysPerWeek:6, daysPerMonth:26 },
  ui:{ selectedDishId:'d6' },
  dishes:[
    {id:'d1',active:true,name:'Leche de tigre simple',category:'Leches de tigre',price:10,cost:3.20,qtyDay:8,notes:'',ingredients:[['Base leche de tigre',1.2],['Pescado/recorte',0.9],['Limón y cebolla',0.45],['Cortesías/envase',0.65]]},
    {id:'d2',active:true,name:'Leche de tigre mixta',category:'Leches de tigre',price:15,cost:5.00,qtyDay:6,notes:'',ingredients:[['Base leche de tigre',1.4],['Mariscos/pescado',2.2],['Limón y cebolla',0.55],['Cortesías/envase',0.85]]},
    {id:'d3',active:true,name:'Leche + chicharrón de pota',category:'Leches de tigre',price:18,cost:6.20,qtyDay:5,notes:'',ingredients:[['Leche de tigre',3.2],['Pota',1.7],['Harina/aceite',0.7],['Cortesías/envase',0.6]]},
    {id:'d4',active:true,name:'Leche + chicharrón de pollo',category:'Leches de tigre',price:20,cost:7.00,qtyDay:4,notes:'',ingredients:[['Leche de tigre',3.2],['Pollo',2.2],['Harina/aceite',0.9],['Cortesías/envase',0.7]]},
    {id:'d5',active:true,name:'Ceviche simple personal',category:'Ceviches',price:15,cost:5.20,qtyDay:10,notes:'',ingredients:[['Pescado',2.8],['Limón',0.7],['Cebolla/ají',0.35],['Camote/choclo',0.65],['Canchita/chifle',0.7]]},
    {id:'d6',active:true,name:'Ceviche simple clásico',category:'Ceviches',price:20,cost:6.80,qtyDay:14,notes:'',ingredients:[['Pescado',4.0],['Limón',0.85],['Cebolla/ají',0.45],['Camote/choclo',0.75],['Canchita/chifle',0.75]]},
    {id:'d7',active:true,name:'Ceviche simple especial',category:'Ceviches',price:25,cost:8.50,qtyDay:8,notes:'',ingredients:[['Pescado',5.25],['Limón',1.0],['Cebolla/ají',0.5],['Camote/choclo',0.9],['Canchita/chifle',0.85]]},
    {id:'d8',active:true,name:'Ceviche mixto',category:'Ceviches',price:30,cost:11.00,qtyDay:7,notes:'',ingredients:[['Pescado',4.2],['Mariscos',3.6],['Limón',1.0],['Cebolla/ají',0.55],['Cortesías',1.65]]},
    {id:'d9',active:true,name:'Chicharrón de pollo',category:'Fritos',price:20,cost:7.00,qtyDay:8,notes:'',ingredients:[['Pollo',3.6],['Harina/sazón',0.7],['Aceite',1.1],['Guarnición',1.1],['Salsas/envase',0.5]]},
    {id:'d10',active:true,name:'Chicharrón de pescado',category:'Fritos',price:22,cost:8.00,qtyDay:7,notes:'',ingredients:[['Pescado',4.5],['Harina/sazón',0.65],['Aceite',1.15],['Guarnición',1.2],['Salsas/envase',0.5]]},
    {id:'d11',active:true,name:'Arroz con mariscos',category:'Arroces y chaufas',price:30,cost:10.00,qtyDay:9,notes:'',ingredients:[['Arroz',0.9],['Mariscos',4.7],['Verduras/condimentos',0.8],['Aceite/gas',0.9],['Guarnición/envase',2.7]]},
    {id:'d12',active:true,name:'Chaufa regional',category:'Arroces y chaufas',price:30,cost:9.50,qtyDay:7,notes:'',ingredients:[['Arroz',0.9],['Cecina/chorizo',4.2],['Huevo/verduras',1.4],['Aceite/gas',0.9],['Plátano/salsas',2.1]]},
    {id:'d13',active:true,name:'Parihuela',category:'Sopas y especiales',price:35,cost:13.50,qtyDay:4,notes:'',ingredients:[['Pescado',4.8],['Mariscos',4.4],['Base/sopa',1.5],['Yuca/guarnición',1.2],['Gas/envase',1.6]]},
    {id:'d14',active:true,name:'Pescado a lo macho',category:'Sopas y especiales',price:35,cost:13.00,qtyDay:4,notes:'',ingredients:[['Filete de pescado',5.8],['Salsa macho/mariscos',4.1],['Arroz/guarnición',1.4],['Aceite/gas',0.9],['Envase/salsas',0.8]]},
    {id:'d15',active:true,name:'Costillas BBQ',category:'Carnes',price:28,cost:10.50,qtyDay:4,notes:'',ingredients:[['Costilla',6.6],['BBQ/sazón',0.9],['Guarnición',1.7],['Gas/carbón',0.9],['Envase/salsas',0.4]]},
    {id:'d16',active:true,name:'Alitas BBQ',category:'Carnes',price:22,cost:7.50,qtyDay:6,notes:'',ingredients:[['Alitas',4.3],['BBQ/sazón',0.7],['Papa/guarnición',1.4],['Aceite/gas',0.8],['Salsas/envase',0.3]]},
    {id:'d17',active:true,name:'Tallarín verde con filete',category:'Menú variado',price:16,cost:5.50,qtyDay:6,notes:'',ingredients:[['Tallarín',0.9],['Salsa verde',1.2],['Filete de pollo',2.1],['Aceite/gas',0.55],['Guarnición/envase',0.75]]},
    {id:'d18',active:true,name:'Broster con chaufa',category:'Broster',price:11,cost:4.50,qtyDay:12,notes:'',ingredients:[['Pollo',2.1],['Arroz chaufa',0.9],['Papa/plátano',0.75],['Aceite',0.45],['Salsas/envase',0.3]]},
    {id:'d19',active:true,name:'Causa acevichada',category:'Entradas',price:20,cost:7.20,qtyDay:5,notes:'',ingredients:[['Papa/masa',1.15],['Pescado/ceviche',3.6],['Limón/cebolla',0.65],['Salsa',0.75],['Envase/decoración',1.05]]},
    {id:'d20',active:true,name:'Cecina con tacacho',category:'Regional',price:20,cost:8.00,qtyDay:5,notes:'',ingredients:[['Cecina',4.7],['Plátano/tacacho',1.7],['Manteca/sazón',0.6],['Ensalada/salsas',0.5],['Gas/envase',0.5]]},
    {id:'d21',active:true,name:'Pollo al cilindro 1/8',category:'Cilindro y caja china',price:12,cost:4.40,qtyDay:10,notes:'',ingredients:[['Pollo',2.6],['Sazón',0.35],['Carbón/gas',0.55],['Guarnición',0.65],['Salsas/envase',0.25]]},
    {id:'d22',active:true,name:'Pollo al cilindro 1/4',category:'Cilindro y caja china',price:22,cost:8.00,qtyDay:8,notes:'',ingredients:[['Pollo',5.1],['Sazón',0.5],['Carbón/gas',0.75],['Guarnición',1.25],['Salsas/envase',0.4]]},
    {id:'d23',active:true,name:'Chancho a la caja china',category:'Cilindro y caja china',price:28,cost:10.50,qtyDay:6,notes:'',ingredients:[['Chancho',6.8],['Sazón',0.55],['Carbón/gas',0.9],['Guarnición',1.8],['Salsas/envase',0.45]]},
    {id:'d24',active:true,name:'Salchipapa Reybar',category:'Rápidos',price:12,cost:4.20,qtyDay:9,notes:'',ingredients:[['Papa',1.4],['Salchicha',1.6],['Aceite',0.55],['Salsas',0.35],['Envase',0.3]]},
    {id:'d25',active:true,name:'Inca Kola personal',category:'Bebidas',price:4,cost:2.20,qtyDay:10,notes:'',ingredients:[['Bebida',2.0],['Hielo/servicio',0.2]]},
    {id:'d26',active:true,name:'Coca Cola personal',category:'Bebidas',price:4,cost:2.20,qtyDay:10,notes:'',ingredients:[['Bebida',2.0],['Hielo/servicio',0.2]]},
    {id:'d27',active:true,name:'Agua mineral',category:'Bebidas',price:3,cost:1.50,qtyDay:8,notes:'',ingredients:[['Agua',1.35],['Servicio',0.15]]},
    {id:'d28',active:true,name:'Bebida o coctel de la casa',category:'Bebidas',price:8,cost:3.00,qtyDay:5,notes:'',ingredients:[['Base de bebida',1.7],['Fruta/jarabe',0.7],['Hielo/vaso',0.6]]},
    {id:'d29',active:true,name:'Extra cevichero',category:'Extras',price:3,cost:1.00,qtyDay:6,notes:'',ingredients:[['Canchita/chifle',0.65],['Ají/salsa',0.2],['Envase',0.15]]}
  ],
  movements:[],
  purchaseProducts:['Pollo','Pescado','Pota','Mariscos','Arroz','Aceite','Gas/carbón','Bebida','Envase','Verduras','Limón','Papa','Yuca','Choclo','Otro'],
  purchaseParts:['Pollo entero','1/4 de pollo','Pierna','Entrepierna','Pecho','Alita','Pescado','Pota','Mariscos','Arroz','Aceite','Gas/carbón','Bebida','Envase','Otro'],
  promotions:[
    {id:'p1',active:true,name:'Combo Marino: Ceviche clásico + Chicharrón de pescado',dishIds:['d6','d10'],price:36,qtyDay:6},
    {id:'p2',active:true,name:'Combo Arrocito: Ceviche clásico + Arroz con mariscos',dishIds:['d6','d11'],price:38,qtyDay:5},
    {id:'p3',active:true,name:'Combo Clásico: Ceviche clásico + Inca Kola',dishIds:['d6','d25'],price:22,qtyDay:5},
    {id:'p4',active:true,name:'Combo Broster: Broster con chaufa + Coca Cola',dishIds:['d18','d26'],price:15,qtyDay:6}
  ]
};

/* ─── DATA ─────────────────────────────────────────── */
var data = loadData();
if (!data.ui) data.ui = { selectedDishId: data.dishes[0]?data.dishes[0].id:'' };
if (!Array.isArray(data.movements)) data.movements = [];
if (!Array.isArray(data.purchaseParts)) data.purchaseParts = initialData.purchaseParts.slice();
if (!Array.isArray(data.purchaseProducts)) data.purchaseProducts = initialData.purchaseProducts.slice();
if (!data.meta) data.meta = { app:'Reybar Costeo', schemaVersion:5, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() };
if (!Array.isArray(data.auditLog)) data.auditLog = [];
if (!Array.isArray(data.snapshots)) data.snapshots = [];
data = normalizeDataShape(data);

function loadData(){
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return JSON.parse(JSON.stringify(initialData));
    var p = JSON.parse(raw);
    if(!p||!Array.isArray(p.dishes)||!Array.isArray(p.promotions)||!p.settings) return JSON.parse(JSON.stringify(initialData));
    return p;
  }catch(e){ return JSON.parse(JSON.stringify(initialData)); }
}
function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
function nowIso(){ return new Date().toISOString(); }
function normalizeNumber(v, fallback){
  var n=Number(v); return isFinite(n)?n:(fallback||0);
}
function normalizeDataShape(input){
  var base=JSON.parse(JSON.stringify(initialData));
  var out=(input&&typeof input==='object')?input:base;
  out.meta=Object.assign({app:'Reybar Costeo',schemaVersion:5,createdAt:nowIso(),updatedAt:nowIso(),exportedFor:'real_system_or_ai_migration'}, out.meta||{});
  out.meta.schemaVersion=5;
  out.settings=Object.assign({}, base.settings, out.settings||{});
  out.ui=Object.assign({}, base.ui, out.ui||{});
  out.dishes=Array.isArray(out.dishes)?out.dishes:[];
  out.dishes=out.dishes.map(function(d,idx){
    d=d||{};
    return {
      id:String(d.id||uid('d')), active:d.active!==false, name:String(d.name||('Plato '+(idx+1))).trim(), category:String(d.category||'Sin categoría').trim(),
      price:normalizeNumber(d.price,0), cost:normalizeNumber(d.cost,0), qtyDay:normalizeNumber(d.qtyDay,0), notes:String(d.notes||''),
      ingredients:Array.isArray(d.ingredients)?d.ingredients.map(function(i){ return [String((i&&i[0])||'Costo'), normalizeNumber(i&&i[1],0)]; }):[]
    };
  });
  out.promotions=Array.isArray(out.promotions)?out.promotions:[];
  out.promotions=out.promotions.map(function(promo){
    promo=promo||{}; return {id:String(promo.id||uid('p')),active:promo.active!==false,name:String(promo.name||'Promoción'),dishIds:Array.isArray(promo.dishIds)?promo.dishIds.map(String):[],price:normalizeNumber(promo.price,0),qtyDay:normalizeNumber(promo.qtyDay,0)};
  });
  out.movements=Array.isArray(out.movements)?out.movements:[];
  out.movements=out.movements.map(function(m){
    m=m||{}; return {id:String(m.id||uid('m')),date:String(m.date||todayIso()),product:String(m.product||'Producto'),part:String(m.part||'Otro'),type:String(m.type||'compra'),qty:normalizeNumber(m.qty,0),unit:String(m.unit||'kg'),cost:normalizeNumber(m.cost,0),waste:Math.max(0,Math.min(100,normalizeNumber(m.waste,0))),portion:normalizeNumber(m.portion,0),dishId:String(m.dishId||'')};
  });
  out.purchaseProducts=Array.isArray(out.purchaseProducts)?uniqueValues(out.purchaseProducts.concat(base.purchaseProducts)):base.purchaseProducts.slice();
  out.purchaseParts=Array.isArray(out.purchaseParts)?uniqueValues(out.purchaseParts.concat(base.purchaseParts)):base.purchaseParts.slice();
  out.auditLog=Array.isArray(out.auditLog)?out.auditLog:[];
  out.snapshots=Array.isArray(out.snapshots)?out.snapshots:[];
  if(!getDishFrom(out.dishes,out.ui.selectedDishId) && out.dishes[0]) out.ui.selectedDishId=out.dishes[0].id;
  return out;
}
function getDishFrom(list,id){ return (list||[]).find(function(d){return d.id===id;}); }
function ensureDataShape(){
  data=normalizeDataShape(data);
  data.meta.updatedAt=nowIso();
}
function recordEvent(action, entity, entityId, before, after){
  ensureDataShape();
  data.auditLog.unshift({ id:uid('log'), at:nowIso(), action:action, entity:entity, entityId:entityId||'', before:before||null, after:after||null });
  if(data.auditLog.length>1000) data.auditLog.length=1000;
}
function safeOn(id, eventName, handler){
  var el=byId(id); if(el) el.addEventListener(eventName, handler);
}
function saveData(){
  ensureDataShape();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  var b = byId('jsonBox'); if(b) b.value = JSON.stringify(buildExportPackage(),null,2);
  renderAuditBox();
}
function autoSave(animate){ saveData(); renderAll(animate!==false); }

/* ─── HELPERS ──────────────────────────────────────── */
function byId(id){ return document.getElementById(id); }
function money(n){ return 'S/ '+Number(n||0).toFixed(2); }
function pct(n){ return Number(n||0).toFixed(1)+'%'; }
function uid(p){ return p+Math.random().toString(36).slice(2,9); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }
function activeDishes(){ return data.dishes.filter(function(d){ return d.active; }); }
function getDish(id){ return data.dishes.find(function(d){ return d.id===id; }); }
function uniqueValues(arr){ var seen={}; return arr.filter(function(v){v=String(v||'').trim(); if(!v||seen[v]) return false; seen[v]=true; return true;}); }
function dishCategories(){ return uniqueValues(data.dishes.map(function(d){return d.category;})).sort(); }
function optionList(values,current,includeAll){
  var html=includeAll?'<option value="__all">Todas las categorías</option>':'';
  html+=values.map(function(v){return '<option value="'+esc(v)+'" '+(current===v?'selected':'')+'>'+esc(v)+'</option>';}).join('');
  html+='<option value="__other">＋ Otro / nuevo</option>';
  return html;
}
function setSelectOther(selectId,inputId){
  var sel=byId(selectId), inp=byId(inputId); if(!sel||!inp) return;
  var show=sel.value==='__other'; inp.style.display=show?'block':'none'; if(show) inp.focus();
}
function valueFromSelectOther(selectId,inputId,fallback){
  var sel=byId(selectId), inp=byId(inputId);
  if(sel&&sel.value==='__other') return ((inp&&inp.value)||'').trim()||fallback||'Otro';
  return (sel&&sel.value)||fallback||'';
}

/* ─── METRICS ──────────────────────────────────────── */
function dishMetrics(d){
  var price=Number(d.price||0), cost=Number(d.cost||0);
  var profit=price-cost, fc=price>0?cost/price*100:0;
  var daily=profit*Number(d.qtyDay||0);
  return{profit:profit,fc:fc,daily:daily,
    weekly:daily*Number(data.settings.daysPerWeek||0),
    monthly:daily*Number(data.settings.daysPerMonth||0),
    suggested:cost/(Number(data.settings.idealFoodCost||35)/100)};
}
function promoMetrics(p){
  var dishes=(p.dishIds||[]).map(getDish).filter(Boolean);
  var normal=dishes.reduce(function(s,d){return s+Number(d.price||0);},0);
  var cost=dishes.reduce(function(s,d){return s+Number(d.cost||0);},0);
  var price=Number(p.price||0), profit=price-cost;
  var fc=price>0?cost/price*100:0;
  return{dishes:dishes,normalPrice:normal,cost:cost,profit:profit,fc:fc,
    discount:normal-price,suggested:cost/(Number(data.settings.idealFoodCost||35)/100),
    monthly:profit*Number(p.qtyDay||0)*Number(data.settings.daysPerMonth||0)};
}
function stateByFoodCost(fc,profit){
  if(profit<=0) return{label:'Pérdida',cls:'red'};
  if(fc<=Number(data.settings.idealFoodCost||35)) return{label:'Rentable',cls:'green'};
  if(fc<Number(data.settings.dangerFoodCost||45)) return{label:'Ajustado',cls:'yellow'};
  return{label:'Peligroso',cls:'red'};
}
function badge(label,cls){ return '<span class="badge '+esc(cls)+'">'+esc(label)+'</span>'; }

/* ─── NAV / TABS ───────────────────────────────────── */
function setTab(name){
  document.querySelectorAll('.section').forEach(function(s){ s.classList.toggle('active',s.dataset.section===name); });
  document.querySelectorAll('.nav-btn').forEach(function(b){ b.classList.toggle('active',b.dataset.tab===name); });
  animateCharts();
}

/* ─── SUMMARY ──────────────────────────────────────── */
function renderSummary(){
  var dishes=activeDishes();
  var dishMonthly=dishes.reduce(function(s,d){return s+dishMetrics(d).monthly;},0);
  var promoMonthly=data.promotions.filter(function(p){return p.active;}).reduce(function(s,p){return s+promoMetrics(p).monthly;},0);
  var risky=dishes.filter(function(d){var m=dishMetrics(d);return stateByFoodCost(m.fc,m.profit).cls==='red';}).length;
  var avgFc=dishes.length?dishes.reduce(function(s,d){return s+dishMetrics(d).fc;},0)/dishes.length:0;
  var k=byId('summaryKpis');
  if(k){
    k.innerHTML=[
      ['Platos activos',dishes.length+'','Carta actual','var(--blue)'],
      ['Utilidad mensual platos',money(dishMonthly),'Proyección bruta','var(--green)'],
      ['Utilidad mensual combos',money(promoMonthly),'Solo promos activas','var(--purple)'],
      ['Platos en alerta',risky+'','Revisar costo o precio','var(--red)']
    ].map(function(x){
      return '<div class="kpi"><div class="k-label">'+x[0]+'</div><div class="k-val" style="color:'+x[3]+';">'+x[1]+'</div><div class="k-note">'+x[2]+'</div></div>';
    }).join('');
  }

  // category filter
  var cf=byId('menuCategoryFilter');
  if(cf){
    var old=cf.value||'__all';
    var cats=dishCategories();
    cf.innerHTML='<option value="__all">Todas las categorías</option>'+cats.map(function(c){return'<option value="'+esc(c)+'" '+(old===c?'selected':'')+'>'+esc(c)+'</option>';}).join('');
    if(old!=='__all'&&cats.indexOf(old)===-1) cf.value='__all';
  }

  var q=((byId('menuSearch')&&byId('menuSearch').value)||'').toLowerCase().trim();
  var selCat=(byId('menuCategoryFilter')&&byId('menuCategoryFilter').value)||'__all';
  var filtered=dishes.filter(function(d){
    return (selCat==='__all'||d.category===selCat)&&(!q||(d.name+' '+d.category).toLowerCase().indexOf(q)>=0);
  });

  var dc=byId('menuDishCards');
  if(dc){
    dc.innerHTML=filtered.map(function(d){
      var m=dishMetrics(d), st=stateByFoodCost(m.fc,m.profit);
      return '<div class="dish-card" data-action="open-dish" data-id="'+esc(d.id)+'">' +
        '<div><div class="dc-name">'+esc(d.name)+'</div><div class="dc-cat">'+esc(d.category)+'</div></div>'+
        '<div>'+badge(st.label,st.cls)+'</div>'+
        '<div class="dc-nums">'+
          '<div class="dc-num">Precio<b>'+money(d.price)+'</b></div>'+
          '<div class="dc-num">Costo<b>'+money(d.cost)+'</b></div>'+
          '<div class="dc-num">Utilidad<b>'+money(m.profit)+'</b></div>'+
          '<div class="dc-num">Food cost<b>'+pct(m.fc)+'</b></div>'+
        '</div></div>';
    }).join('')||'<div class="notice blue">No hay platos con ese filtro.</div>';
  }
}

/* ─── DISHES TABLE ─────────────────────────────────── */
function renderDishes(){
  var b=byId('dishRows'); if(!b) return;
  b.innerHTML=data.dishes.map(function(d){
    var m=dishMetrics(d), st=stateByFoodCost(m.fc,m.profit);
    return '<tr>'+
      '<td><input type="checkbox" data-kind="dish" data-id="'+esc(d.id)+'" data-field="active" '+(d.active?'checked':'')+' style="accent-color:var(--blue);"></td>'+
      '<td><input type="text" data-kind="dish" data-id="'+esc(d.id)+'" data-field="name" value="'+esc(d.name)+'" style="width:160px;"></td>'+
      '<td><select data-kind="dish" data-id="'+esc(d.id)+'" data-field="category" style="width:170px;">'+optionList(dishCategories(),d.category,false)+'</select></td>'+
      '<td><input type="number" step="0.1" data-kind="dish" data-id="'+esc(d.id)+'" data-field="price" value="'+Number(d.price||0)+'" style="width:90px;"></td>'+
      '<td><input type="number" step="0.1" data-kind="dish" data-id="'+esc(d.id)+'" data-field="cost" value="'+Number(d.cost||0)+'" style="width:90px;"></td>'+
      '<td><input type="number" step="1" data-kind="dish" data-id="'+esc(d.id)+'" data-field="qtyDay" value="'+Number(d.qtyDay||0)+'" style="width:70px;"></td>'+
      '<td>'+money(m.profit)+'</td>'+
      '<td>'+pct(m.fc)+'</td>'+
      '<td>'+badge(st.label,st.cls)+'</td>'+
      '<td><button class="btn btn-danger btn-sm" data-action="delete-dish" data-id="'+esc(d.id)+'">🗑 Eliminar</button></td>'+
      '</tr>';
  }).join('')||'<tr><td colspan="10" class="table-empty">No hay platos. Haz clic en "Agregar plato".</td></tr>';
}

/* ─── INGREDIENTS ──────────────────────────────────── */
function renderIngredientSelect(){
  var sel=byId('ingredientDishSelect'); if(!sel) return;
  var cur=sel.value||data.ui.selectedDishId||(data.dishes[0]&&data.dishes[0].id)||'';
  sel.innerHTML=data.dishes.map(function(d){return'<option value="'+esc(d.id)+'" '+(d.id===cur?'selected':'')+'>'+esc(d.name)+'</option>';}).join('');
  if(!getDish(sel.value)&&data.dishes[0]) sel.value=data.dishes[0].id;
}
function renderIngredientPanel(){
  var d=getDish(byId('ingredientDishSelect')?byId('ingredientDishSelect').value:'')||data.dishes[0];
  var box=byId('ingredientEditor'); if(!d||!box) return;
  var ings=d.ingredients||[];
  var sum=ings.reduce(function(s,i){return s+Number(i[1]||0);},0);
  var diff=Number(d.cost||0)-sum;
  box.innerHTML='<div class="notice '+(Math.abs(diff)<0.01?'green':diff>0?'yellow':'red')+'" style="margin-bottom:10px;">'+
    'Costo actual del plato: <strong>'+money(d.cost)+'</strong> &nbsp;|&nbsp; Suma de ingredientes: <strong>'+money(sum)+'</strong> &nbsp;|&nbsp; Diferencia: <strong>'+money(diff)+'</strong></div>'+
    ings.map(function(ing,idx){
      return '<div class="ing-row">'+
        '<input type="text" data-kind="ingredient" data-dish-id="'+esc(d.id)+'" data-index="'+idx+'" data-pos="0" value="'+esc(ing[0])+'" placeholder="Nombre del costo">'+
        '<input type="number" step="0.1" data-kind="ingredient" data-dish-id="'+esc(d.id)+'" data-index="'+idx+'" data-pos="1" value="'+Number(ing[1]||0)+'" placeholder="S/">'+
        '<button class="btn btn-danger btn-sm" data-action="delete-ingredient" data-dish-id="'+esc(d.id)+'" data-index="'+idx+'">✕</button>'+
        '</div>';
    }).join('');
  renderIngredientChart(d,1);
}

/* ─── PROMOS ───────────────────────────────────────── */
function renderPromoChecks(){
  var box=byId('promoDishChecks'); if(!box) return;
  box.innerHTML=activeDishes().map(function(d){
    return '<label class="chk"><input type="checkbox" value="'+esc(d.id)+'" data-kind="promo-check"> '+esc(d.name)+' <span style="color:var(--muted);font-size:12.5px;">('+money(d.price)+' / costo '+money(d.cost)+')</span></label>';
  }).join('');
}
function selectedPromoDishIds(){
  return Array.prototype.slice.call(document.querySelectorAll('#promoDishChecks input:checked')).map(function(i){return i.value;});
}
function updatePromoPreview(){
  var ids=selectedPromoDishIds();
  var price=Number((byId('promoPrice')&&byId('promoPrice').value)||0);
  var dishes=ids.map(getDish).filter(Boolean);
  var normal=dishes.reduce(function(s,d){return s+Number(d.price||0);},0);
  var cost=dishes.reduce(function(s,d){return s+Number(d.cost||0);},0);
  var profit=price-cost, fc=price>0?cost/price*100:0;
  var st=stateByFoodCost(fc,profit);
  var suggested=cost/(Number(data.settings.idealFoodCost||35)/100);
  var box=byId('promoPreview'); if(!box) return;
  if(!ids.length){box.innerHTML='Selecciona platos y escribe un precio para ver si la promo conviene.';return;}
  box.className='notice '+(st.cls==='green'?'green':st.cls==='yellow'?'yellow':'red');
  box.innerHTML='<strong>'+dishes.map(function(d){return esc(d.name);}).join(' + ')+'</strong><br><br>'+
    'Precio normal carta: <strong>'+money(normal)+'</strong><br>'+
    'Precio promocional: <strong>'+money(price)+'</strong><br>'+
    'Descuento: <strong>'+money(normal-price)+'</strong><br>'+
    'Costo total: <strong>'+money(cost)+'</strong><br>'+
    'Utilidad por venta: <strong>'+money(profit)+'</strong><br>'+
    'Food cost: <strong>'+pct(fc)+'</strong><br>'+
    'Precio mínimo sugerido: <strong>'+money(suggested)+'</strong><br><br>'+
    'Estado: '+badge(st.label,st.cls);
}
function renderPromotions(){
  var b=byId('promoRows'); if(!b) return;
  b.innerHTML=data.promotions.map(function(p){
    var m=promoMetrics(p), st=stateByFoodCost(m.fc,m.profit);
    return '<tr>'+
      '<td><input type="checkbox" data-kind="promotion" data-id="'+esc(p.id)+'" data-field="active" '+(p.active?'checked':'')+' style="accent-color:var(--blue);"></td>'+
      '<td><input type="text" data-kind="promotion" data-id="'+esc(p.id)+'" data-field="name" value="'+esc(p.name)+'" style="width:200px;"></td>'+
      '<td style="font-size:12px;color:var(--muted);">'+m.dishes.map(function(d){return esc(d.name);}).join('<br>')+'</td>'+
      '<td>'+money(m.normalPrice)+'</td>'+
      '<td><input type="number" step="0.1" data-kind="promotion" data-id="'+esc(p.id)+'" data-field="price" value="'+Number(p.price||0)+'" style="width:80px;"></td>'+
      '<td>'+money(m.cost)+'</td>'+
      '<td>'+money(m.profit)+'</td>'+
      '<td>'+pct(m.fc)+'</td>'+
      '<td>'+badge(st.label,st.cls)+'</td>'+
      '<td><button class="btn btn-danger btn-sm" data-action="delete-promo" data-id="'+esc(p.id)+'">Eliminar</button></td>'+
      '</tr>';
  }).join('')||'<tr><td colspan="10" class="table-empty">No hay promociones.</td></tr>';
}

/* ─── MOVEMENTS ────────────────────────────────────── */
function movementMetrics(m){
  var qty=Number(m.qty||0), cost=Number(m.cost||0), waste=Math.min(100,Math.max(0,Number(m.waste||0)));
  var usable=qty*(1-waste/100), costPerUnit=usable>0?cost/usable:0, portion=Number(m.portion||0);
  return{usableQty:usable,costPerUnit:costPerUnit,portionCost:portion>0?costPerUnit*portion:0};
}
function todayIso(){ return new Date().toISOString().slice(0,10); }
function renderMovementForms(){
  if(!byId('movPart')) return;
  var prodSel=byId('movProductSelect');
  var curProd=prodSel.value||'Pollo';
  var products=uniqueValues((data.purchaseProducts||[]).concat((data.movements||[]).map(function(m){return m.product;})));
  prodSel.innerHTML=products.map(function(x){return'<option value="'+esc(x)+'" '+(curProd===x?'selected':'')+'>'+esc(x)+'</option>';}).join('')+'<option value="__other">＋ Otro / nuevo</option>';
  setSelectOther('movProductSelect','movProductOther');

  var sp=byId('movPart').value||'Pollo entero';
  byId('movPart').innerHTML=data.purchaseParts.map(function(x){return'<option value="'+esc(x)+'" '+(sp===x?'selected':'')+'>'+esc(x)+'</option>';}).join('')+'<option value="__other">＋ Otro / nuevo</option>';
  setSelectOther('movPart','movPartOther');

  var sd=byId('movDish').value||'';
  byId('movDish').innerHTML='<option value="">Sin plato</option>'+activeDishes().map(function(d){return'<option value="'+esc(d.id)+'" '+(sd===d.id?'selected':'')+'>'+esc(d.name)+'</option>';}).join('');
  if(!byId('movDate').value) byId('movDate').value=todayIso();
}
function renderMovements(){
  if(!byId('movementRows')) return;
  renderMovementForms();
  var movs=data.movements||[];
  var total=movs.reduce(function(s,m){return s+Number(m.cost||0);},0);
  var purch=movs.filter(function(m){return m.type==='compra';}).reduce(function(s,m){return s+Number(m.cost||0);},0);
  var byPart={};
  movs.forEach(function(m){byPart[m.part||'Otro']=(byPart[m.part||'Otro']||0)+Number(m.cost||0);});
  var top=Object.keys(byPart).sort(function(a,b){return byPart[b]-byPart[a];})[0]||'-';
  byId('movementKpis').innerHTML=[
    ['Total gastado',money(total),'Todos los registros','var(--yellow)'],
    ['Solo compras',money(purch),'Tipo compra','var(--blue)'],
    ['Mayor gasto',esc(top),money(byPart[top]||0),'var(--red)']
  ].map(function(x){return'<div class="kpi"><div class="k-label">'+x[0]+'</div><div class="k-val" style="color:'+x[3]+';">'+x[1]+'</div><div class="k-note">'+x[2]+'</div></div>';}).join('');
  byId('movementAdvice').innerHTML='<div class="notice blue" style="margin-top:10px;">💡 Registra costo total, kg comprados, merma % y porción usada. El sistema calcula cuánto te cuesta cada kg útil y cada porción servida.</div>';
  byId('movementRows').innerHTML=movs.slice().reverse().map(function(m){
    var mm=movementMetrics(m), d=getDish(m.dishId);
    return'<tr><td>'+esc(m.date||'')+'</td><td>'+esc(m.product||'')+'</td><td>'+esc(m.part||'')+'</td><td>'+esc(m.type||'')+'</td>'+
      '<td>'+Number(m.qty||0).toFixed(2)+' '+esc(m.unit||'')+'</td><td>'+money(m.cost)+'</td>'+
      '<td>'+money(mm.costPerUnit)+'</td><td>'+money(mm.portionCost)+'</td>'+
      '<td>'+esc(d?d.name:'-')+'</td>'+
      '<td><button class="btn btn-danger btn-sm" data-action="delete-movement" data-id="'+esc(m.id)+'">✕</button></td></tr>';
  }).join('')||'<tr><td colspan="10" class="table-empty">Aún no hay registros. Agrega una compra real.</td></tr>';
}

/* ─── PRODUCTION CALC ──────────────────────────────── */
var prodRowData=[{id:uid('pr'),name:'',dishes:4,presasPerDish:2,costPerPresa:0}];

function renderProdRows(){
  var c=byId('prodRows'); if(!c) return;
  c.innerHTML=prodRowData.map(function(row,i){
    return '<div class="prod-row">'+
      '<div class="f-group">'+
        '<label class="lbl">Nombre del plato o producto</label>'+
        '<select style="width:100%;" data-pf="nameSelect" data-pi="'+i+'">'+activeDishes().map(function(d){return '<option value="'+esc(d.name)+'" '+(row.name===d.name?'selected':'')+'>'+esc(d.name)+'</option>';}).join('')+'<option value="__other" '+((row.name&&!activeDishes().some(function(d){return d.name===row.name;}))?'selected':'')+'>＋ Otro / nuevo</option></select>'+
        '<input type="text" class="other-input" style="'+((row.name&&!activeDishes().some(function(d){return d.name===row.name;}))?'':'display:none;')+'" placeholder="Escribe el producto" value="'+((row.name&&!activeDishes().some(function(d){return d.name===row.name;}))?esc(row.name):'')+'" data-pf="nameOther" data-pi="'+i+'">'+
      '</div>'+
      '<div class="f-group">'+
        '<label class="lbl">¿Cuántos platos?</label>'+
        '<input type="number" min="0" step="1" style="width:100%;" value="'+row.dishes+'" data-pf="dishes" data-pi="'+i+'">'+
      '</div>'+
      '<div class="f-group">'+
        '<label class="lbl">Presas por plato</label>'+
        '<input type="number" min="0" step="0.5" style="width:100%;" value="'+row.presasPerDish+'" data-pf="presasPerDish" data-pi="'+i+'">'+
      '</div>'+
      '<div class="f-group">'+
        '<label class="lbl">Costo por presa (S/)</label>'+
        '<input type="number" min="0" step="0.01" style="width:100%;" value="'+row.costPerPresa+'" data-pf="costPerPresa" data-pi="'+i+'">'+
      '</div>'+
      (prodRowData.length>1?'<button class="btn btn-danger btn-sm" style="align-self:flex-end;" data-pd="'+i+'">✕ Quitar</button>':'<span></span>')+
      '</div>';
  }).join('');
  renderProdResult();
}
function renderProdResult(){
  var res=byId('prodResult'); if(!res) return;
  var hasData=prodRowData.some(function(r){return Number(r.dishes)>0&&Number(r.presasPerDish)>0&&Number(r.costPerPresa)>0;});
  res.style.display=hasData?'':'none';
  if(!hasData) return;
  var grandTotal=0, grandDishes=0;
  var rows=prodRowData.map(function(row){
    var d=Number(row.dishes)||0, p=Number(row.presasPerDish)||0, cp=Number(row.costPerPresa)||0;
    var tp=d*p, tc=tp*cp, cpd=p*cp;
    grandTotal+=tc; grandDishes+=d;
    return{name:row.name,dishes:d,presas:p,totalPresas:tp,costPresa:cp,costPerDish:cpd,totalCost:tc};
  });
  var avg=grandDishes>0?grandTotal/grandDishes:0;
  byId('prodResultKpis').innerHTML=[
    ['Costo total producción',money(grandTotal),'Lo que saliste de bolsillo hoy','var(--yellow)'],
    ['Total de platos',grandDishes+' platos','Preparados en total','var(--blue)'],
    ['Costo promedio por plato',money(avg),'Promedio de todos los productos','var(--green)'],
    ['Productos registrados',prodRowData.filter(function(r){return Number(r.dishes)>0&&Number(r.presasPerDish)>0&&Number(r.costPerPresa)>0;}).length+' ítems','En esta sesión','var(--purple)']
  ].map(function(x){return'<div class="kpi"><div class="k-label">'+x[0]+'</div><div class="k-val" style="color:'+x[3]+';">'+x[1]+'</div><div class="k-note">'+x[2]+'</div></div>';}).join('');
  byId('prodResultBody').innerHTML=rows.map(function(r){
    if(!r.dishes&&!r.presas&&!r.costPresa) return '';
    return'<tr>'+
      '<td><strong>'+esc(r.name||'—')+'</strong></td>'+
      '<td>'+r.dishes+'</td>'+
      '<td>'+r.presas+'</td>'+
      '<td>'+r.totalPresas+'</td>'+
      '<td>'+money(r.costPresa)+'</td>'+
      '<td><strong style="color:var(--blue);">'+money(r.costPerDish)+'</strong></td>'+
      '<td><strong style="color:var(--green);">'+money(r.totalCost)+'</strong></td>'+
      '</tr>';
  }).filter(Boolean).join('')||'<tr><td colspan="7" class="table-empty">Llena los campos para ver el resultado.</td></tr>';
}

/* ─── CHARTS ───────────────────────────────────────── */
function animateCharts(){
  var token=++chartToken, start=performance.now();
  function frame(now){
    if(token!==chartToken) return;
    var p=Math.min(1,(now-start)/700); p=1-Math.pow(1-p,3);
    drawAllCharts(p); if(p<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function drawAllCharts(prog){
  var ingDish=getDish(byId('ingredientDishSelect')?byId('ingredientDishSelect').value:'');
  if(ingDish) renderIngredientChart(ingDish,prog);
}
function renderIngredientChart(d,prog){
  drawPieChart('ingredientChart',(d.ingredients||[]).map(function(i){return i[0];}),(d.ingredients||[]).map(function(i){return Number(i[1]||0);}),prog||1);
}
function drawPieChart(canvasId,labels,values,progress){
  var canvas=byId(canvasId); if(!canvas||!canvas.getContext) return;
  var rect=canvas.parentElement.getBoundingClientRect(), dpr=window.devicePixelRatio||1;
  canvas.width=Math.max(300,Math.floor(rect.width*dpr));
  canvas.height=Math.max(230,Math.floor(rect.height*dpr));
  var ctx=canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  var w=canvas.width/dpr, h=canvas.height/dpr;
  ctx.clearRect(0,0,w,h);
  var total=values.reduce(function(s,v){return s+Math.max(0,Number(v||0));},0);
  if(total<=0){ctx.fillStyle='#6e91a8';ctx.font='13px DM Sans,Arial';ctx.fillText('Sin costos registrados.',14,40);return;}
  var colors=['#29aadb','#27c47a','#e8b84b','#e85a5a','#9b8cff','#ff9f40','#4bc0c0','#c9cbcf'];
  var cx=Math.min(w*.3,130), cy=h*.52, r=Math.min(88,h*.27,w*.22);
  var start=-Math.PI/2;
  values.forEach(function(v,i){
    var slice=Math.max(0,Number(v||0))/total*Math.PI*2*(progress||1);
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,start+slice);ctx.closePath();
    ctx.fillStyle=colors[i%colors.length];ctx.fill();
    start+=Math.max(0,Number(v||0))/total*Math.PI*2;
  });
  ctx.font='12.5px DM Sans,Arial';
  var lx=cx+r+22, ly=28;
  labels.forEach(function(label,i){
    if(ly>h-14) return;
    ctx.fillStyle=colors[i%colors.length];ctx.fillRect(lx,ly-11,10,10);
    ctx.fillStyle='#e8f4fb';
    var share=Number(values[i]||0)/total*100;
    ctx.fillText(String(label||'').slice(0,24)+' — '+money(values[i])+' ('+pct(share)+')',lx+16,ly);
    ly+=20;
  });
}

/* ─── DATA MUTATIONS ───────────────────────────────── */
function openAddDishModal(){
  var nameInp = byId('modalDishName');
  var catSel = byId('modalDishCategory');
  var catOther = byId('modalDishCategoryOther');
  var priceInp = byId('modalDishPrice');
  var costInp = byId('modalDishCost');
  var qtyInp = byId('modalDishQty');
  
  if (nameInp) nameInp.value = '';
  if (priceInp) priceInp.value = '';
  if (costInp) costInp.value = '';
  if (qtyInp) qtyInp.value = '';
  
  if (catSel) {
    var cats = dishCategories();
    catSel.innerHTML = optionList(cats, cats[0] || 'Nueva categoría', false);
    catSel.value = cats[0] || '__other';
    setSelectOther('modalDishCategory', 'modalDishCategoryOther');
  }
  if (catOther) catOther.value = '';
  
  var modal = byId('addDishModal');
  if (modal) modal.classList.add('active');
  if (nameInp) nameInp.focus();
}

function closeAddDishModal(){
  var modal = byId('addDishModal');
  if (modal) modal.classList.remove('active');
}

function saveDishFromModal(){
  var name = (byId('modalDishName').value || '').trim();
  var category = valueFromSelectOther('modalDishCategory', 'modalDishCategoryOther', 'Nueva categoría');
  var price = Number(byId('modalDishPrice').value || 0);
  var cost = Number(byId('modalDishCost').value || 0);
  var qtyDay = Number(byId('modalDishQty').value || 0);
  
  if (!name) {
    alert('Por favor, ingresa el nombre del plato.');
    return;
  }
  
  var id = uid('d');
  var newDish={
    id: id,
    active: true,
    name: name,
    category: category,
    price: price,
    cost: cost,
    qtyDay: qtyDay,
    notes: '',
    ingredients: [['Ingrediente principal', cost]]
  };
  data.dishes.push(newDish);
  recordEvent('create','dish',id,null,clone(newDish));
  autoSave(true);
  closeAddDishModal();
}
function deleteDish(id){
  if(!confirm('¿Eliminar este plato?')) return;
  var before=getDish(id);
  data.dishes=data.dishes.filter(function(d){return d.id!==id;});
  data.promotions.forEach(function(p){p.dishIds=(p.dishIds||[]).filter(function(x){return x!==id;});});
  if(data.ui && data.ui.selectedDishId===id) data.ui.selectedDishId=data.dishes[0]?data.dishes[0].id:'';
  recordEvent('delete','dish',id,clone(before),null);
  autoSave(true);
}
function addIngredient(dishId){
  var d=getDish(dishId); if(!d) return;
  if(!Array.isArray(d.ingredients)) d.ingredients=[];
  var before=clone(d);
  d.ingredients.push(['Nuevo costo',0]);
  recordEvent('add_ingredient','dish',dishId,before,clone(d));
  autoSave(true);
}
function deleteIngredient(dishId,idx){
  var d=getDish(dishId); if(!d||!Array.isArray(d.ingredients)) return;
  var before=clone(d);
  d.ingredients.splice(idx,1); recordEvent('delete_ingredient','dish',dishId,before,clone(d)); autoSave(true);
}
function applyIngredientSum(dishId){
  var d=getDish(dishId); if(!d) return;
  var before=clone(d);
  d.cost=Number((d.ingredients||[]).reduce(function(s,i){return s+Number(i[1]||0);},0).toFixed(2));
  recordEvent('apply_ingredient_sum','dish',dishId,before,clone(d));
  autoSave(true);
}
function addPromotion(){
  var name=(byId('promoName').value||'').trim()||'Nueva promoción';
  var price=Number(byId('promoPrice').value||0);
  var qtyDay=Number(byId('promoQty').value||0);
  var ids=selectedPromoDishIds();
  if(!ids.length){alert('Selecciona al menos un plato.');return;}
  if(price<=0){alert('Escribe un precio mayor a cero.');return;}
  var promo={id:uid('p'),active:true,name:name,dishIds:ids,price:price,qtyDay:qtyDay};
  data.promotions.push(promo);
  recordEvent('create','promotion',promo.id,null,clone(promo));
  autoSave(true); clearPromoForm();
}
function clearPromoForm(){
  byId('promoName').value=''; byId('promoPrice').value=''; byId('promoQty').value='';
  document.querySelectorAll('#promoDishChecks input').forEach(function(i){i.checked=false;});
  updatePromoPreview();
}
function deletePromotion(id){
  if(!confirm('¿Eliminar esta promoción?')) return;
  var before=data.promotions.find(function(p){return p.id===id;});
  data.promotions=data.promotions.filter(function(p){return p.id!==id;}); recordEvent('delete','promotion',id,clone(before),null); autoSave(true);
}
function addMovement(){
  var m={
    id:uid('m'), date:byId('movDate').value||todayIso(),
    product:valueFromSelectOther('movProductSelect','movProductOther','Producto sin nombre'),
    part:valueFromSelectOther('movPart','movPartOther','Otro'), type:byId('movType').value||'compra',
    qty:Number(byId('movQty').value||0), unit:byId('movUnit').value||'kg',
    cost:Number(byId('movCost').value||0), waste:Number(byId('movWaste').value||0),
    portion:Number(byId('movPortion').value||0), dishId:byId('movDish').value||''
  };
  if(m.qty<=0||m.cost<=0){alert('Coloca cantidad y costo mayores a cero.');return;}
  if(data.purchaseProducts.indexOf(m.product)===-1) data.purchaseProducts.push(m.product);
  if(data.purchaseParts.indexOf(m.part)===-1) data.purchaseParts.push(m.part);
  data.movements.push(m);
  recordEvent('create','movement',m.id,null,clone(m));
  if(byId('movProductOther')) byId('movProductOther').value=''; if(byId('movPartOther')) byId('movPartOther').value=''; byId('movQty').value=''; byId('movCost').value=''; byId('movPortion').value=''; byId('movWaste').value='0';
  autoSave(true);
}
function deleteMovement(id){
  var before=(data.movements||[]).find(function(m){return m.id===id;});
  data.movements=(data.movements||[]).filter(function(m){return m.id!==id;}); recordEvent('delete','movement',id,clone(before),null); autoSave(true);
}
function clearMovements(){
  if(!confirm('¿Borrar todos los movimientos?')) return;
  var before=clone(data.movements||[]);
  data.movements=[]; recordEvent('clear','movements','all',before,[]); autoSave(true);
}
function buildExportPackage(){
  ensureDataShape();
  var dishes=(data.dishes||[]).map(function(d){ var m=dishMetrics(d); var st=stateByFoodCost(m.fc,m.profit); return {
    id:d.id, active:!!d.active, name:d.name, category:d.category, price:Number(d.price||0), cost:Number(d.cost||0), qtyDay:Number(d.qtyDay||0),
    profit:Number(m.profit.toFixed(2)), foodCostPct:Number(m.fc.toFixed(2)), state:st.label, dailyProfit:Number(m.daily.toFixed(2)), monthlyProfit:Number(m.monthly.toFixed(2)), suggestedPrice:Number(m.suggested.toFixed(2)), notes:d.notes||''
  };});
  var ingredients=[]; (data.dishes||[]).forEach(function(d){ (d.ingredients||[]).forEach(function(i,idx){ ingredients.push({dishId:d.id,dishName:d.name,line:idx+1,name:i[0],cost:Number(i[1]||0)}); }); });
  var promotions=(data.promotions||[]).map(function(p){ var m=promoMetrics(p); var st=stateByFoodCost(m.fc,m.profit); return {id:p.id,active:!!p.active,name:p.name,price:Number(p.price||0),qtyDay:Number(p.qtyDay||0),normalPrice:Number(m.normalPrice.toFixed(2)),cost:Number(m.cost.toFixed(2)),profit:Number(m.profit.toFixed(2)),foodCostPct:Number(m.fc.toFixed(2)),state:st.label,monthlyProfit:Number(m.monthly.toFixed(2))}; });
  var promoItems=[]; (data.promotions||[]).forEach(function(p){ (p.dishIds||[]).forEach(function(id){ var d=getDish(id); promoItems.push({promotionId:p.id,promotionName:p.name,dishId:id,dishName:d?d.name:''}); }); });
  var movements=(data.movements||[]).map(function(m){ var mm=movementMetrics(m), d=getDish(m.dishId); return {id:m.id,date:m.date,product:m.product,part:m.part,type:m.type,qty:Number(m.qty||0),unit:m.unit,cost:Number(m.cost||0),wastePct:Number(m.waste||0),usableQty:Number(mm.usableQty.toFixed(4)),costPerUnit:Number(mm.costPerUnit.toFixed(4)),portion:Number(m.portion||0),portionCost:Number(mm.portionCost.toFixed(4)),dishId:m.dishId||'',dishName:d?d.name:''}; });
  return {
    schema:'reybar-costeo-real-export',
    schemaVersion:5,
    exportedAt:nowIso(),
    purpose:'Paquete completo para migrar este HTML a un programa real, backend, base de datos o procesamiento por IA.',
    meta:{ app:'Reybar Costeo', schemaVersion:5, exportedAt:nowIso(), source:'localStorage', storageKey:STORAGE_KEY },
    settings:data.settings,
    rawData:clone(data),
    tables:{ dishes:dishes, dishIngredients:ingredients, promotions:promotions, promotionItems:promoItems, purchaseMovements:movements, auditLog:data.auditLog||[] },
    suggestedDatabase:{
      tables:['dishes','dish_ingredients','promotions','promotion_items','purchase_movements','audit_log','settings'],
      primaryKeys:['id'],
      relations:['dish_ingredients.dishId -> dishes.id','promotion_items.promotionId -> promotions.id','promotion_items.dishId -> dishes.id','purchase_movements.dishId -> dishes.id'],
      importOrder:['settings','dishes','dish_ingredients','promotions','promotion_items','purchase_movements','audit_log']
    },
    aiMigrationPrompt:'Usa rawData como respaldo fiel del HTML y tables como estructura normalizada. Construye una app real preservando IDs, relaciones, cálculos, historial auditLog y configuración.'
  };
}
function downloadText(filename, text, mime){
  var blob=new Blob([text],{type:mime||'text/plain;charset=utf-8'});
  var url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function csvEscape(v){ return '"'+String(v==null?'':v).replace(/"/g,'""')+'"'; }
function toCsv(rows){ if(!rows.length) return ''; var headers=Object.keys(rows[0]); return [headers.map(csvEscape).join(',')].concat(rows.map(function(r){return headers.map(function(h){return csvEscape(r[h]);}).join(',');})).join('\n'); }
function exportSystemPackage(){
  saveData(); recordEvent('export_package','system','',null,{format:'json'}); saveData();
  downloadText('reybar-paquete-sistema-real.json', JSON.stringify(buildExportPackage(),null,2), 'application/json;charset=utf-8');
}
function exportAllCsv(){
  var pack=buildExportPackage(), chunks=[];
  Object.keys(pack.tables).forEach(function(name){ chunks.push('### '+name); chunks.push(toCsv(pack.tables[name])); chunks.push(''); });
  recordEvent('export_csv_master','system','',null,{tables:Object.keys(pack.tables)}); saveData();
  downloadText('reybar-csv-maestro.csv', chunks.join('\n'), 'text/csv;charset=utf-8');
}
function copyJsonBox(){
  saveData();
  var text=byId('jsonBox')?byId('jsonBox').value:JSON.stringify(data,null,2);
  if(navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){alert('JSON copiado al portapapeles.');}); }
  else { alert('Copia manualmente el contenido del cuadro JSON.'); }
}
function renderAuditBox(){
  var box=byId('auditBox'); if(!box) return;
  var logs=(data.auditLog||[]).slice(0,30);
  box.innerHTML=logs.map(function(l){return '<div class="audit-item"><span class="code-mini">'+esc(l.at||'')+'</span><br><strong>'+esc(l.action||'')+'</strong> · '+esc(l.entity||'')+' '+esc(l.entityId||'')+'</div>';}).join('') || '<div class="audit-item">Aún no hay cambios registrados en esta versión.</div>';
}
function exportMovementsCsv(){
  var rows=[['fecha','producto','parte','tipo','cantidad','unidad','costo_total','merma_pct','porcion','costo_util_unidad','costo_por_porcion','plato']];
  (data.movements||[]).forEach(function(m){
    var mm=movementMetrics(m), d=getDish(m.dishId);
    rows.push([m.date,m.product,m.part,m.type,m.qty,m.unit,m.cost,m.waste,m.portion,mm.costPerUnit.toFixed(4),mm.portionCost.toFixed(4),d?d.name:'']);
  });
  var csv=rows.map(function(r){return r.map(function(v){return'"'+String(v==null?'':v).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  var url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download='compras-reybar.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function exportData(){
  saveData();
  var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  var url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download='reybar-respaldo.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function normalizeImportPayload(payload){
  if(payload&&payload.rawData&&Array.isArray(payload.rawData.dishes)) return payload.rawData;
  if(payload&&Array.isArray(payload.dishes)) return payload;
  if(payload&&payload.tables&&Array.isArray(payload.tables.dishes)){
    var tableDishes=payload.tables.dishes;
    var ingTable=payload.tables.dishIngredients||payload.tables.ingredients||[];
    var promoTable=payload.tables.promotions||[];
    var promoItems=payload.tables.promotionItems||payload.tables.promoItems||[];
    var movements=payload.tables.purchaseMovements||payload.tables.movements||[];
    var rebuilt={settings:payload.settings||initialData.settings,ui:{},dishes:[],promotions:[],movements:[],purchaseProducts:initialData.purchaseProducts.slice(),purchaseParts:initialData.purchaseParts.slice(),auditLog:payload.tables.auditLog||[]};
    rebuilt.dishes=tableDishes.map(function(d){
      return {id:String(d.id),active:d.active!==false,name:d.name||'Plato',category:d.category||'Sin categoría',price:normalizeNumber(d.price,0),cost:normalizeNumber(d.cost,0),qtyDay:normalizeNumber(d.qtyDay,0),notes:d.notes||'',ingredients:ingTable.filter(function(i){return String(i.dishId)===String(d.id);}).map(function(i){return [i.name||'Costo',normalizeNumber(i.cost,0)];})};
    });
    rebuilt.promotions=promoTable.map(function(p){ return {id:String(p.id),active:p.active!==false,name:p.name||'Promoción',price:normalizeNumber(p.price,0),qtyDay:normalizeNumber(p.qtyDay,0),dishIds:promoItems.filter(function(i){return String(i.promotionId)===String(p.id);}).map(function(i){return String(i.dishId);})}; });
    rebuilt.movements=movements.map(function(m){ return {id:String(m.id||uid('m')),date:m.date||todayIso(),product:m.product||'Producto',part:m.part||'Otro',type:m.type||'compra',qty:normalizeNumber(m.qty,0),unit:m.unit||'kg',cost:normalizeNumber(m.cost,0),waste:normalizeNumber(m.wastePct||m.waste,0),portion:normalizeNumber(m.portion,0),dishId:m.dishId||''}; });
    return rebuilt;
  }
  throw new Error('Formato no compatible');
}
function importData(event){
  var file=event.target.files[0]; if(!file) return;
  var reader=new FileReader();
  reader.onload=function(){
    try{
      var p=JSON.parse(String(reader.result||''));
      var normalized=normalizeDataShape(normalizeImportPayload(p));
      if(!normalized||!Array.isArray(normalized.dishes)||!Array.isArray(normalized.promotions)||!normalized.settings) throw new Error();
      var before=clone(data);
      data=normalized;
      recordEvent('import','system','json',before,clone(data));
      autoSave(true); alert('Importado correctamente.');
    }catch(e){alert('Archivo inválido o estructura incompatible.');}
  };
  reader.readAsText(file); event.target.value='';
}
function resetData(){
  if(!confirm('¿Restablecer datos de ejemplo?')) return;
  var before=clone(data);
  data=JSON.parse(JSON.stringify(initialData));
  recordEvent('reset','system','all',before,clone(data)); autoSave(true);
}

/* ─── RENDER ALL ───────────────────────────────────── */
function renderAll(animate){
  saveData();
  renderSummary();
  renderDishes();
  renderIngredientSelect();
  renderIngredientPanel();
  renderPromoChecks();
  updatePromoPreview();
  renderPromotions();
  renderMovements();
  renderProdRows();
  renderProdResult();
  if(animate!==false) animateCharts(); else drawAllCharts(1);
}

/* ─── EVENTS ───────────────────────────────────────── */
function attachEvents(){
  safeOn('btnSave','click',function(){saveData(); alert('Datos guardados en este navegador.');});
  safeOn('btnExport','click',exportData);
  safeOn('btnExport2','click',exportData);
  safeOn('btnImport','click',function(){var f=byId('importFile'); if(f) f.click();});
  safeOn('btnImport2','click',function(){var f=byId('importFile'); if(f) f.click();});
  safeOn('btnExportPackage','click',exportSystemPackage);
  safeOn('btnExportAllCsv','click',exportAllCsv);
  safeOn('btnCopyJson','click',copyJsonBox);
  safeOn('btnReset','click',resetData);
  safeOn('importFile','change',importData);
  safeOn('btnAddDish','click',openAddDishModal);
  safeOn('btnCloseModal','click',closeAddDishModal);
  safeOn('btnCancelModal','click',closeAddDishModal);
  safeOn('btnSaveModal','click',saveDishFromModal);
  safeOn('modalDishCategory','change',function(){setSelectOther('modalDishCategory','modalDishCategoryOther');});
  safeOn('addDishModal','click',function(e){if(e.target===this)closeAddDishModal();});
  safeOn('btnAddIngredient','click',function(){var sel=byId('ingredientDishSelect'); if(sel) addIngredient(sel.value);});
  safeOn('btnApplyIngredientSum','click',function(){var sel=byId('ingredientDishSelect'); if(sel) applyIngredientSum(sel.value);});
  safeOn('btnAddPromo','click',addPromotion);
  safeOn('btnClearPromo','click',clearPromoForm);
  safeOn('btnAddMovement','click',addMovement);
  safeOn('btnClearMovements','click',clearMovements);
  safeOn('btnExportMovements','click',exportMovementsCsv);
  safeOn('movProductSelect','change',function(){setSelectOther('movProductSelect','movProductOther');});
  safeOn('movPart','change',function(){setSelectOther('movPart','movPartOther');});

  // nav
  document.querySelectorAll('.nav-btn').forEach(function(b){
    b.addEventListener('click',function(){setTab(b.dataset.tab);});
  });

  safeOn('menuCategoryFilter','change',function(){renderSummary();});
  safeOn('menuSearch','input',function(){renderSummary();});
  safeOn('ingredientDishSelect','change',function(){data.ui.selectedDishId=this.value; saveData(); renderIngredientPanel(); animateCharts();});
  ['promoName','promoPrice','promoQty'].forEach(function(id){safeOn(id,'input',updatePromoPreview);});

  // prod calc
  safeOn('prodRows','input',function(e){
    var f=e.target.dataset.pf, i=Number(e.target.dataset.pi);
    if(f===undefined||isNaN(i)||!prodRowData[i]) return;
    if(f==='nameSelect'){
      var other=e.target.parentElement.querySelector('[data-pf="nameOther"]');
      if(e.target.value==='__other'){ if(other){other.style.display='block'; other.focus();} prodRowData[i].name=(other&&other.value)||''; }
      else { if(other){other.style.display='none'; other.value='';} prodRowData[i].name=e.target.value; }
    }else if(f==='nameOther'){
      prodRowData[i].name=e.target.value;
    }else{
      prodRowData[i][f]=e.target.value;
    }
    renderProdResult();
  });
  safeOn('prodRows','click',function(e){
    var btn=e.target.closest('[data-pd]'); if(!btn) return;
    prodRowData.splice(Number(btn.dataset.pd),1); renderProdRows();
  });
  safeOn('btnAddProdRow','click',function(){
    prodRowData.push({id:uid('pr'),name:'',dishes:1,presasPerDish:2,costPerPresa:0}); renderProdRows();
  });

  // generic data change delegation
  document.addEventListener('change',function(e){
    var t=e.target, kind=t.dataset.kind;
    if(kind==='dish'){
      var d=getDish(t.dataset.id); if(!d) return;
      var before=clone(d);
      var f=t.dataset.field;
      if(f==='active') d[f]=t.checked;
      else if(['price','cost','qtyDay'].indexOf(f)>=0) d[f]=Number(t.value||0);
      else if(f==='category'&&t.value==='__other'){
        var nuevo=prompt('Escribe la nueva categoría:', d.category||'Nueva categoría');
        d[f]=(nuevo&&nuevo.trim())?nuevo.trim():d.category;
      }
      else d[f]=t.value;
      recordEvent('update_'+f,'dish',d.id,before,clone(d));
      autoSave(true);
    }
    if(kind==='ingredient'||kind==='selected-ingredient'){
      var dish=getDish(t.dataset.dishId); if(!dish) return;
      var beforeIng=clone(dish);
      var idx=Number(t.dataset.index), pos=Number(t.dataset.pos);
      if(!dish.ingredients||!dish.ingredients[idx]) return;
      dish.ingredients[idx][pos]=pos===1?Number(t.value||0):t.value;
      recordEvent('update_ingredient','dish',dish.id,beforeIng,clone(dish));
      autoSave(true);
    }
    if(kind==='promotion'){
      var p=data.promotions.find(function(x){return x.id===t.dataset.id;}); if(!p) return;
      var beforePromo=clone(p);
      var pf=t.dataset.field;
      if(pf==='active') p[pf]=t.checked;
      else if(['price','qtyDay'].indexOf(pf)>=0) p[pf]=Number(t.value||0);
      else p[pf]=t.value;
      recordEvent('update_'+pf,'promotion',p.id,beforePromo,clone(p));
      autoSave(true);
    }
    if(kind==='promo-check') updatePromoPreview();
  });

  // click delegation (delete, open-dish)
  document.addEventListener('click',function(e){
    var btn=e.target.closest('[data-action]'); if(!btn) return;
    var action=btn.dataset.action;
    if(action==='open-dish'){setTab('ingredientes');var sel=byId('ingredientDishSelect');if(sel){sel.value=btn.dataset.id;data.ui.selectedDishId=btn.dataset.id;saveData();renderIngredientPanel();animateCharts();}}
    if(action==='delete-dish') deleteDish(btn.dataset.id);
    if(action==='delete-promo') deletePromotion(btn.dataset.id);
    if(action==='delete-movement') deleteMovement(btn.dataset.id);
    if(action==='delete-ingredient') deleteIngredient(btn.dataset.dishId,Number(btn.dataset.index));
  });

  window.addEventListener('resize',function(){drawAllCharts(1);});
}

document.addEventListener('DOMContentLoaded', function(){
  attachEvents();
  renderAll(true);
});
