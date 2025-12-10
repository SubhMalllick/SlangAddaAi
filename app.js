// ----------------------
// Slang Data
// ----------------------
const SLANGS = [
  {
    id: "adulting",
    word: "Adulting",
    lang: "en",
    category: "life",
    officeSafe: "yes", // yes / caution / no
    explicit: false,
    meaning: {
      hinglish:
        "Adulting ka matlab hai woh saare boring but important kaam jo bade log karte hain – bills pay karna, kaam pe time se jaana, ghar manage karna, doctor check-up, etc.",
      en: "Doing responsible grown-up tasks like paying bills, working, managing a home – especially when it feels strange that you are the adult now.",
      hi: "बड़ों जैसी ज़िम्मेदारियाँ निभाना – जैसे बिल भरना, ऑफ़िस जाना, घर संभालना आदि।"
    },
    example: {
      hinglish:
        "“Kal raat party nahi gayi, pura din adulting hi chal raha tha – rent, laundry, sab.”",
      en: '"Couldn’t go to the party last night, I was busy adulting – rent, laundry, everything."'
    },
    origin:
      "Millennial internet slang, popular on Instagram & Twitter for describing everyday responsibilities."
  },
  {
    id: "doomscrolling",
    word: "Doomscrolling",
    lang: "en",
    category: "life",
    officeSafe: "yes",
    explicit: false,
    meaning: {
      hinglish:
        "Doomscrolling matlab raat ko ya free time mein social media ya news apps pe itna scroll karna ki sirf negative ya heavy content dekhte jao aur mood down ho jaye.",
      en: "Endlessly scrolling through negative news or content, often late at night, and feeling mentally exhausted afterwards."
    },
    example: {
      hinglish:
        "“11 baje phone rakha tha, phir doomscrolling start ho gayi aur pata hi nahi chala 1:30 ho gaya.”"
    },
    origin: "Rose during pandemic times when news feeds felt constantly negative."
  },
  {
    id: "fomo",
    word: "FOMO",
    lang: "en",
    category: "life",
    officeSafe: "yes",
    explicit: false,
    meaning: {
      hinglish:
        "FOMO – Fear Of Missing Out. Jab lagta hai ki koi fun ya important cheez ho rahi hai jisme tum nahi ho, aur uska tension feel hota hai.",
      en: "Fear of missing out on something fun or important that others are doing."
    },
    example: {
      hinglish:
        "“Main actually trip pe jaana nahi chahta, bas FOMO ho raha hai sab ja rahe hain.”"
    },
    origin:
      "Popular internet acronym; widely used in social life, investing and career decisions."
  },
  {
    id: "ghosting",
    word: "Ghosting",
    lang: "en",
    category: "internet",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "Ghosting tab hota hai jab koi achanak reply karna completely band kar de – na message, na call, zero explanation.",
      en: "When someone suddenly stops responding without any explanation – in dating, hiring, sales or friendships."
    },
    example: {
      hinglish:
        "“Candidate interested lag raha tha, offer ke baad completely ghosting.”"
    },
    origin:
      "Dating app culture; later adopted in work & hiring conversations."
  },
  {
    id: "vibecheck",
    word: "Vibe check",
    lang: "en",
    category: "life",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "Vibe check matlab quick mood test – banda ya situation positive feel ho raha hai ya off lag raha hai.",
      en: "A quick test of the mood or energy of a person or situation – does it feel good, off, tense, etc.?"
    },
    example: {
      hinglish:
        "“Launch se pehle ek quick vibe check kar lete hain team ke saath.”"
    },
    origin: "Social media & meme culture; now used in workplaces and friend groups."
  },
  {
    id: "jugaad",
    word: "Jugaad",
    lang: "hi",
    category: "desi",
    officeSafe: "yes",
    explicit: false,
    meaning: {
      hinglish:
        "Jugaad ek Indian word hai – limited resources mein smart, creative hack se kaam chala lena.",
      en: "A clever low-cost workaround or hack using limited resources.",
      hi: "सीमित साधनों से रचनात्मक तरीके से काम निकाल लेना।"
    },
    example: {
      hinglish: "“Yeh portable stand pura jugaad aur dedication ka result hai.”"
    },
    origin:
      "Common Hindi word, celebrated in Indian startup and management culture."
  },
  {
    id: "scenekyahai",
    word: "Scene kya hai",
    lang: "hi",
    category: "desi",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "“Scene kya hai” ka matlab hota hai – overall plan ya situation kya chal rahi hai, party ho, drama ho, ya trip.",
      en: 'Casual way of asking, "What\'s the plan / situation?"'
    },
    example: {
      hinglish: "“Kal office ke baad kuch scene hai ya seedha ghar?”"
    },
    origin: "Bollywood, college culture and Indian meme pages."
  },
  {
    id: "op",
    word: "OP",
    lang: "hi",
    category: "internet",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "OP ka matlab hota hai “overpowered” – jab kuch ya koi itna accha ho ki next-level lage.",
      en: "Short for “overpowered” – used to praise something as extremely good or strong."
    },
    example: {
      hinglish: "“Tumhara pitch deck OP tha, clients ko bohot pasand aaya.”"
    },
    origin: "Gaming language; now common in Indian YouTube & meme slang."
  },
  {
    id: "launda",
    word: "Launda",
    lang: "bhojpuri",
    category: "desi",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "North India/Bhojpuri slang for young guy. Doston ke beech casual ho sakta hai, lekin strangers ke saath thoda rude lag sakta hai.",
      en: "North Indian/Bhojpuri slang for a young guy; friendly among friends, but can sound crude with strangers."
    },
    example: {
      hinglish: "“Woh launda mast gaata hai.”"
    },
    origin: "Bhojpuri & North Indian youth slang, cinema & music."
  },
  {
    id: "item",
    word: "Item",
    lang: "hi",
    category: "internet",
    officeSafe: "no",
    explicit: true,
    meaning: {
      hinglish:
        "Kisi (mostly ladki) ke liye objectifying tareeke se use hota hai – casual lag sakta hai, par kaafi disrespectful bhi ho sakta hai.",
      en: "A word used to describe someone (often a woman) in an objectifying way; can be sexist or disrespectful."
    },
    example: {
      hinglish: "“Woh naya item kaun hai yaar?”"
    },
    origin: "Bollywood songs & casual speech; now criticised for being sexist."
  },
  {
    id: "locha",
    word: "Locha",
    lang: "mr",
    category: "desi",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "Locha matlab problem ya complication – jab lagta hai ki kuch gड़बड़ hai.",
      en: "Mumbai/Gujarati-influenced slang for a problem or complication."
    },
    example: {
      hinglish: "“Yahan kuch locha lag raha hai, dobara check karte hain.”"
    },
    origin: "Mumbai slang, popularised by Bollywood."
  },
  {
    id: "machaa",
    word: "Machaa",
    lang: "ta",
    category: "desi",
    officeSafe: "caution",
    explicit: false,
    meaning: {
      hinglish:
        "Tamil slang for close friend – jaise ‘bro’ ya ‘dude’. Doston ke saath friendly, lekin elders ke saath casual lag sakta hai.",
      en: "Tamil slang used like “bro” or “dude” for a close friend."
    },
    example: {
      hinglish: "“Machaa, aaj shaam ko free hai kya?”"
    },
    origin: "Tamil college culture & movies."
  }
];

