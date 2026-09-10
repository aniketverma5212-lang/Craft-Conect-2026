const CRAFT_DATABASE = {
  pottery: {
    en: {
      title: "Handcrafted Terracotta Clay Pitcher",
      category: "Earthenware & Pottery",
      description: "Authentic heat-resistant clay pot crafted on traditional foot-operated wheels.",
      story: "Crafted by master potters using nutrient-rich riverbed clay, naturally fired for lasting durability.",
      tags: ["#Terracotta", "#PachpadraPottery", "#ZeroPlastic"]
    },
    hi: {
      title: "हस्तनिर्मित टेराकोटा मिट्टी का कलश",
      category: "पारंपरिक मृत्तिका शिल्प",
      description: "पारंपरिक चाक पर शुद्ध चिकनी मिट्टी से तैयार किया गया प्राकृतिक जल पात्र।",
      story: "कारीगरों द्वारा पीढ़ियों पुरानी भट्टी-पकाव विधि से तैयार किया गया बर्तन।",
      tags: ["#टेराकोटा", "#पारंपरिक_शिल्प", "#पर्यावरण_अनुकूल"]
    },
    emoji: "🏺"
  },
  metal: {
    en: {
      title: "Hand-Engraved Royal Brass Lamp",
      category: "Metalware & Bell Craft",
      description: "Traditional embossed brass handicraft with fine floral chisel engravings.",
      story: "Cast in pure brass and hand-carved using hammer and punches over 14 continuous hours.",
      tags: ["#BrassCraft", "#HeritageMetal", "#RajasthanArt"]
    },
    hi: {
      title: "बारीक नक्काशीदार पीतल का लैंप",
      category: "धातु शिल्प एवं नक्काशी",
      description: "शुद्ध पीतल पर हथौड़ी और छेनी से की गई मनमोहक पारंपरिक मारवाड़ी नक्काशी।",
      story: "पीतल कारीगरों द्वारा 14 घंटों के निरंतर श्रम और बारीकी से तैयार।",
      tags: ["#पीतल_शिल्प", "#नक्काशी", "#स्वदेशी"]
    },
    emoji: "🪔"
  },
  handloom: {
    en: {
      title: "Authentic Hand-Woven Cotton Rug",
      category: "Handloom & Textiles",
      description: "Pure cotton flat-weave dhurrie created on vintage pit looms.",
      story: "Dyed with natural vegetable extracts, celebrating traditional folk patterns.",
      tags: ["#Handloom", "#PureCotton", "#WeaverEmpowerment"]
    },
    hi: {
      title: "हथकरघा बुनी हुई शुद्ध सूती दरी",
      category: "हथकरघा एवं वस्त्र",
      description: "पारंपरिक खड्डी पर शुद्ध सूती धागों से हस्तनिर्मित टिकाऊ कलात्मक दरी।",
      story: "प्राकृतिक रंगों से रंगे धागों का उपयोग कर स्थानीय बुनकरों द्वारा तैयार।",
      tags: ["#हथकरघा", "#सूती_वस्त्र", "#बुनकर"]
    },
    emoji: "🧵"
  }
};

