/**
 * SOURCEHUB.IN - DYNAMIC SPO PRICING & FLEXIBLE UNITS ENGINE
 */

const SPO_PRODUCTS = {
  atta: {
    name: 'Aashirvaad Chakki Atta 10kg',
    category: 'Staples & Grains',
    mrp: 440,
    baseCost: 395,
    unitName: '10kg Bag',
    unitsPerPack: { unit: 1, pack: 4, box: 10, carton: 25, case: 50 },
    gstRate: 0.05
  },
  oil: {
    name: 'Fortune Sunlite Sunflower Oil 1L',
    category: 'Edible Oils',
    mrp: 165,
    baseCost: 145,
    unitName: '1L Pouch',
    unitsPerPack: { unit: 1, pack: 6, box: 12, carton: 24, case: 48 },
    gstRate: 0.05
  },
  chips: {
    name: "Lay's Classic Salted Party Pack",
    category: 'Packaged Snacks',
    mrp: 50,
    baseCost: 42,
    unitName: '115g Pack',
    unitsPerPack: { unit: 1, pack: 12, box: 24, carton: 48, case: 96 },
    gstRate: 0.12
  },
  soap: {
    name: 'Medimix Ayurvedic Soap 125g (4-Pack)',
    category: 'Personal Care',
    mrp: 180,
    baseCost: 152,
    unitName: '4-Bar Box',
    unitsPerPack: { unit: 1, pack: 6, box: 12, carton: 36, case: 72 },
    gstRate: 0.18
  },
  drink: {
    name: 'Red Bull Energy Drink 250ml',
    category: 'Beverages',
    mrp: 125,
    baseCost: 108,
    unitName: '250ml Can',
    unitsPerPack: { unit: 1, pack: 4, box: 12, carton: 24, case: 48 },
    gstRate: 0.28
  },
  tea: {
    name: 'Tata Tea Gold Premium 500g',
    category: 'Beverages & Tea',
    mrp: 320,
    baseCost: 280,
    unitName: '500g Pouch',
    unitsPerPack: { unit: 1, pack: 4, box: 12, carton: 24, case: 48 },
    gstRate: 0.05
  }
};

const TIER_DISCOUNTS = {
  silver: 0.06,   // 6% base SPO discount
  gold: 0.12,     // 12% base SPO discount
  platinum: 0.18  // 18% base SPO discount
};

const UNIT_BULK_BONUS = {
  unit: 0.00,
  pack: 0.02,
  box: 0.04,
  carton: 0.07,
  case: 0.10
};

let currentProductKey = 'atta';
let currentTier = 'gold';
let currentUnit = 'carton';

function initSPOCalculator() {
  const productPills = document.querySelectorAll('.product-pill');
  const tierTabs = document.querySelectorAll('.tier-tab-btn');
  const unitButtons = document.querySelectorAll('.unit-step-btn');

  productPills.forEach(pill => {
    pill.addEventListener('click', () => {
      productPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentProductKey = pill.dataset.product;
      updateSPOCalculations();
    });
  });

  tierTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tierTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTier = tab.dataset.tier;
      updateSPOCalculations();
    });
  });

  unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      unitButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnit = btn.dataset.unit;
      updateSPOCalculations();
    });
  });

  updateSPOCalculations();
}

function updateSPOCalculations() {
  const product = SPO_PRODUCTS[currentProductKey];
  if (!product) return;

  const totalUnits = product.unitsPerPack[currentUnit] || 1;
  const tierDiscount = TIER_DISCOUNTS[currentTier] || 0.06;
  const bulkBonus = UNIT_BULK_BONUS[currentUnit] || 0;
  const totalDiscountRate = tierDiscount + bulkBonus;

  const mrpPerUnit = product.mrp;
  const totalMRP = mrpPerUnit * totalUnits;

  // SPO Price per unit calculation
  const spoPricePerUnit = Math.round(product.baseCost * (1 - totalDiscountRate));
  const totalSPOPrice = spoPricePerUnit * totalUnits;
  
  const totalSavings = totalMRP - totalSPOPrice;
  const retailerMarginPercent = Math.round(((totalMRP - totalSPOPrice) / totalMRP) * 100);

  // Update DOM Elements
  const elTitle = document.getElementById('calc-product-title');
  const elCategory = document.getElementById('calc-product-category');
  const elQtyBadge = document.getElementById('calc-qty-badge');
  const elMrp = document.getElementById('calc-total-mrp');
  const elSpoPrice = document.getElementById('calc-spo-price');
  const elSavings = document.getElementById('calc-total-savings');
  const elUnitSpo = document.getElementById('calc-unit-spo');
  const elMarginPercent = document.getElementById('calc-margin-percent');
  const elMarginBar = document.getElementById('calc-margin-bar');
  const elTierBadge = document.getElementById('calc-tier-badge');

  if (elTitle) elTitle.textContent = product.name;
  if (elCategory) elCategory.textContent = product.category;
  if (elQtyBadge) elQtyBadge.textContent = `${totalUnits} Items (${currentUnit.toUpperCase()})`;
  if (elMrp) elMrp.textContent = `₹${totalMRP.toLocaleString('en-IN')}`;
  if (elSpoPrice) elSpoPrice.textContent = `₹${totalSPOPrice.toLocaleString('en-IN')}`;
  if (elSavings) elSavings.textContent = `₹${totalSavings.toLocaleString('en-IN')}`;
  if (elUnitSpo) elUnitSpo.textContent = `₹${spoPricePerUnit.toLocaleString('en-IN')}`;
  if (elMarginPercent) elMarginPercent.textContent = `${retailerMarginPercent}% Margin`;
  if (elMarginBar) elMarginBar.style.width = `${Math.min(retailerMarginPercent * 3.5, 100)}%`;
  if (elTierBadge) elTierBadge.textContent = `${currentTier.toUpperCase()} TIER (${Math.round(totalDiscountRate * 100)}% OFF)`;
}

document.addEventListener('DOMContentLoaded', initSPOCalculator);