// ----------------------
// State & Storage Helpers
// ----------------------
const STORAGE_KEYS = {
  USER: "sa_user",
  SETTINGS_PREFIX: "sa_settings_",
  FAVS_PREFIX: "sa_favs_",
  RECENT_PREFIX: "sa_recent_"
};

let currentUser = null;
let settings = {
  explainLang: "hinglish",
  voiceGender: "neutral",
  showNsfwLink: true
};
let favourites = [];
let recentSearches = [];
let nsfwViewsCount = 0;

// ----------------------
// DOM References
// ----------------------
const tabButtons = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");

// Dictionary
const searchInput = document.getElementById("searchInput");
const translateSelect = document.getElementById("translateSelect");
const slangLangSelect = document.getElementById("slangLangSelect");
const categorySelect = document.getElementById("categorySelect");
const officeSafeOnlyCheckbox = document.getElementById("officeSafeOnly");
const resultsEl = document.getElementById("results");
const nsfwResultsEl = document.getElementById("nsfwResults");

// Activity
const activityRecentEl = document.getElementById("activityRecent");
const activityFavouritesEl = document.getElementById("activityFavourites");
const recentSearchSection = document.getElementById("recentSearchSection");
const recentSearchList = document.getElementById("recentSearchList");

// Quiz
const startQuizBtn = document.getElementById("startQuizBtn");
const quizQuestionEl = document.getElementById("quizQuestion");
const quizOptionsEl = document.getElementById("quizOptions");
const quizScoreEl = document.getElementById("quizScore");

