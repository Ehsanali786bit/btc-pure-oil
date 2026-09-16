/**
 * BTC OILS - Better Taste & Care
 * Central Website Configuration & Contact Settings
 * 
 * NOTE FOR DEVELOPER / CLIENT:
 * To update your official WhatsApp number, Gmail address, phone number,
 * or product prices, simply edit the values below. Everything on the website
 * (buttons, calculators, contact forms, click-to-dial links) updates automatically!
 */

const BTC_CONFIG = {
  // Brand Identity
  brandName: "BTC Oils",
  brandFullName: "Better Taste & Care",
  tagline: "Pure • Natural • Quality — Healthy Oil, Healthy Life.",
  botanicalSource: "Elaeis guineensis (African Oil Palm)",
  countryOfOrigin: "Nigeria",
  
  // Official Contact Channels (Directly matches branding)
  phone: "+234 814 538 6475",
  phoneRaw: "2348145386475", // For tel: links
  
  // WhatsApp Configuration
  // Format: Country code without + or leading zeros (e.g. 2348145386475)
  whatsappNumber: "2348145386475",
  whatsappDefaultGreeting: "Hello BTC Oils, I am contacting you from your website to inquire about your 100% Pure Virgin Red Palm Oil.",
  
  // Official Website & Domain
  websiteUrl: "https://btcpureoil.com",

  // Email & Gmail Configuration (Official Client Gmail)
  email: "btcpureoil@gmail.com",
  emailSubjectPrefix: "[BTC Oils Inquiry]",

  // Physical Location & Depot Details
  depotAddress: "BTC Oils Processing Depot, Palm Belt Region, Nigeria",
  deliveryCoverage: "Nationwide Delivery across Nigeria (Lagos, Abuja, Port Harcourt, Kano, Onitsha, Ibadan) & Export Inquiries",
  operatingHours: "Monday – Saturday: 8:00 AM – 6:00 PM (WAT)",

  // Approximate USD conversion benchmark ($1 USD ≈ ₦1,550 NGN)
  usdExchangeRate: 1550,

  // Product Catalog & Pricing Architecture (in Nigerian Naira - NGN ₦ & USD $)
  // Real client depot & wholesale rates
  products: [
    {
      id: "gallon-5l",
      name: "BTC Premium Red Oil - 5 Litres Gallon",
      size: "5 Litres",
      unitLitres: 5,
      basePrice: 30000,
      usdPrice: 20,
      packaging: "Ergonomic Easy-Pour Gallon",
      idealFor: "Family Kitchens, Weekend Feasts & Small Caterers",
      badge: "Family Gallon",
      image: "assets/images/craft/btc_pure_virgin_oil.jpg"
    },
    {
      id: "keg-10l",
      name: "BTC Premium Red Oil - 10 Litres Gallon",
      size: "10 Litres",
      unitLitres: 10,
      basePrice: 40000,
      usdPrice: 26,
      packaging: "Heavy-Duty Sealed Jerrycan",
      idealFor: "Chefs, Large Households & Boarding Houses",
      badge: "Chef's Choice",
      image: "assets/images/craft/pure_oil_stream.jpg"
    },
    {
      id: "keg-20l",
      name: "BTC Commercial Keg - 20 Litres",
      size: "20 Litres",
      unitLitres: 20,
      basePrice: 57000,
      usdPrice: 37,
      packaging: "Industrial Sealed Yellow Keg",
      idealFor: "Restaurants, Canteens & Local Food Vendors",
      badge: "Caterer Value",
      image: "assets/images/brand/btc_kegs_warehouse.png"
    },
    {
      id: "jerrycan-25l",
      name: "BTC Commercial Yellow Jerrycan - 25 Litres",
      size: "25 Litres",
      unitLitres: 25,
      basePrice: 65000,
      usdPrice: 42,
      packaging: "Industrial Yellow Jerrycan (Tamper-Proof Cap)",
      idealFor: "Commercial Caterers, Hoteliers, Food Processors & Resellers",
      badge: "Commercial Bestseller",
      featured: true,
      image: "assets/images/brand/btc_kegs_warehouse.png"
    },
    {
      id: "keg-30l",
      name: "BTC Jumbo Commercial Keg - 30 Litres",
      size: "30 Litres",
      unitLitres: 30,
      basePrice: 75000,
      usdPrice: 48,
      packaging: "Heavy-Duty Max Capacity Industrial Jerrycan",
      idealFor: "Bulk Wholesale Buyers, Agro Exporters & Large Scale Caterers",
      badge: "Maximum Capacity",
      image: "assets/images/brand/btc_kegs_warehouse.png"
    }
  ],

  // Volume Discount Tiers for Wholesale Calculator
  wholesaleDiscounts: [
    { minLitres: 50, discountPercent: 3, label: "Wholesale Tier 1 (3% Off)" },
    { minLitres: 150, discountPercent: 6, label: "Commercial Tier 2 (6% Off)" },
    { minLitres: 500, discountPercent: 10, label: "Distributor Tier 3 (10% Off)" },
    { minLitres: 1000, discountPercent: 15, label: "Industrial / Export Tier (15% Off)" }
  ],

  // Purity Guarantee & Certifications
  guarantees: [
    "100% Virgin First-Press Elaeis guineensis Oil",
    "Zero Artificial Colorants (Guaranteed Sudan-Dye Free)",
    "Unbleached, Unadulterated & Non-Deodorized",
    "Naturally High in Beta-Carotene (Provitamin A) & Tocotrienols (Vitamin E)",
    "Hygienically Steam-Extracted at Low Free Fatty Acid (FFA) Standard"
  ]
};

// Export to global window scope for modular access across all scripts
window.BTC_CONFIG = BTC_CONFIG;