const STRINGS = {
  en: {
    greeting: "Welcome, Artisan Partner 👋",
    sub: "Udaipur & Marwar Cluster · MSME Supported",
    stat1: "Active Products", stat2: "Tourists Reached", stat3: "Protected Margin",
    addBtn: "＋ Catalog New Craft (AI Assistant)",
    step0: "Capture", step1: "AI Analysis", step2: "Catalog", step3: "Fair Pricing", step4: "Live",
    uploadPrompt: "Upload or click a photo of your craft",
    craftTypeLbl: "Select Craft Type",
    matCostLbl: "Raw Material Cost (₹)",
    hoursLbl: "Labor Hours Spent",
    genBtn: "Generate Smart Listing →",
    evaluating: "AI is analyzing craft geometry, materials & fair margins...",
    pubSuccess: "Item Successfully Listed on CraftConnect!",
    viewCatalogBtn: "View in Public Catalog (list.html) ➔",
    backHome: "Back to Dashboard"
  },
  hi: {
    greeting: "कारीगर पोर्टल में स्वागत है 👋",
    sub: "उदयपुर एवं मारवाड़ क्लस्टर · MSME समर्थित",
    stat1: "सक्रिय उत्पाद", stat2: "पर्यटक पहुंचे", stat3: "सुरक्षित मुनाफा",
    addBtn: "＋ नया उत्पाद जोड़ें (AI सहायक)",
    step0: "फोटो लें", step1: "AI विश्लेषण", step2: "कैटलॉग", step3: "सही मूल्य", step4: "लाइव",
    uploadPrompt: "अपने हस्तशिल्प की फ़ोटो खींचें या अपलोड करें",
    craftTypeLbl: "शिल्प का प्रकार चुनें",
    matCostLbl: "कच्चे माल की लागत (₹)",
    hoursLbl: "बनाने में लगे कुल घंटे",
    genBtn: "AI कैटलॉग तैयार करें →",
    evaluating: "AI उत्पाद के आकार, सामग्री एवं सही मूल्य की गणना कर रहा है...",
    pubSuccess: "आपका उत्पाद CraftConnect पर लाइव सूचीबद्ध हो गया है!",
    viewCatalogBtn: "पब्लिक कैटलॉग में देखें (list.html) ➔",
    backHome: "डैशबोर्ड पर वापस जाएं"
  }
};

let currentLang = 'en';
let activeScreen = 'home';

let draft = {
  images: [],
  craftType: 'pottery',
  materialCost: 350,
  laborHours: 5,
  targetMode: 'hyperlocal',
  catalog: null,
  pricing: null
};

function changeLang(l) {
  currentLang = l;
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  document.getElementById('btn-hi').classList.toggle('active', l === 'hi');
  renderScreen();
}

