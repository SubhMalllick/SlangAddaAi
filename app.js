// app.js - SlangAdda Dictionary with Firebase
let SLANGS = []; // Will be loaded from Firestore
let favourites = [];
let recentSearches = [];
let settings = {
  explainLang: "hinglish",
  voiceGender: "neutral",
  showNsfwLink: true
};
let currentUser = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const resultsEl = document.getElementById('results');
const nsfwResultsEl = document.getElementById('nsfwResults');
const activityRecentEl = document.getElementById('activityRecent');
const activityFavouritesEl = document.getElementById('activityFavourites');

// ======================
// FIREBASE FUNCTIONS
// ======================

// Load slang from Firestore
async function loadSlangFromFirestore() {
  try {
    console.log("Loading slang from Firestore...");
    
    const snapshot = await firebaseDB.collection('slang_entries')
      .where('verified', '==', true)
      .limit(100)
      .get();
    
    SLANGS = [];
    snapshot.forEach(doc => {
      SLANGS.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`Loaded ${SLANGS.length} slang terms from Firestore`);
    renderDictionary();
    
  } catch (error) {
    console.error("Error loading slang:", error);
    // Fallback to local data
    loadLocalSlang();
  }
}

// Load fallback local data
function loadLocalSlang() {
  SLANGS = [
    {
      id: "adulting",
      word: "Adulting",
      lang: "en",
      category: "life",
      officeSafe: "yes",
      explicit: false,
      meaning: {
        hinglish: "Adulting ka matlab hai woh saare boring but important kaam jo bade log karte hain – bills pay karna, kaam pe time se jaana, ghar manage karna.",
        en: "Doing responsible grown-up tasks like paying bills, working, managing a home."
      },
      example: {
        hinglish: "“Kal raat party nahi gayi, pura din adulting hi chal raha tha – rent, laundry, sab.”"
      },
      origin: "Millennial internet slang",
      verified: true
    },
    {
      id: "rizz",
      word: "Rizz",
      lang: "en",
      category: "genz",
      officeSafe: "caution",
      explicit: false,
      meaning: {
        hinglish: "Charisma, charm – kisi mein aisa swag ho ki dusre attract ho jaye.",
        en: "Charisma or romantic charm that attracts others."
      },
      example: {
        hinglish: "“Uska rizz crazy hai, sab uske piche pagal hain.”"
      },
      origin: "Gen Z internet slang from 'charisma'",
      verified: true
    },
    {
      id: "jugaad",
      word: "Jugaad",
      lang: "hi",
      category: "desi",
      officeSafe: "yes",
      explicit: false,
      meaning: {
        hinglish: "Limited resources mein smart, creative hack se kaam chala lena.",
        en: "A clever low-cost workaround or hack using limited resources."
      },
      example: {
        hinglish: "“Yeh portable stand pura jugaad aur dedication ka result hai.”"
      },
      origin: "Hindi word, celebrated in Indian startup culture",
      verified: true
    }
  ];
  console.log(`Loaded ${SLANGS.length} local slang terms`);
  renderDictionary();
}

// Load user data
async function loadUserData() {
  if (firebaseAuth.currentUser) {
    currentUser = firebaseAuth.currentUser;
    try {
      const userDoc = await firebaseDB.collection('users').doc(currentUser.uid).get();
      if (userDoc.exists) {
        const data = userDoc.data();
        favourites = data.favorites || [];
        recentSearches = data.recentSearches || [];
        settings = data.settings || settings;
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  } else {
    // Guest mode
    favourites = JSON.parse(localStorage.getItem('sa_favs')) || [];
    recentSearches = JSON.parse(localStorage.getItem('sa_recent')) || [];
  }
}

// Save user data
async function saveUserData() {
  if (!currentUser) {
    localStorage.setItem('sa_favs', JSON.stringify(favourites));
    localStorage.setItem('sa_recent', JSON.stringify(recentSearches));
    return;
  }
  
  try {
    await firebaseDB.collection('users').doc(currentUser.uid).update({
      favorites: favourites,
      recentSearches: recentSearches,
      settings: settings
    });
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

// Add new slang (admin function)
async function addNewSlang(slangData) {
  try {
    const docRef = await firebaseDB.collection('slang_entries').add({
      ...slangData,
      verified: false,
      addedBy: currentUser ? currentUser.uid : 'guest',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("New slang added with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding slang:", error);
    return { success: false, error: error.message };
  }
}

// ======================
// UI FUNCTIONS
// ======================

// Render slang cards
function renderCards(container, data) {
  container.innerHTML = '';
  
  if (!data || data.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #6b7280;">
        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
        <p>No slang found. Try a different search.</p>
      </div>
    `;
    return;
  }
  
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
        <h3 style="margin: 0; color: #1f2937;">${item.word}</h3>
        <span style="background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">
          ${item.lang === 'hi' ? 'Hindi' : 'English'}
        </span>
      </div>
      
      <p style="color: #4b5563; margin-bottom: 1rem; font-size: 0.95rem;">
        ${item.meaning?.hinglish || item.meaning?.en || 'No meaning available'}
      </p>
      
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <button class="fav-btn ${favourites.includes(item.id) ? 'faved' : ''}" 
                  data-id="${item.id}" 
                  style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">
            ${favourites.includes(item.id) ? '★' : '☆'}
          </button>
          <button class="audio-btn" data-id="${item.id}" 
                  style="background: none; border: none; cursor: pointer; font-size: 1rem; margin-left: 0.5rem;">
            🔊
          </button>
        </div>
        
        <div>
          <span style="background: ${item.officeSafe === 'yes' ? '#d1fae5' : '#fef3c7'}; 
                      color: ${item.officeSafe === 'yes' ? '#065f46' : '#92400e'}; 
                      padding: 0.2rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">
            ${item.officeSafe === 'yes' ? 'Office-safe ✅' : 'Use caution ⚠'}
          </span>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Add event listeners
  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      toggleFavorite(id);
      e.target.classList.toggle('faved');
      e.target.innerHTML = e.target.classList.contains('faved') ? '★' : '☆';
    });
  });
}

// Toggle favorite
function toggleFavorite(id) {
  if (favourites.includes(id)) {
    favourites = favourites.filter(fav => fav !== id);
  } else {
    favourites.push(id);
  }
  saveUserData();
}

// Render dictionary
function renderDictionary() {
  const searchTerm = searchInput.value.toLowerCase();
  
  let filtered = SLANGS;
  
  // Apply search filter
  if (searchTerm) {
    filtered = SLANGS.filter(item => 
      item.word.toLowerCase().includes(searchTerm) ||
      (item.meaning?.hinglish && item.meaning.hinglish.toLowerCase().includes(searchTerm)) ||
      (item.meaning?.en && item.meaning.en.toLowerCase().includes(searchTerm))
    );
  }
  
  // Apply other filters (you can add more filters here)
  const categorySelect = document.getElementById('categorySelect');
  const officeSafeOnly = document.getElementById('officeSafeOnly');
  
  if (categorySelect && categorySelect.value !== 'all') {
    filtered = filtered.filter(item => item.category === categorySelect.value);
  }
  
  if (officeSafeOnly && officeSafeOnly.checked) {
    filtered = filtered.filter(item => item.officeSafe === 'yes');
  }
  
  renderCards(resultsEl, filtered);
  
  // Add to recent searches
  if (searchTerm) {
    addRecentSearch(searchTerm);
  }
}

// Add to recent searches
function addRecentSearch(term) {
  const clean = term.trim();
  if (!clean) return;
  
  recentSearches = recentSearches.filter(t => t !== clean);
  recentSearches.push(clean);
  
  if (recentSearches.length > 10) {
    recentSearches.shift();
  }
  
  saveUserData();
  renderRecentSearches();
}

// Render recent searches
function renderRecentSearches() {
  if (!activityRecentEl) return;
  
  activityRecentEl.innerHTML = '';
  
  if (recentSearches.length === 0) {
    activityRecentEl.innerHTML = '<p style="color: #6b7280;">No recent searches</p>';
    return;
  }
  
  recentSearches.reverse().forEach(term => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = term;
    chip.style.margin = '0.3rem';
    chip.onclick = () => {
      searchInput.value = term;
      renderDictionary();
    };
    activityRecentEl.appendChild(chip);
  });
}

// Render favorites
function renderFavorites() {
  if (!activityFavouritesEl) return;
  
  const favItems = SLANGS.filter(item => favourites.includes(item.id));
  renderCards(activityFavouritesEl, favItems);
}

// Speak text
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// ======================
// INITIALIZATION
// ======================

async function initApp() {
  console.log("Initializing SlangAdda...");
  
  // Check if Firebase is loaded
  if (!window.firebaseDB) {
    console.error("Firebase not loaded. Check firebase-config.js");
    loadLocalSlang();
    return;
  }
  
  // Load user data
  await loadUserData();
  
  // Load slang data
  await loadSlangFromFirestore();
  
  // Render UI
  renderDictionary();
  renderRecentSearches();
  renderFavorites();
  
  // Setup event listeners
  if (searchInput) {
    searchInput.addEventListener('input', renderDictionary);
  }
  
  // Listen for auth state changes
  firebaseAuth.onAuthStateChanged((user) => {
    currentUser = user;
    loadUserData().then(() => {
      renderRecentSearches();
      renderFavorites();
    });
  });
  
  console.log("SlangAdda initialized successfully!");
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Make functions available globally
window.toggleFavorite = toggleFavorite;
window.speakText = speakText;
window.addNewSlang = addNewSlang;