// Settings
const defaultExplainSelect = document.getElementById("defaultExplainSelect");
const voiceGenderSelect = document.getElementById("voiceGenderSelect");
const showNsfwLinkCheckbox = document.getElementById("showNsfwLink");
const clearDataBtn = document.getElementById("clearDataBtn");
const logoutBtn = document.getElementById("logoutBtn");

// User & modal
const userGreetingEl = document.getElementById("userGreeting");
const loginOpenBtn = document.getElementById("loginOpenBtn");
const loginModal = document.getElementById("loginModal");
const loginNameInput = document.getElementById("loginName");
const loginEmailInput = document.getElementById("loginEmail");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const loginSkipBtn = document.getElementById("loginSkipBtn");

// Premium modal
const premiumModal = document.getElementById("premiumModal");
const premiumEmailInput = document.getElementById("premiumEmail");
const premiumNotifyBtn = document.getElementById("premiumNotifyBtn");
const premiumCloseBtn = document.getElementById("premiumCloseBtn");
const premiumMsg = document.getElementById("premiumMsg");

// ----------------------
// Utility Functions
// ----------------------
function getUserSettingsKey() {
  if (!currentUser || !currentUser.email) return STORAGE_KEYS.SETTINGS_PREFIX + "guest";
  return STORAGE_KEYS.SETTINGS_PREFIX + currentUser.email;
}

function getUserFavsKey() {
  if (!currentUser || !currentUser.email) return STORAGE_KEYS.FAVS_PREFIX + "guest";
  return STORAGE_KEYS.FAVS_PREFIX + currentUser.email;
}

function getUserRecentKey() {
  if (!currentUser || !currentUser.email) return STORAGE_KEYS.RECENT_PREFIX + "guest";
  return STORAGE_KEYS.RECENT_PREFIX + currentUser.email;
}

function saveState() {
  if (currentUser) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
  localStorage.setItem(getUserSettingsKey(), JSON.stringify(settings));
  localStorage.setItem(getUserFavsKey(), JSON.stringify(favourites));
  localStorage.setItem(getUserRecentKey(), JSON.stringify(recentSearches));
}

function loadState() {
  try {
    const userRaw = localStorage.getItem(STORAGE_KEYS.USER);
    if (userRaw) {
      currentUser = JSON.parse(userRaw);
    }
  } catch {
    currentUser = null;
  }
  try {
    const sRaw = localStorage.getItem(getUserSettingsKey());
    if (sRaw) {
      settings = { ...settings, ...JSON.parse(sRaw) };
    }
  } catch {
    // ignore
  }
  try {
    const fRaw = localStorage.getItem(getUserFavsKey());
    favourites = fRaw ? JSON.parse(fRaw) : [];
  } catch {
    favourites = [];
  }
  try {
    const rRaw = localStorage.getItem(getUserRecentKey());
    recentSearches = rRaw ? JSON.parse(rRaw) : [];
  } catch {
    recentSearches = [];
  }
}

// ----------------------
// Rendering helpers
// ----------------------
function renderUserGreeting() {
  if (currentUser && currentUser.name) {
    userGreetingEl.textContent = `Hi, ${currentUser.name}`;
  } else {
    userGreetingEl.textContent = "Hi, Guest";
  }
}

function officeSafeBadge(safe) {
  if (safe === "yes") {
    return `<span class="badge-office-safe">Office-safe ✅</span>`;
  }
  if (safe === "caution") {
    return `<span class="badge-office-caution">Use with caution ⚠</span>`;
  }
  return `<span class="badge-office-no">Not office-safe ❌</span>`;
}

function langTagLabel(lang) {
  switch (lang) {
    case "hi":
      return "Hinglish / Hindi";
    case "en":
      return "English / Global";
    case "ta":
      return "Tamil";
    case "mr":
      return "Marathi";
    case "bhojpuri":
      return "Bhojpuri";
    default:
      return "Mixed";
  }
}

