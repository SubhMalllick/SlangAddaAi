// admin.js

// Allowed admin emails (only these can see dashboard)
const ADMIN_EMAILS = [
  "youremail@domain.com",   // <- put YOUR email here (same one used for Google login)
  "anotheradmin@domain.com"
];

let auth, db;
if (firebase && firebase.auth && firebase.firestore) {
  auth = firebase.auth();
  db = firebase.firestore();
} else {
  alert("Firebase not loaded. Check your script tags in admin.html.");
}

// DOM elements
const adminInfo = document.getElementById("adminInfo");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");

const statWords = document.getElementById("statWords");
const statOfficeSafe = document.getElementById("statOfficeSafe");
const statExplicit = document.getElementById("statExplicit");

const statUsers = document.getElementById("statUsers");
const statActiveUsers = document.getElementById("statActiveUsers");
const statQuizTotal = document.getElementById("statQuizTotal");
const statTopPlayer = document.getElementById("statTopPlayer");

const statRequestsNew = document.getElementById("statRequestsNew");

const slangTableBody = document.querySelector("#slangTable tbody");
const requestsTableBody = document.querySelector("#requestsTable tbody");

// Form fields
const fId = document.getElementById("fId");
const fWord = document.getElementById("fWord");
const fLang = document.getElementById("fLang");
const fCategory = document.getElementById("fCategory");
const fOfficeSafe = document.getElementById("fOfficeSafe");
const fExplicit = document.getElementById("fExplicit");
const fMeaningHinglish = document.getElementById("fMeaningHinglish");
const fMeaningEn = document.getElementById("fMeaningEn");
const fExampleHinglish = document.getElementById("fExampleHinglish");
const fOrigin = document.getElementById("fOrigin");

const saveSlangBtn = document.getElementById("saveSlangBtn");
const deleteSlangBtn = document.getElementById("deleteSlangBtn");

let currentSlangDocId = null; // Firestore doc ID

// ---- Auth handling ----
adminLoginBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed. Check console.");
  }
});

adminLogoutBtn.addEventListener("click", async () => {
  await auth.signOut();
});

// Listen to auth state
auth.onAuthStateChanged((user) => {
  if (!user) {
    adminInfo.textContent = "Not signed in";
    adminLogoutBtn.style.display = "none";
    adminLoginBtn.style.display = "inline-flex";
    hideAdminData();
    return;
  }

  const isAdmin = ADMIN_EMAILS.includes(user.email);
  if (!isAdmin) {
    adminInfo.textContent = `No admin access for ${user.email}`;
    adminLogoutBtn.style.display = "inline-flex";
    adminLoginBtn.style.display = "none";
    hideAdminData();
    alert("This Google account is not an admin. Use authorised email.");
    return;
  }

  adminInfo.textContent = `Admin: ${user.displayName || user.email}`;
  adminLogoutBtn.style.display = "inline-flex";
  adminLoginBtn.style.display = "none";
  loadDashboardData();
});

function hideAdminData() {
  // Clear tables & stats
  slangTableBody.innerHTML = "";
  requestsTableBody.innerHTML = "";
  statWords.textContent = "0";
  statOfficeSafe.textContent = "0";
  statExplicit.textContent = "0";
  statUsers.textContent = "0";
  statActiveUsers.textContent = "0";
  statQuizTotal.textContent = "0";
  statTopPlayer.textContent = "-";
  statRequestsNew.textContent = "0";
}

// ---- Load data for dashboard ----
function loadDashboardData() {
  loadSlangs();
  loadRequests();
  loadStats();
}

