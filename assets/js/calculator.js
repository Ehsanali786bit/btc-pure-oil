/**
 * BTC OILS - Bulk Order & Wholesale Price Calculator
 * Computes volumes, volume tier discounts, and builds one-tap WhatsApp / Email POs
 */

document.addEventListener('DOMContentLoaded', () => {
  initBulkCalculator();
  initCatalogWhatsAppButtons();
});

/**
 * Main Calculator Logic (Simple & Functional)
 */
function initBulkCalculator() {
  const selectProduct = document.getElementById('calc-product-select');
  const inputQuantity = document.getElementById('calc-quantity-input');
  const btnQtyMinus = document.getElementById('calc-qty-minus');
  const btnQtyPlus = document.getElementById('calc-qty-plus');
  const inputDeliveryLocation = document.getElementById('calc-delivery-location');

  const displayTotalLitres = document.getElementById('calc-total-litres');
  const displayUnitPrice = document.getElementById('calc-unit-price');
  const discountRow = document.getElementById('calc-discount-row');
  const displayDiscountLabel = document.getElementById('calc-discount-label');
  const displayEstimatedTotal = document.getElementById('calc-estimated-total');

  const btnSendWhatsApp = document.getElementById('calc-btn-whatsapp');
  const btnSendEmail = document.getElementById('calc-btn-email');

  if (!selectProduct || !inputQuantity) return;

  // Populate product dropdown with clear, easy-to-read options
  if (window.BTC_CONFIG && window.BTC_CONFIG.products) {
    selectProduct.innerHTML = '';
    window.BTC_CONFIG.products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      let label = `${p.size} — ₦${formatNaira(p.basePrice)} (~$${p.usdPrice} USD)`;
      if (p.id === 'jerrycan-25l') label = `25L Keg (₦65,000 / ~$42 USD) ★ Commercial Bestseller`;
      else if (p.id === 'keg-30l') label = `30L Keg (₦75,000 / ~$48 USD) - Jumbo Max`;
      else if (p.id === 'keg-20l') label = `20L Keg (₦57,000 / ~$37 USD) - Caterer Choice`;
      else if (p.id === 'keg-10l') label = `10L Gallon (₦40,000 / ~$26 USD) - Chef Pack`;
      else if (p.id === 'gallon-5l') label = `5L Gallon (₦30,000 / ~$20 USD) - Family Gallon`;

      opt.textContent = label;
      if (p.featured) opt.selected = true;
      selectProduct.appendChild(opt);
    });
  }

  function getSelectedProduct() {
    const selectedId = selectProduct.value;
    return window.BTC_CONFIG.products.find(p => p.id === selectedId) || window.BTC_CONFIG.products[0];
  }

  function recalculate() {
    const product = getSelectedProduct();
    let quantity = parseInt(inputQuantity.value, 10);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    if (quantity > 1000) quantity = 1000;
    inputQuantity.value = quantity;

    let unitName = 'kegs';
    if (product.unitLitres === 5 || product.unitLitres === 10) {
      unitName = quantity > 1 ? 'gallons' : 'gallon';
    } else {
      unitName = quantity > 1 ? 'kegs' : 'keg';
    }

    const rate = (window.BTC_CONFIG && window.BTC_CONFIG.usdExchangeRate) || 1550;
    const unitUsd = product.usdPrice || Math.round(product.basePrice / rate);

    const totalLitres = quantity * product.unitLitres;
    if (displayTotalLitres) displayTotalLitres.textContent = `${formatNumber(totalLitres)} Litres`;
    if (displayUnitPrice) {
      displayUnitPrice.innerHTML = `₦${formatNaira(product.basePrice)} <small class="product-price-usd" style="display:inline; margin-left:4px;">(~$${unitUsd} USD)</small>`;
    }

    const rawTotal = quantity * product.basePrice;

    // Wholesale discounts based on total volume
    let discountPercent = 0;
    if (window.BTC_CONFIG && window.BTC_CONFIG.wholesaleDiscounts) {
      for (const tier of window.BTC_CONFIG.wholesaleDiscounts) {
        if (totalLitres >= tier.minLitres) {
          discountPercent = tier.discountPercent;
        }
      }
    }

    const discountAmount = Math.round(rawTotal * (discountPercent / 100));
    const estimatedTotal = rawTotal - discountAmount;
    const estimatedUsd = Math.round(estimatedTotal / rate);

    if (discountRow && displayDiscountLabel) {
      if (discountPercent > 0) {
        discountRow.style.display = 'flex';
        displayDiscountLabel.textContent = `${discountPercent}% Applied (-₦${formatNaira(discountAmount)})`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    const displayEstimatedUsd = document.getElementById('calc-estimated-usd');
    if (displayEstimatedTotal) {
      displayEstimatedTotal.textContent = `₦${formatNaira(estimatedTotal)}`;
    }
    if (displayEstimatedUsd) {
      displayEstimatedUsd.textContent = `(~$${formatNumber(estimatedUsd)} USD)`;
    }

    const locationText = inputDeliveryLocation ? (inputDeliveryLocation.value.trim() || "Within Nigeria") : "Within Nigeria";

    return {
      product,
      quantity,
      unitName,
      unitUsd,
      totalLitres,
      discountPercent,
      discountAmount,
      estimatedTotal,
      estimatedUsd,
      location: locationText
    };
  }

  // Stepper buttons
  btnQtyMinus?.addEventListener('click', () => {
    let current = parseInt(inputQuantity.value, 10) || 1;
    if (current > 1) {
      inputQuantity.value = current - 1;
      recalculate();
    }
  });

  btnQtyPlus?.addEventListener('click', () => {
    let current = parseInt(inputQuantity.value, 10) || 1;
    if (current < 1000) {
      inputQuantity.value = current + 1;
      recalculate();
    }
  });

  // Input events
  selectProduct?.addEventListener('change', recalculate);
  inputQuantity?.addEventListener('input', recalculate);
  inputDeliveryLocation?.addEventListener('input', recalculate);

  // WhatsApp Order Submission
  btnSendWhatsApp?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = recalculate();

    const discountInfo = data.discountPercent > 0 ? `• *Wholesale Discount:* ${data.discountPercent}% off (-₦${formatNaira(data.discountAmount)})\n` : '';

    const message = 
`👑 *BTC OILS - PURCHASE ORDER INQUIRY*
---------------------------------------
• *Product:* ${data.product.name}
• *Quantity:* ${data.quantity} ${data.unitName} (${formatNumber(data.totalLitres)} Litres)
• *Unit Price:* ₦${formatNaira(data.product.basePrice)} (~$${data.unitUsd} USD)
${discountInfo}• *Estimated Total:* ₦${formatNaira(data.estimatedTotal)} (~$${formatNumber(data.estimatedUsd)} USD)
• *Delivery Destination:* ${data.location}
---------------------------------------
Hello BTC Oils! Please confirm real-time stock availability, delivery schedule, and bank/export payment details.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${window.BTC_CONFIG.whatsappNumber}?text=${encoded}`;

    if (window.showToast) window.showToast("Opening WhatsApp with your order...");
    window.open(whatsappUrl, '_blank');
  });

  // Email / Quotation Submission
  btnSendEmail?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = recalculate();

    const subject = `[Order Quotation] ${data.quantity}x ${data.product.name} (${data.totalLitres}L)`;
    const body = 
