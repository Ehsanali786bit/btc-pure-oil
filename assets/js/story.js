/**
 * BTC OILS - Storytelling & Interactive Features Controller
 * Handles Purity Inspector Slider & Culinary Flavor Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
  initPuritySlider();
  initCulinaryExplorer();
});

/**
 * Interactive Purity Comparison Slider (Mouse & Touch)
 */
function initPuritySlider() {
  const container = document.querySelector('.slider-wrapper');
  const afterImage = document.querySelector('.slider-image-after');
  const handle = document.querySelector('.slider-handle');

  if (!container || !afterImage || !handle) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Constrain percentage between 5% and 95%
    percentage = Math.max(5, Math.min(95, percentage));

    afterImage.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events for mobile phones
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/**
 * Nigerian Culinary Artistry & Food Pairing Explorer
 */
const CULINARY_DISHES = [
  {
    id: "banga",
    name: "Authentic Delta Banga Soup (Ofe Akwu)",
    desc: "The crown jewel of Niger Delta cuisine. BTC Virgin Red Palm Oil infuses fresh catfish, dried fish, and local spices (oburunbebe stick, beletete) with an intoxicating natural nutty aroma and deep crimson warmth that cannot be replicated with ordinary oil.",
    heritageNote: "Traditionally savored with hot yellow starch or pounded yam in Delta and Edo states.",
    image: "assets/images/dishes/banga_soup_dish.jpg"
  },
  {
    id: "jollof",
    name: "Traditional Village Native Jollof (Iwuk Edesi)",
    desc: "Infused with smoked fish, crayfish, dry prawns, and indigenous scent leaves. BTC unrefined red palm oil coats every grain of rice with natural beta-carotene sweetness, giving it a smoky, rich West African village flavor.",
    heritageNote: "A revered party centerpiece across Cross River, Akwa Ibom, and Southern Nigeria.",
    image: "assets/images/dishes/native_jollof_dish.jpg"
  },
  {
    id: "egusi",
    name: "Classic Nigerian Egusi & Bitterleaf Soup",
    desc: "Fried melon seeds slowly bloomed in pure BTC red oil release essential lipids and vitamins. The rich ruby palm oil tenderizes beef and stockfish while balancing the medicinal herbal notes of bitterleaf or fluted pumpkin (ugu).",
    heritageNote: "A powerhouse of healthy fats, protein, and natural antioxidant Vitamin E.",
    image: "assets/images/dishes/egusi_soup_dish.jpg"
  },
  {
    id: "asaro",
    name: "Smoky Yam Porridge (Asaro) & Akara",
    desc: "Sweet white puna yams slow-cooked in aromatic BTC virgin oil with habanero peppers, onions, and dried catfish. For breakfast, BTC oil crisps bean fritters (Akara) to a golden crunch while keeping the inside light and fluffy.",
    heritageNote: "High smoke point ensures clean frying without burning or bitter chemical aftertastes.",
    image: "assets/images/dishes/asaro_yam_porridge.jpg"
  }
];

function initCulinaryExplorer() {
  const tabButtons = document.querySelectorAll('.culinary-tab-btn');
  const dishImageBox = document.querySelector('.culinary-image-box img');
  const dishTitle = document.querySelector('.culinary-display-title');
  const dishDescription = document.querySelector('.culinary-display-desc');
  const dishHeritage = document.querySelector('.culinary-heritage-tag');
  const dishCounter = document.querySelector('.culinary-dish-counter');
  const btnPrev = document.querySelector('.culinary-nav-btn.prev');
  const btnNext = document.querySelector('.culinary-nav-btn.next');

  if (!tabButtons.length) return;

  let currentIndex = 0;

  function setDish(index, shouldScrollMobile = false) {
    if (index < 0) index = CULINARY_DISHES.length - 1;
    if (index >= CULINARY_DISHES.length) index = 0;
    currentIndex = index;

    const dishData = CULINARY_DISHES[currentIndex];
    if (!dishData) return;

    // Update active tab button
    tabButtons.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('active');
      }
    });

    // Animate and switch image
    if (dishImageBox) {
      dishImageBox.style.opacity = '0.2';
      dishImageBox.style.transform = 'scale(0.97)';
      setTimeout(() => {
        dishImageBox.src = dishData.image;
        dishImageBox.alt = dishData.name;
        dishImageBox.style.opacity = '1';
        dishImageBox.style.transform = 'scale(1)';
      }, 180);
    }

    // Switch text
    if (dishTitle) dishTitle.textContent = dishData.name;
    if (dishDescription) dishDescription.textContent = dishData.desc;
    if (dishHeritage) dishHeritage.textContent = dishData.heritageNote;
    if (dishCounter) dishCounter.textContent = `${currentIndex + 1} of ${CULINARY_DISHES.length}`;

    // On mobile, if user tapped a tab, keep the showcase card visible
    if (shouldScrollMobile && window.innerWidth <= 768) {
      const showcase = document.querySelector('.culinary-showcase');
      if (showcase) {
        const rect = showcase.getBoundingClientRect();
        if (rect.top < 60 || rect.top > 300) {
          showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  // Click on tabs
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      setDish(index, true);
    });
  });

  // Prev / Next arrows
  btnPrev?.addEventListener('click', () => {
    setDish(currentIndex - 1, true);
  });

  btnNext?.addEventListener('click', () => {
    setDish(currentIndex + 1, true);
  });
}