// Slangs list
function loadSlangs() {
  db.collection("slangs").orderBy("word").onSnapshot((snapshot) => {
    slangTableBody.innerHTML = "";
    let total = 0;
    let officeSafeCount = 0;
    let explicitCount = 0;

    snapshot.forEach((doc) => {
      total++;
      const data = doc.data();
      if (data.officeSafe === "yes") officeSafeCount++;
      if (data.explicit) explicitCount++;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.word || ""}</td>
        <td>${data.lang || ""}</td>
        <td>${data.category || ""}</td>
        <td>${data.officeSafe || ""}</td>
        <td>${data.explicit ? "Yes" : "No"}</td>
      `;
      tr.addEventListener("click", () => {
        loadSlangIntoForm(doc.id, data);
      });
      slangTableBody.appendChild(tr);
    });

    statWords.textContent = total;
    statOfficeSafe.textContent = officeSafeCount;
    statExplicit.textContent = explicitCount;
  });
}

function loadSlangIntoForm(docId, data) {
  currentSlangDocId = docId;
  fId.value = docId;
  fWord.value = data.word || "";
  fLang.value = data.lang || "en";
  fCategory.value = data.category || "life";
  fOfficeSafe.value = data.officeSafe || "yes";
  fExplicit.value = data.explicit ? "true" : "false";
  fMeaningHinglish.value = data.meaning?.hinglish || "";
  fMeaningEn.value = data.meaning?.en || "";
  fExampleHinglish.value = data.example?.hinglish || "";
  fOrigin.value = data.origin || "";
}

// Save / update slang
saveSlangBtn.addEventListener("click", async () => {
  const id = fId.value.trim();
  if (!id) {
    alert("ID zaroori hai.");
    return;
  }
  const payload = {
    word: fWord.value.trim() || id,
    lang: fLang.value,
    category: fCategory.value,
    officeSafe: fOfficeSafe.value,
    explicit: fExplicit.value === "true",
    meaning: {
      hinglish: fMeaningHinglish.value.trim(),
      en: fMeaningEn.value.trim()
    },
    example: {
      hinglish: fExampleHinglish.value.trim()
    },
    origin: fOrigin.value.trim(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection("slangs").doc(id).set(
      {
        ...payload,
        createdAt: currentSlangDocId ? undefined : firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    alert("Word saved/updated.");
    currentSlangDocId = id;
  } catch (err) {
    console.error("Error saving slang:", err);
    alert("Error while saving. See console.");
  }
});

// Delete slang
deleteSlangBtn.addEventListener("click", async () => {
  const id = fId.value.trim();
  if (!id) {
    alert("Select a word first.");
    return;
  }
  if (!confirm(`Delete word "${id}"?`)) return;
  try {
    await db.collection("slangs").doc(id).delete();
    alert("Word deleted.");
    currentSlangDocId = null;
    document.getElementById("slangForm").reset();
  } catch (err) {
    console.error("Error deleting slang:", err);
    alert("Error while deleting. See console.");
  }
});

// Requests list
function loadRequests() {
  db.collection("requests")
    .orderBy("createdAt", "desc")
    .limit(100)
    .onSnapshot((snapshot) => {
      requestsTableBody.innerHTML = "";
      let newCount = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === "new") newCount++;
        const created = data.createdAt?.toDate
          ? data.createdAt.toDate().toLocaleString()
          : "-";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${data.word || ""}</td>
          <td>${data.language || ""}</td>
          <td>${data.source || ""}</td>
          <td>${data.status || "new"}</td>
          <td>${created}</td>
        `;
        requestsTableBody.appendChild(tr);
      });
      statRequestsNew.textContent = newCount;
    });
}

// Stats (users & quiz)
async function loadStats() {
  // TOTAL USERS
  const usersSnap = await db.collection("users").get();
  const totalUsers = usersSnap.size;
  statUsers.textContent = totalUsers;

  // ACTIVE USERS (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const activeSnap = await db
    .collection("users")
    .where("lastSeen", ">=", sevenDaysAgo)
    .get();
  statActiveUsers.textContent = activeSnap.size;

  // Quiz stats + top player (this assumes you store quiz stats per user)
  let totalQuiz = 0;
  let topPlayer = null;
  usersSnap.forEach((doc) => {
    const data = doc.data();
    const qTotal = data.totalQuizQuestions || 0;
    totalQuiz += qTotal;
    if (!topPlayer || (data.totalCorrect || 0) > (topPlayer.totalCorrect || 0)) {
      topPlayer = data;
    }
  });
  statQuizTotal.textContent = totalQuiz;
  statTopPlayer.textContent = topPlayer
    ? `${topPlayer.name || topPlayer.email || "User"} (${topPlayer.totalCorrect || 0} correct)`
    : "-";
}