function getMeaningInLang(item, langKey) {
  if (item.meaning[langKey]) return item.meaning[langKey];
  if (item.meaning.hinglish) return item.meaning.hinglish;
  return Object.values(item.meaning)[0] || "";
}

function getExampleInLang(item, langKey) {
  if (item.example && item.example[langKey]) return item.example[langKey];
  if (item.example && item.example.hinglish) return item.example.hinglish;
  const vals = item.example ? Object.values(item.example) : [];
  return vals[0] || "";
}

function matchesFilters(item, filters) {
  const { text, slangLang, category, officeSafeOnly } = filters;
  if (officeSafeOnly && item.officeSafe === "no") return false;
  if (slangLang !== "all" && item.lang !== slangLang) return false;
  if (category !== "all" && item.category !== category) return false;
  if (!text) return true;
  const t = text.toLowerCase();
  const meaningTxt = getMeaningInLang(item, settings.explainLang).toLowerCase();
  return (
    item.word.toLowerCase().includes(t) ||
    meaningTxt.includes(t)
  );
}

function renderCards(container, data, { mode = "normal" } = {}) {
  container.innerHTML = "";
  if (!data.length) {
    container.innerHTML =
      '<p style="grid-column:1 / -1; color:#e5e7eb;">Koi result nahi mila. Filters ya search change karke try karo.</p>';
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const tagLabel = langTagLabel(item.lang);
    const officeBadgeHtml = officeSafeBadge(item.officeSafe);
    const isFav = favourites.includes(item.id);
    const favClass = isFav ? "fav-btn faved" : "fav-btn";

    const meaning = getMeaningInLang(item, settings.explainLang);
    const example = getExampleInLang(item, settings.explainLang);

    let extraContent = `
      <p><span class="card-label">Meaning:</span> ${meaning}</p>
      <p><span class="card-label">Example:</span> ${example}</p>
    `;
    if (item.origin) {
      extraContent += `<p><span class="card-label">Origin:</span> ${item.origin}</p>`;
    }
    if (mode === "nsfw") {
      extraContent += `
        <p class="small-note"><span class="card-label">Reminder:</span> Yeh word zyada respectful nahi hai. Samajhne ke liye theek, but use karne se pehle context socho.</p>
      `;
    }

    card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${item.word}</h3>
        <span class="card-tag">${tagLabel}</span>
      </div>
      <p class="card-short">${item.meaning.hinglish || item.meaning.en}</p>
      <div class="card-extra">
        ${extraContent}
        <div class="card-footer-row">
          <div style="display:flex; gap:0.3rem; align-items:center; flex-wrap:wrap;">
            <button class="audio-btn" data-id="${item.id}">🔊 Example suno</button>
            <button class="${favClass}" data-id="${item.id}">⭐ Save</button>
          </div>
          <div style="display:flex; gap:0.2rem; align-items:center; flex-wrap:wrap;">
            ${officeBadgeHtml}
            ${item.explicit ? '<span class="badge-explicit">18+ / Explicit</span>' : ""}
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      // avoid toggle when clicking buttons
      if (e.target.closest("button")) return;
      card.classList.toggle("open");
    });

    container.appendChild(card);
  });

  // attach audio & fav listeners after DOM added
  container.querySelectorAll(".audio-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const item = SLANGS.find((s) => s.id === id);
      if (item) speakSlang(item);
    });
  });

  container.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      toggleFavourite(id);
      btn.classList.toggle("faved");
      renderActivity(); // update fav list
      maybeShowPremium("favs");
    });
  });
}

function renderDictionary() {
  const text = searchInput.value.trim();
  const slangLang = slangLangSelect.value;
  const category = categorySelect.value;
  const officeSafeOnly = officeSafeOnlyCheckbox.checked;

  const filters = { text, slangLang, category, officeSafeOnly };
  const filtered = SLANGS.filter((item) =>
    matchesFilters(item, filters)
  );

  renderCards(resultsEl, filtered, { mode: "normal" });
}

function renderNsfw() {
  const nsfw = SLANGS.filter((s) => s.explicit);
  renderCards(nsfwResultsEl, nsfw, { mode: "nsfw" });
}