`Dear BTC Oils Sales Team,

I would like to request an official proforma invoice for:

- Product: ${data.product.name} (${data.product.size})
- Quantity: ${data.quantity} ${data.unitName}
- Total Volume: ${formatNumber(data.totalLitres)} Litres
- Unit Price: ₦${formatNaira(data.product.basePrice)} (~$${data.unitUsd} USD)
- Estimated Subtotal: ₦${formatNaira(data.estimatedTotal)} (~$${formatNumber(data.estimatedUsd)} USD)
- Delivery City: ${data.location}

Please reply with availability and payment details.

Thank you.`;

    if (typeof window.launchEmailComposer === 'function') {
      window.launchEmailComposer(window.BTC_CONFIG.email, subject, body);
    } else {
      const encSubject = encodeURIComponent(subject);
      const encBody = encodeURIComponent(body);
      window.location.href = `mailto:${window.BTC_CONFIG.email}?subject=${encSubject}&body=${encBody}`;
    }
  });

  // Initial calculation
  recalculate();
}

/**
 * Binds 1-Click WhatsApp buttons across all catalog product cards
 */
function initCatalogWhatsAppButtons() {
  document.querySelectorAll('.btn-product-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-id');
      const product = window.BTC_CONFIG.products.find(p => p.id === productId);
      if (!product) return;

      const rate = (window.BTC_CONFIG && window.BTC_CONFIG.usdExchangeRate) || 1550;
      const usdVal = product.usdPrice || Math.round(product.basePrice / rate);

      const message = 
`👋 *Hello BTC Oils!*
I would like to order:
• *Product:* ${product.name} (${product.size})
• *Price:* ₦${formatNaira(product.basePrice)} (~$${usdVal} USD)
• *Packaging:* ${product.packaging}

Please let me know how many units are in stock and delivery options to my location.`;

      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${window.BTC_CONFIG.whatsappNumber}?text=${encoded}`;

      window.showToast(`Connecting to WhatsApp for ${product.name}...`);
      window.open(url, '_blank');
    });
  });
}

function formatNaira(num) {
  return (num || 0).toLocaleString('en-NG');
}

function formatNumber(num) {
  return (num || 0).toLocaleString('en-US');
}
