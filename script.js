function svgPlaceholder(label, isLogo = false) {
  const text = String(label || 'Menu').replace(/&/g, '&amp;').replace(/[<>]/g, '');
  const short = text.length > 18 ? text.slice(0, 17) + '…' : text;
  const bgFrom = isLogo ? '#C4762A' : '#E4B66D';
  const fg = isLogo ? '#fff' : '#4A2E17';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${bgFrom}"/>
          <stop offset="100%" stop-color="#F6E7C4"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="18" fill="url(#bg)"/>
      <circle cx="150" cy="46" r="30" fill="rgba(255,255,255,0.25)"/>
      <path d="M32 138c24-26 52-38 82-38s58 12 82 38v26H32z" fill="rgba(74,46,23,0.12)"/>
      <text x="100" y="108" text-anchor="middle" fill="${fg}" font-size="18" font-family="Arial, sans-serif" font-weight="700">${short}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

document.querySelectorAll('img[data-label]').forEach((img) => {
  if (!img.getAttribute('src')) {
    const text = img.dataset.label || img.getAttribute('alt') || 'Menu item';
    img.src = svgPlaceholder(text, img.classList.contains('logo'));
  }
});

const links = Array.from(document.querySelectorAll('.tabbar a'));
const sections = links.map(l => document.querySelector(l.getAttribute('href')));
function onScroll(){
  let idx = 0;
  const y = window.scrollY + 100;
  sections.forEach((s,i)=>{ if(s && s.offsetTop <= y) idx = i; });
  links.forEach((l,i)=> l.classList.toggle('active', i===idx));
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

/* ---------------- Recipe data ---------------- */
const RECIPES = {
  'irigu-bath': {
    title: 'Irigu Bath & Lunu Miris',
    ingredients: [
      'Corn rice (irigu)', 'Freshly grated coconut', 'Salt',
      'Onion', 'Tomato', 'Cloves', 'Pepper', 'Maldive fish', 'Chili flakes (optional)', 'Lime'
    ],
    steps: [
      { sub: 'Corn rice', items: [
        'Soak cleaned corn rice overnight in water to soften the grains.',
        'Cook the rice in the same water it soaked in, until fully tender.',
        'Stir in freshly grated coconut once cooked.',
        'Season with salt to taste and mix evenly.'
      ]},
      { sub: 'Lunu Miris', items: [
        'Pound onion, tomato, cloves, pepper, salt, Maldive fish and chili flakes together in a mortar — keep it a little chunky, not a smooth paste.',
        'Squeeze in lime juice at the end and mix.',
        'Traditionally it is not cooked: everything is mixed raw with lime for the freshest flavour.'
      ]},
      { sub: 'Serve', items: ['Serve the warm corn rice hot with lunu miris.'] }
    ],
    benefits: [
      'Corn rice has more fiber than white rice, so it keeps you full longer and is easier to digest.',
      'Gluten-free and gives long-lasting energy.',
      'Coconut adds healthy fats and satisfies with a small amount.',
      'Onion, tomato and lime bring vitamin C and antioxidants.',
      'Pepper and cloves aid digestion and add warmth.',
      'Very little oil is used, and Maldive fish adds protein.',
      'Being spicy means you eat less rice and feel satisfied faster.',
      'A healthier breakfast than bread and dhal — high fiber, no deep frying, and you control the salt.'
    ]
  },
  'thosai-sambar': {
    title: 'Thosai & Sambar',
    ingredients: [
      'Rice', 'Urad dal', 'Fenugreek seeds', 'Salt',
      'Toor dal', 'Tamarind', 'Mixed vegetables', 'Tomato', 'Sambar powder',
      'Mustard seeds', 'Curry leaves', 'Dry chili', 'Oil'
    ],
    steps: [
      { sub: 'Dosa', items: [
        'Wash rice and dal separately; soak together with fenugreek for 5–6 hours.',
        'Grind the dal first to a fluffy paste, then the rice to a slightly coarse paste; mix both and add salt.',
        'Cover and let the batter rest 8–12 hours (overnight) to ferment — it will rise and turn slightly sour.',
        'Thin with a little water to a pourable, pancake-like consistency.',
        'Heat a non-stick pan with a few drops of oil, pour a ladle of batter, and spread in a spiral from the centre outward.',
        'Cook on medium heat until golden and crisp on one side — thin dosas don\'t need flipping.'
      ]},
      { sub: 'Sambar', items: [
        'Cook toor dal with turmeric and water until soft, then mash.',
        'Soak tamarind in warm water and squeeze out the juice.',
        'Cook chopped vegetables in water; once half-cooked, add tomato, sambar powder and salt.',
        'Stir in the mashed dal and tamarind juice; boil for 5–7 minutes.',
        'Temper: heat oil, add mustard seeds, curry leaves and dry chili, then pour over the sambar and mix.'
      ]}
    ],
    benefits: [
      'Dosa: fermentation aids gut digestion and makes it easy to digest.',
      'Dosa: low fat — not deep-fried like roti or paratha.',
      'Dosa: urad dal adds plant protein and iron.',
      'Dosa: gluten-free when made with just rice and dal.',
      'Sambar: toor dal is high in protein and fiber.',
      'Sambar: vegetables and tamarind add vitamins and antioxidants.',
      'Sambar: turmeric, mustard seeds and curry leaves aid digestion.',
      'Sambar: a very low-oil meal that keeps you full without feeling heavy.'
    ]
  },
  'watalappan': {
    title: 'Watalappan',
    ingredients: [
      'Kithul jaggery', 'Water', 'Eggs', 'Thick coconut milk',
      'Cardamom', 'Clove or nutmeg', 'Vanilla', 'Salt', 'Cashews'
    ],
    steps: [
      { sub: 'Melt the jaggery', items: [
        'Add chopped jaggery with 1/4 cup water to a pan; heat on low until fully melted with no lumps.',
        'Let it cool completely, then strain to remove any dirt.'
      ]},
      { sub: 'Make the custard mix', items: [
        'Beat the eggs gently with a fork — don\'t whip them too foamy.',
        'Add thick coconut milk, the melted jaggery, cardamom, clove or nutmeg, vanilla and salt; mix well.',
        'Strain again through a fine strainer until very smooth.'
      ]},
      { sub: 'Steam (not bake)', items: [
        'Pour into small bowls or one large heat-proof bowl; sprinkle cashews on top.',
        'Cover tightly with foil.',
        'Steam for 45–60 minutes — in a steamer, or with the bowl set inside a pot of water reaching halfway up the sides, covered.',
        'Check with a toothpick: it should come out clean. It will be jiggly when hot and firm once cool.',
        'Cool completely and chill for at least 2 hours before serving — it tastes best cold.'
      ]}
    ],
    benefits: [
      'Kithul jaggery has more iron and minerals than white sugar, and a lower glycemic index.',
      'Coconut milk provides good fats and energy.',
      'Eggs add protein and vitamins.',
      'Cardamom, clove and nutmeg aid digestion.',
      'No flour, baking powder or oil — steamed, so lighter than fried sweets.',
      'It\'s rich, so enjoy one small piece after a meal; those with diabetes should be mindful of the jaggery.'
    ]
  },
  'potato-chips': {
    title: 'Potato Chips (Kartoffelchips)',
    ingredients: ['Potatoes', 'Oil', 'Salt', 'Pepper or other seasonings (optional)'],
    steps: [
      { items: [
        'Wash the potatoes and cut them into very thin slices.',
        'Remove excess water from the slices, then fry in oil until crispy.',
        'Add salt and any other seasonings.',
        'They can also be baked with less oil for a lighter version.'
      ]}
    ],
    benefits: [
      'Potatoes provide carbohydrates, which give energy.',
      'They contain minerals such as potassium.',
      'Regular chips can be high in oil and salt, so eat in moderation.',
      'Baking with less oil and salt makes them a healthier option.'
    ]
  },
  'potato-pancake': {
    title: 'Potato Pancake (Kartoffelpuffer)',
    ingredients: ['Potatoes', 'Onion', 'Eggs', 'Flour', 'Salt', 'Pepper', 'Oil for frying'],
    steps: [
      { items: [
        'Grate the potatoes and onion.',
        'Mix them with eggs, flour, salt and pepper.',
        'Form small, flat pancakes from the mixture.',
        'Fry in oil until golden brown and crispy on both sides.'
      ]}
    ],
    benefits: [
      'Potatoes provide carbohydrates for energy.',
      'They contain nutrients such as potassium and vitamin C.',
      'Eggs provide protein, important for the body.',
      'Because they\'re fried in oil, eat in moderation.'
    ]
  },
  'sausage-board': {
    title: 'Sausage Board (Pretzel)',
    ingredients: ['Flour', 'Dry yeast', 'Sugar', 'Salt', 'Butter', 'Warm water', 'Baking soda', 'Coarse salt', 'Egg (for egg wash)'],
    steps: [
      { sub: 'Make the dough', items: [
        'Mix warm water, sugar and dry yeast in a bowl; leave 5 minutes until foamy.',
        'Add flour, salt and melted butter; knead 7–8 minutes until soft, not sticky.',
        'Cover and let rise for about 1 hour, until doubled in size.'
      ]},
      { sub: 'Shape the pretzels', items: [
        'Divide the dough into pieces.',
        'Roll each piece into a long rope, about 20 inches.',
        'Form a U-shape, twist the two ends together twice, then fold them back onto the bottom of the U and press to seal.'
      ]},
      { sub: 'Baking soda bath', items: [
        'Bring water to a boil and add baking soda.',
        'Dip each pretzel in the boiling water for about 20–30 seconds, then remove — this gives the classic brown colour and chewy crust.'
      ]},
      { sub: 'Bake', items: [
        'Place on a baking tray lined with paper; brush with beaten egg.',
        'Sprinkle with coarse salt.',
        'Bake at 200–220°C (425°F) for 12–15 minutes, until dark golden brown.',
        'Cool slightly before serving.'
      ]}
    ],
    benefits: [
      'Low in fat — baked, not deep-fried.',
      'Flour and sugar give a quick source of carbohydrate energy.',
      'Using whole wheat flour adds more fiber.',
      'Homemade means no preservatives, and you control the salt and butter.',
      'Best enjoyed with hummus, peanut butter or a yogurt dip rather than eating too many salty ones alone.'
    ]
  },
  'banana-cake': {
    title: 'Banana Cake',
    ingredients: ['Ripe bananas', 'Melted butter or oil', 'Sugar', 'Eggs', 'Milk', 'Vanilla', 'Flour', 'Baking powder', 'Salt', 'Cinnamon'],
    steps: [
      { sub: 'Prepare', items: [
        'Preheat the oven to 175°C (350°F).',
        'Grease a cake pan with a little butter and flour.'
      ]},
      { sub: 'Mix wet ingredients', items: [
        'Mash the ripe bananas well with a fork.',
        'Add melted butter or oil, sugar, eggs, milk and vanilla; mix well.'
      ]},
      { sub: 'Mix dry ingredients', items: [
        'In another bowl, mix flour, baking powder, salt and cinnamon.'
      ]},
      { sub: 'Combine & bake', items: [
        'Add the dry mix to the wet mix slowly; mix just until no dry flour remains — over-mixing makes the cake hard.',
        'Pour the batter into the pan.',
        'Bake for 35–45 minutes.',
        'Check with a toothpick — if it comes out clean, it\'s done.',
        'Let it cool for 10 minutes before cutting.'
      ]}
    ],
    benefits: [
      'High in potassium — good for heart and muscles.',
      'Fiber helps digestion.',
      'Gives quick, natural energy.',
      'Contains Vitamin B6.',
      'Uses real fruit with fewer preservatives than store-bought cakes.',
      'Cinnamon helps control blood sugar spikes.'
    ]
  }
};

/* ---------------- Recipe modal behavior ---------------- */
const modal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalSteps = document.getElementById('modal-steps');
const modalBenefits = document.getElementById('modal-benefits');
const modalClose = document.getElementById('modal-close');
let lastFocused = null;

function openRecipe(slug){
  const data = RECIPES[slug];
  if (!data) return;

  modalTitle.textContent = data.title;

  modalIngredients.innerHTML = '';
  data.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    modalIngredients.appendChild(li);
  });

  modalSteps.innerHTML = '';
  data.steps.forEach(group => {
    if (group.sub) {
      const heading = document.createElement('li');
      heading.style.listStyle = 'none';
      heading.style.marginLeft = '-20px';
      const strong = document.createElement('strong');
      strong.className = 'sub';
      strong.textContent = group.sub;
      heading.appendChild(strong);
      modalSteps.appendChild(heading);
    }
    group.items.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      modalSteps.appendChild(li);
    });
  });

  modalBenefits.innerHTML = '';
  data.benefits.forEach(b => {
    const li = document.createElement('li');
    li.textContent = b;
    modalBenefits.appendChild(li);
  });

  lastFocused = document.activeElement;
  modal.hidden = false;
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeRecipe(){
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.card[data-recipe]').forEach(card => {
  card.addEventListener('click', () => openRecipe(card.dataset.recipe));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openRecipe(card.dataset.recipe);
    }
  });
});

modalClose.addEventListener('click', closeRecipe);
modal.addEventListener('click', (e) => { if (e.target === modal) closeRecipe(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeRecipe();
});