function renderActivity() {
  // recent searches chips
  activityRecentEl.innerHTML = "";
  recentSearchList.innerHTML = "";
  if (!recentSearches.length) {
    activityRecentEl.innerHTML = '<span class="small-note">Abhi tak kuch search nahi kiya.</span>';
    recentSearchSection.classList.add("hidden");
  } else {
    recentSearchSection.classList.remove("hidden");
    recentSearches.slice().reverse().forEach((term) => {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.textContent = term;
      chip.addEventListener("click", () => {
        searchInput.value = term;
        renderDictionary();
      });
      activityRecentEl.appendChild(chip);

      const chip2 = chip.cloneNode(true);
      chip2.addEventListener("click", () => {
        searchInput.value = term;
        renderDictionary();
      });
      recentSearchList.appendChild(chip2);
    });
  }

  // favourites as cards
  const favItems = SLANGS.filter((s) => favourites.includes(s.id));
  renderCards(activityFavouritesEl, favItems, { mode: "normal" });
}

// ----------------------
// Audio (Text-to-Speech)
// ----------------------
let voices = [];
function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  voices = window.speechSynthesis.getVoices();
}
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

function pickVoiceFor(langCode) {
  if (!voices.length) return null;
  const preferredGender = settings.voiceGender;

  const langMatch = voices.filter((v) => v.lang.toLowerCase().startsWith(langCode));

  if (!langMatch.length) return voices[0];

  if (preferredGender !== "neutral") {
    const genderMatch = langMatch.find((v) =>
      v.name.toLowerCase().includes(preferredGender)
    );
    if (genderMatch) return genderMatch;
  }

  return langMatch[0];
}

function speakSlang(item) {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech browser mein available nahi hai.");
    return;
  }

  const langMap = {
    hinglish: "en-IN",
    en: "en-IN",
    hi: "hi-IN",
    ta: "ta-IN",
    mr: "mr-IN",
    bhojpuri: "hi-IN"
  };
  const langKey = settings.explainLang;
  const langCode = langMap[langKey] || "en-IN";

  const text = `${item.word}. ${getExampleInLang(item, langKey)}`;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode;

  const voice = pickVoiceFor(langCode);
  if (voice) utter.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// ----------------------
// Favourites & Recent Searches
// ----------------------
function toggleFavourite(id) {
  if (favourites.includes(id)) {
    favourites = favourites.filter((x) => x !== id);
  } else {
    favourites.push(id);
  }
  saveState();
}

function addRecentSearch(term) {
  const clean = term.trim();
  if (!clean) return;
  recentSearches = recentSearches.filter((t) => t !== clean);
  recentSearches.push(clean);
  if (recentSearches.length > 10) {
    recentSearches.shift();
  }
  saveState();
}

// ----------------------
// Quiz Logic
// ----------------------
const quizState = {
  score: 0,
  total: 0,
  current: null
};

function startQuiz() {
  quizState.score = 0;
  quizState.total = 0;
  quizScoreEl.textContent = "Score: 0 / 0";
  nextQuizQuestion();
}

function nextQuizQuestion() {
  if (!SLANGS.length) return;
  const idx = Math.floor(Math.random() * SLANGS.length);
  const current = SLANGS[idx];
  quizState.current = current;
  quizState.total += 1;

  quizQuestionEl.textContent = `“${current.word}” ka approx meaning kya hai?`;

  const options = new Set();
  options.add(current.meaning.hinglish || current.meaning.en);

  while (options.size < 4 && options.size < SLANGS.length) {
    const rand = SLANGS[Math.floor(Math.random() * SLANGS.length)];
    if (rand.id !== current.id) {
      options.add(rand.meaning.hinglish || rand.meaning.en);
    }
  }

  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
  quizOptionsEl.innerHTML = "";
  shuffled.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      const isCorrect =
        opt === (current.meaning.hinglish || current.meaning.en);
      if (isCorrect) {
        quizState.score += 1;
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }
      quizScoreEl.textContent = `Score: ${quizState.score} / ${quizState.total}`;
      setTimeout(nextQuizQuestion, 700);
    });
    quizOptionsEl.appendChild(btn);
  });
}

// ----------------------
// Premium Popup Logic
// ----------------------
function showPremiumModal() {
  premiumModal.classList.remove("hidden");
}