function navigateTo(screen) {
  activeScreen = screen;
  renderScreen();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProgress(stepIdx) {
  const t = STRINGS[currentLang];
  const steps = [t.step0, t.step1, t.step2, t.step3, t.step4];
  return `
    <div class="steps-container">
      ${steps.map((label, idx) => `
        <div class="step-node ${idx === stepIdx ? 'active' : ''} ${idx < stepIdx ? 'done' : ''}">
          <div class="step-circle">${idx + 1}</div>
          <div class="step-title">${label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 1. HOME SCREEN
function renderHome() {
  const t = STRINGS[currentLang];
  const stored = localStorage.getItem('craftconnect_products');
  const count = stored ? JSON.parse(stored).length : 2;

  return `
    <div class="hero-card">
      <div class="hero-greeting">${t.greeting}</div>
      <div class="hero-subtitle">📍 ${t.sub}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><div class="stat-val">${count}</div><div class="stat-lbl">${t.stat1}</div></div>
      <div class="stat-box"><div class="stat-val">380+</div><div class="stat-lbl">${t.stat2}</div></div>
      <div class="stat-box"><div class="stat-val">15.4%</div><div class="stat-lbl">${t.stat3}</div></div>
    </div>

    <button class="btn btn-primary" onclick="startNewCatalog()">${t.addBtn}</button>
    <a href="list.html" class="btn btn-outline" style="text-decoration:none;">🛍️ Explore Public Catalog Page</a>
  `;
}

function startNewCatalog() {
  draft = { images: [], craftType: 'pottery', materialCost: 320, laborHours: 4, targetMode: 'hyperlocal', catalog: null, pricing: null };
  navigateTo('add');
}

// 2. ADD PRODUCT
function renderAdd() {
  const t = STRINGS[currentLang];
  const thumbs = draft.images.map((src, i) => `
    <div class="preview-slot">
      <img src="${src}"/>
      <div class="remove-icon" onclick="removePhoto(${i})">✕</div>
    </div>
  `).join('');

  return `
    <button class="btn-outline" style="width:auto; min-height:34px; padding:4px 12px; margin-bottom:14px;" onclick="navigateTo('home')">‹ Back</button>
    ${renderProgress(0)}

    <div class="card">
      <label class="field-label">${t.uploadPrompt}</label>
      <div class="upload-area">
        ${thumbs}
        <label class="upload-btn">
          <span>📷</span> Add Photo
          <input type="file" accept="image/*" onchange="handlePhotoUpload(event)"/>
        </label>
      </div>

      <div class="field-group">
        <label class="field-label">${t.craftTypeLbl}</label>
        <select onchange="draft.craftType = this.value">
          <option value="pottery" ${draft.craftType === 'pottery' ? 'selected' : ''}>Pottery &amp; Terracotta</option>
          <option value="metal" ${draft.craftType === 'metal' ? 'selected' : ''}>Brass &amp; Bell Metal Carving</option>
          <option value="handloom" ${draft.craftType === 'handloom' ? 'selected' : ''}>Handloom &amp; Textiles</option>
        </select>
      </div>

      <div class="field-group">
        <label class="field-label">Listing Mode</label>
        <select onchange="draft.targetMode = this.value">
          <option value="hyperlocal">📍 Hyperlocal (Tourists Walk-in &amp; Local pickup)</option>
          <option value="national">🇮🇳 National (All-India Parcel Delivery)</option>
        </select>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="field-group">
          <label class="field-label">${t.matCostLbl}</label>
          <input type="number" value="${draft.materialCost}" oninput="draft.materialCost = Number(this.value)"/>
        </div>
        <div class="field-group">
          <label class="field-label">${t.hoursLbl}</label>
          <input type="number" value="${draft.laborHours}" oninput="draft.laborHours = Number(this.value)"/>
        </div>
      </div>

      <button class="btn btn-primary" onclick="proceedToAnalyze()">${t.genBtn}</button>
    </div>
  `;
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    draft.images.push(evt.target.result);
    renderScreen();
  };
  reader.readAsDataURL(file);
}

function removePhoto(idx) {
  draft.images.splice(idx, 1);
  renderScreen();
}

function proceedToAnalyze() {
  navigateTo('analyze');
  setTimeout(() => {
    const craftInfo = CRAFT_DATABASE[draft.craftType] || CRAFT_DATABASE.pottery;
    draft.catalog = {
      title: craftInfo[currentLang].title,
      category: craftInfo[currentLang].category,
      description: craftInfo[currentLang].description,
      story: craftInfo[currentLang].story,
      tags: craftInfo[currentLang].tags,
      emoji: craftInfo.emoji
    };

    const mat = draft.materialCost || 300;
    const labor = (draft.laborHours || 4) * 90;
    const subtotal = mat + labor;
    const sellerProfit = Math.round(subtotal * 0.22);
    const platformFee = Math.round((subtotal + sellerProfit) * 0.05);
    const recommendedFinal = subtotal + sellerProfit + platformFee;

    draft.pricing = {
      finalPrice: `₹${recommendedFinal}`,
      matCost: mat,
      laborCost: labor,
      sellerProfit: sellerProfit,
      platformFee: platformFee
    };

    navigateTo('catalog');
  }, 1200);
}

// 3. ANALYZE SPINNER
function renderAnalyze() {
  return `
    ${renderProgress(1)}
    <div class="spinner-box">
      <div class="spinner"></div>
      <p style="color:var(--text-muted); font-size:14px;">${STRINGS[currentLang].evaluating}</p>
    </div>
  `;
}

// 4. CATALOG EDIT
function renderCatalog() {
  const cat = draft.catalog;
  return `
    <button class="btn-outline" style="width:auto; min-height:34px; padding:4px 12px; margin-bottom:14px;" onclick="navigateTo('add')">‹ Back</button>
    ${renderProgress(2)}

    <div class="card">
      <div style="font-size:32px; margin-bottom:10px;">${cat.emoji}</div>
      <div class="field-group">
        <label class="field-label">Title / शीर्षक</label>
        <input type="text" value="${cat.title}" oninput="draft.catalog.title = this.value"/>
      </div>
      <div class="field-group">
        <label class="field-label">Category / श्रेणी</label>
        <input type="text" value="${cat.category}" oninput="draft.catalog.category = this.value"/>
      </div>
      <div class="field-group">
        <label class="field-label">Overview / विवरण</label>
        <textarea oninput="draft.catalog.description = this.value">${cat.description}</textarea>
      </div>
      <button class="btn btn-primary" onclick="navigateTo('price')">Review Pricing &amp; Economics →</button>
    </div>
  `;
}

// 5. PRICING & PUBLISH ACTION
function renderPrice() {
  const p = draft.pricing;
  return `
    <button class="btn-outline" style="width:auto; min-height:34px; padding:4px 12px; margin-bottom:14px;" onclick="navigateTo('catalog')">‹ Back</button>
    ${renderProgress(3)}

    <div class="price-banner">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.05em; opacity:0.9;">Recommended Selling Price</div>
      <div class="price-range">${p.finalPrice}</div>
    </div>

    <div class="price-split">
      <div class="split-row"><span>Material Cost</span><span>₹${p.matCost}</span></div>
      <div class="split-row"><span>Artisan Labor Compensation</span><span>₹${p.laborCost}</span></div>
      <div class="split-row"><span>Protected Artisan Margin</span><span style="color:var(--forest);">+₹${p.sellerProfit}</span></div>
      <div class="split-row"><span>CraftConnect Fee (Low)</span><span>₹${p.platformFee}</span></div>
    </div>

    <button class="btn btn-forest" onclick="finalizePublish()">Publish Directly to Catalog Page 🚀</button>
  `;
}

// Final Save to LocalStorage
function finalizePublish() {
  const newProduct = {
    id: "prod-" + Date.now(),
    title: draft.catalog.title,
    category: draft.catalog.category,
    artisan: "Meera Devi (You)",
    location: draft.targetMode === 'hyperlocal' ? "Udaipur Old Town (900m away)" : "Pan-India Post",
    price: draft.pricing.finalPrice,
    type: draft.targetMode,
    emoji: draft.catalog.emoji,
    image: draft.images.length > 0 ? draft.images[0] : null,
    tags: draft.catalog.tags
  };

  let products = JSON.parse(localStorage.getItem('craftconnect_products') || '[]');
  products.unshift(newProduct);
  localStorage.setItem('craftconnect_products', JSON.stringify(products));

  navigateTo('publish');
}

// 6. PUBLISH SUCCESS
function renderPublish() {
  const t = STRINGS[currentLang];
  return `
    ${renderProgress(4)}
    <div class="card" style="text-align:center; padding:40px 20px;">
      <div style="font-size:52px; margin-bottom:12px;">🎉</div>
      <h2 style="font-size:22px; color:var(--forest); margin-bottom:6px;">${t.pubSuccess}</h2>
      <p style="color:var(--text-muted); font-size:14px; margin-bottom:24px;">"${draft.catalog.title}"</p>

      <a href="list.html" class="btn btn-primary" style="text-decoration:none; margin-bottom:12px;">${t.viewCatalogBtn}</a>
      <button class="btn btn-outline" onclick="navigateTo('home')">${t.backHome}</button>
    </div>
  `;
}

function renderScreen() {
  const root = document.getElementById("app-root");
  if (!root) return;
  if (activeScreen === 'home') root.innerHTML = renderHome();
  else if (activeScreen === 'add') root.innerHTML = renderAdd();
  else if (activeScreen === 'analyze') root.innerHTML = renderAnalyze();
  else if (activeScreen === 'catalog') root.innerHTML = renderCatalog();
  else if (activeScreen === 'price') root.innerHTML = renderPrice();
  else if (activeScreen === 'publish') root.innerHTML = renderPublish();
}

renderScreen();