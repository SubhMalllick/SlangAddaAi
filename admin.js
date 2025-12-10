// admin.js

// --- 1) SLANGS DATA SOURCE ------------------------------------
// TODO: Har baar jab real update karna ho, app.js se latest
// `const SLANGS = [...]` yahan copy-paste kar dena.
// Abhi main sample data daal raha hoon (same structure):
let SLANGS = [
  {
    id: "adulting",
    word: "Adulting",
    lang: "en",
    category: "life",
    officeSafe: "yes",
    explicit: false,
    meaning: {
      hinglish:
        "Adulting ka matlab hai woh saare boring but important kaam jo bade log karte hain – bills pay karna, kaam pe time se jaana, ghar manage karna, doctor check-up, etc.",
      en: "Doing responsible grown-up tasks like paying bills, working, managing a home – especially when it feels strange that you are the adult now."
    },
    example: {
      hinglish:
        "“Kal raat party nahi gayi, pura din adulting hi chal raha tha – rent, laundry, sab.”"
    },
    origin:
      "Millennial internet slang, popular on Instagram & Twitter for describing everyday responsibilities."
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
    origin: "Popular internet acronym; widely used in social life, investing and career decisions."
  }
  // ... yahan baaki words add honge jab tum app.js se copy karoge
];

// --- 2) DOM REFERENCES ----------------------------------------
const wordTableBody = document.querySelector("#wordTable tbody");

const statTotalWords = document.getElementById("statTotalWords");
const statOfficeSafe = document.getElementById("statOfficeSafe");
const statExplicit = document.getElementById("statExplicit");
const statDesi = document.getElementById("statDesi");

const fieldId = document.getElementById("fieldId");
const fieldWord = document.getElementById("fieldWord");
const fieldLang = document.getElementById("fieldLang");
const fieldCategory = document.getElementById("fieldCategory");
const fieldOfficeSafe = document.getElementById("fieldOfficeSafe");
const fieldExplicit = document.getElementById("fieldExplicit");
const fieldMeaningHinglish = document.getElementById("fieldMeaningHinglish");
const fieldMeaningEn = document.getElementById("fieldMeaningEn");
const fieldExampleHinglish = document.getElementById("fieldExampleHinglish");
const fieldOrigin = document.getElementById("fieldOrigin");

const saveWordBtn = document.getElementById("saveWordBtn");
const deleteWordBtn = document.getElementById("deleteWordBtn");
const newWordBtn = document.getElementById("newWordBtn");

const exportArea = document.getElementById("exportArea");
const refreshExportBtn = document.getElementById("refreshExportBtn");

let currentIndex = null;

// --- 3) TABLE & FORM RENDERING -------------------------------
function renderStats() {
  const total = SLANGS.length;
  const officeSafeCount = SLANGS.filter((w) => w.officeSafe === "yes").length;
  const explicitCount = SLANGS.filter((w) => w.explicit).length;
  const desiCount = SLANGS.filter((w) => w.category === "desi").length;

  statTotalWords.textContent = total;
  statOfficeSafe.textContent = officeSafeCount;
  statExplicit.textContent = explicitCount;
  statDesi.textContent = desiCount;
}

function renderTable() {
  wordTableBody.innerHTML = "";
  const sorted = [...SLANGS].sort((a, b) =>
    (a.word || "").localeCompare(b.word || "", "en", { sensitivity: "base" })
  );

  sorted.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.word || ""}</td>
      <td>${item.lang || ""}</td>
      <td>${item.category || ""}</td>
      <td>${item.officeSafe || ""}</td>
      <td>${item.explicit ? "Yes" : "No"}</td>
    `;
    tr.addEventListener("click", () => {
      const idx = SLANGS.findIndex((w) => w.id === item.id);
      if (idx !== -1) {
        currentIndex = idx;
        loadWordIntoForm(SLANGS[idx]);
      }
    });
    wordTableBody.appendChild(tr);
  });

  renderStats();
  refreshExportText();
}

function clearForm() {
  currentIndex = null;
  fieldId.value = "";
  fieldWord.value = "";
  fieldLang.value = "en";
  fieldCategory.value = "life";
  fieldOfficeSafe.value = "yes";
  fieldExplicit.value = "false";
  fieldMeaningHinglish.value = "";
  fieldMeaningEn.value = "";
  fieldExampleHinglish.value = "";
  fieldOrigin.value = "";
}

function loadWordIntoForm(item) {
  fieldId.value = item.id || "";
  fieldWord.value = item.word || "";
  fieldLang.value = item.lang || "en";
  fieldCategory.value = item.category || "life";
  fieldOfficeSafe.value = item.officeSafe || "yes";
  fieldExplicit.value = item.explicit ? "true" : "false";
  fieldMeaningHinglish.value = item.meaning?.hinglish || "";
  fieldMeaningEn.value = item.meaning?.en || "";
  fieldExampleHinglish.value = item.example?.hinglish || item.example?.en || "";
  fieldOrigin.value = item.origin || "";
}

// --- 4) SAVE / DELETE / EXPORT -------------------------------
function saveWordFromForm() {
  const id = fieldId.value.trim();
  const word = fieldWord.value.trim() || id;

  if (!id) {
    alert("ID zaroori hai (a-z, numbers, underscores).");
    return;
  }

  const existingIndex = SLANGS.findIndex((w) => w.id === id);
  const payload = {
    id,
    word,
    lang: fieldLang.value,
    category: fieldCategory.value,
    officeSafe: fieldOfficeSafe.value,
    explicit: fieldExplicit.value === "true",
    meaning: {
      hinglish: fieldMeaningHinglish.value.trim(),
      en: fieldMeaningEn.value.trim()
    },
    example: {
      hinglish: fieldExampleHinglish.value.trim()
    },
    origin: fieldOrigin.value.trim()
  };

  if (existingIndex !== -1) {
    SLANGS[existingIndex] = payload;
    currentIndex = existingIndex;
  } else {
    SLANGS.push(payload);
    currentIndex = SLANGS.length - 1;
  }

  renderTable();
  alert("Word saved/updated (remember to copy export text into app.js).");
}

function deleteWordFromForm() {
  const id = fieldId.value.trim();
  if (!id) {
    alert("Select a word first.");
    return;
  }
  if (!confirm(`Delete word "${id}"?`)) return;

  SLANGS = SLANGS.filter((w) => w.id !== id);
  clearForm();
  renderTable();
}

function exportSlangsAsJs() {
  const js = "const SLANGS = " + JSON.stringify(SLANGS, null, 2) + ";\n";
  return js;
}

function refreshExportText() {
  exportArea.value = exportSlangsAsJs();
}

// --- 5) EVENT LISTENERS --------------------------------------
saveWordBtn.addEventListener("click", saveWordFromForm);
deleteWordBtn.addEventListener("click", deleteWordFromForm);
newWordBtn.addEventListener("click", clearForm);
refreshExportBtn.addEventListener("click", refreshExportText);

// --- 6) INIT -------------------------------------------------
renderTable();
clearForm();