function hidePremiumModal() {
  premiumModal.classList.add("hidden");
  premiumMsg.textContent = "";
  premiumEmailInput.value = "";
}

function maybeShowPremium(reason) {
  if (reason === "favs" && favourites.length > 5) {
    showPremiumModal();
  }
  if (reason === "nsfw" && nsfwViewsCount > 3) {
    showPremiumModal();
  }
}

// ----------------------
// Tabs
// ----------------------
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove("active"));
    tabs.forEach((t) => t.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(`tab-${tab}`).classList.add("active");

    if (tab === "activity") {
      renderActivity();
    } else if (tab === "nsfw") {
      nsfwViewsCount += 1;
      renderNsfw();
      maybeShowPremium("nsfw");
    }
  });
});

// ----------------------
// Events & Initialization
// ----------------------
searchInput.addEventListener("input", () => {
  renderDictionary();
});

searchInput.addEventListener("change", () => {
  addRecentSearch(searchInput.value);
  renderActivity();
});

translateSelect.addEventListener("change", () => {
  settings.explainLang = translateSelect.value;
  saveState();
  renderDictionary();
  renderNsfw();
});

slangLangSelect.addEventListener("change", renderDictionary);
categorySelect.addEventListener("change", renderDictionary);
officeSafeOnlyCheckbox.addEventListener("change", renderDictionary);

startQuizBtn.addEventListener("click", () => {
  startQuiz();
});

defaultExplainSelect.addEventListener("change", () => {
  settings.explainLang = defaultExplainSelect.value;
  translateSelect.value = settings.explainLang;
  saveState();
  renderDictionary();
});

voiceGenderSelect.addEventListener("change", () => {
  settings.voiceGender = voiceGenderSelect.value;
  saveState();
});

showNsfwLinkCheckbox.addEventListener("change", () => {
  settings.showNsfwLink = showNsfwLinkCheckbox.checked;
  const nsfwTabBtn = Array.from(tabButtons).find((b) => b.dataset.tab === "nsfw");
  if (nsfwTabBtn) {
    nsfwTabBtn.style.display = settings.showNsfwLink ? "" : "none";
  }
  saveState();
});

clearDataBtn.addEventListener("click", () => {
  favourites = [];
  recentSearches = [];
  saveState();
  renderDictionary();
  renderActivity();
  alert("Search history aur favourites clear ho gaye.");
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  favourites = [];
  recentSearches = [];
  saveState();
  renderUserGreeting();
  loginModal.style.display = "flex";
});

// Login modal
loginOpenBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

loginSubmitBtn.addEventListener("click", () => {
  const name = loginNameInput.value.trim();
  const email = loginEmailInput.value.trim();
  if (!email) {
    alert("Email daalna zaroori hai.");
    return;
  }
  currentUser = { name: name || "User", email };
  favourites = [];
  recentSearches = [];
  saveState();
  renderUserGreeting();
  loginModal.style.display = "none";
});

loginSkipBtn.addEventListener("click", () => {
  currentUser = null;
  saveState();
  renderUserGreeting();
  loginModal.style.display = "none";
});

// Premium modal events
premiumNotifyBtn.addEventListener("click", () => {
  if (!premiumEmailInput.value.trim()) return;
  premiumMsg.textContent =
    "Shukriya! Premium launch hote hi email aa jayega. 🙌";
});

premiumCloseBtn.addEventListener("click", hidePremiumModal);

// ----------------------
// Initial load
// ----------------------
(function init() {
  loadState();

  // apply settings to controls
  translateSelect.value = settings.explainLang || "hinglish";
  defaultExplainSelect.value = settings.explainLang || "hinglish";
  voiceGenderSelect.value = settings.voiceGender || "neutral";
  showNsfwLinkCheckbox.checked = settings.showNsfwLink !== false;

  if (!settings.showNsfwLink) {
    const nsfwTabBtn = Array.from(tabButtons).find((b) => b.dataset.tab === "nsfw");
    if (nsfwTabBtn) nsfwTabBtn.style.display = "none";
  }

  renderUserGreeting();
  renderDictionary();
  renderActivity();

  // show login for first-time users
  if (!currentUser) {
    loginModal.style.display = "flex";
  } else {
    loginModal.style.display = "none";
  }
})();
