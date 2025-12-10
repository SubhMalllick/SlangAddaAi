// admin.js

// --- 1) SLANGS DATA SOURCE ------------------------------------
// IMPORTANT:
// Har baar jab real update karna ho, app.js se latest
// `const SLANGS = [...]` copy karke niche wale SLANGS = [...] ke
// andar paste kar dena. Yahan sirf sample hai:

let SLANGS = [
  {
    numId: 1,
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
    numId: 2,
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
  }
  // <- yahan tum app.js se full SLANGS array paste karoge
];

// --- 2) DOM REFERENCES ----------------------------------------
const wordTableBody = document.querySelector("#wordTable tbody");

const statTotalWords = document.getElementById("statTotalWords");
const statOfficeSafe = document.getElementById("statOfficeSafe");
const statExplicit = document.getElementById("statExplicit");
const statDesi = document.getElementById("statDesi");

const fieldNumId = document.getElementById("fieldNumId");
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

const downloadSampleBtn = document.getElementById("downloadSampleBtn");
const uploadFileInput = document.getElementById("uploadFile");
const uploadFileBtn = document.getElementById("uploadFileBtn");
const bulkStatusEl = document.getElementById("bulkStatus");

let currentIndex = null;

// --- 3) HELPERS -----------------------------------------------
function getNextNumId() {
  const maxId = SLANGS.reduce((max, item) => {
    const n = typeof item.numId === "number" ? item.numId : 0;
    return Math.max(max, n);
  }, 0);
  return maxId + 1;
}

function normalizeIdFromWord(word) {
  return (word || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "") || "word_" + Date.now();
}

function keyForWord(item) {
  // for duplicate detection (word+lang)
  return `${(item.word || "").toLowerCase().trim()}__${(item.lang || "en")
    .toLowerCase()
    .trim()}`;
}

// --- 4) TABLE & FORM RENDERING -------------------------------
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
      <td>${item.numId ?? ""}</td>
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
  fieldNumId.value = "";
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
  fieldNumId.value = item.numId ?? "";
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

// --- 5) SAVE / DELETE / EXPORT -------------------------------
function saveWordFromForm() {
  let numId = parseInt(fieldNumId.value, 10);
  if (!Number.isFinite(numId)) {
    numId = getNextNumId();
  }

  const idRaw = fieldId.value.trim();
  const wordRaw = fieldWord.value.trim();
  if (!wordRaw && !idRaw) {
    alert("Word ya ID mein se kam se kam ek to hona hi chahiye.");
    return;
  }

  const word = wordRaw || idRaw;
  const id = idRaw || normalizeIdFromWord(word);

  const payload = {
    numId,
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

  const existingIndex = SLANGS.findIndex((w) => w.id === id);
  if (existingIndex !== -1) {
    SLANGS[existingIndex] = payload;
    currentIndex = existingIndex;
  } else {
    SLANGS.push(payload);
    currentIndex = SLANGS.length - 1;
  }

  renderTable();
  loadWordIntoForm(payload);
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

// --- 6) SAMPLE CSV DOWNLOAD ----------------------------------
function downloadSampleCsv() {
  const header = [
    "numId",
    "word",
    "lang",
    "category",
    "officeSafe",
    "explicit",
    "meaning_hinglish",
    "meaning_en",
    "example_hinglish",
    "origin"
  ];

  const sampleRows = [
    [
      "",
      "Adulting",
      "en",
      "life",
      "yes",
      "false",
      "Boring but important bade log wale kaam.",
      "Doing responsible grown-up tasks.",
      "Kal raat party nahi gayi, pura din adulting chal raha tha.",
      "Millennial internet slang."
    ],
    [
      "",
      "Scene kya hai",
      "hi",
      "desi",
      "caution",
      "false",
      "Plan ya situation kya chal rahi hai.",
      "Casual way to ask what's the plan.",
      "Kal office ke baad kuch scene hai?"
    ]
  ];

  const lines = [header.join(",")].concat(sampleRows.map((r) =>
    r.map((cell) => {
      const v = (cell ?? "").toString().replace(/"/g, '""');
      return `"${v}"`;
    }).join(",")
  ));

  const csv = lines.join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "slangadda_sample.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- 7) BULK UPLOAD (EXCEL/CSV) ------------------------------
function parseUploadedFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      let workbook;

      try {
        if (file.name.endsWith(".csv")) {
          // CSV → sheet
          const ws = XLSX.read(data, { type: "binary" }).Sheets.Sheet1;
          const json = XLSX.utils.sheet_to_json(ws);
          resolve(json);
        } else {
          workbook = XLSX.read(data, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const ws = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(ws);
          resolve(json);
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}

async function handleUploadFile() {
  const file = uploadFileInput.files[0];
  if (!file) {
    alert("Pehle file select karo (CSV ya Excel).");
    return;
  }

  bulkStatusEl.textContent = "Reading file…";

  try {
    const rows = await parseUploadedFile(file);
    if (!rows.length) {
      bulkStatusEl.textContent = "File empty lag rahi hai.";
      return;
    }

    // Index existing by word+lang
    const indexByKey = new Map();
    SLANGS.forEach((item, idx) => {
      indexByKey.set(keyForWord(item), idx);
    });

    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const row of rows) {
      const word = (row.word || row.Word || "").toString().trim();
      if (!word) {
        skipped++;
        continue;
      }

      const lang =
        (row.lang || row.language || row.Language || "en")
          .toString()
          .trim()
          .toLowerCase() || "en";

      const category =
        (row.category || row.Category || "life").toString().trim().toLowerCase() ||
        "life";

      const officeSafe =
        (row.officeSafe || row.office || "yes").toString().trim().toLowerCase() ||
        "yes";

      const explicitVal =
        (row.explicit || row["18plus"] || row["18+"] || "false")
          .toString()
          .trim()
          .toLowerCase();
      const explicit = explicitVal === "true" || explicitVal === "1" || explicitVal === "yes";

      const meaning_hinglish =
        (row.meaning_hinglish ||
          row.meaningHinglish ||
          row.meaning ||
          "").toString();

      const meaning_en =
        (row.meaning_en || row.meaningEn || "").toString();

      const example_hinglish =
        (row.example_hinglish || row.example || "").toString();

      const origin = (row.origin || "").toString();

      let numId = parseInt(row.numId, 10);
      if (!Number.isFinite(numId)) {
        numId = getNextNumId();
      }

      const tempItem = { word, lang };
      const k = keyForWord(tempItem);

      const basePayload = {
        numId,
        id: normalizeIdFromWord(word),
        word,
        lang,
        category,
        officeSafe,
        explicit,
        meaning: {
          hinglish: meaning_hinglish.trim(),
          en: meaning_en.trim()
        },
        example: {
          hinglish: example_hinglish.trim()
        },
        origin: origin.trim()
      };

      if (indexByKey.has(k)) {
        // update existing
        const existingIdx = indexByKey.get(k);
        SLANGS[existingIdx] = {
          ...SLANGS[existingIdx],
          ...basePayload
        };
        updated++;
      } else {
        SLANGS.push(basePayload);
        indexByKey.set(k, SLANGS.length - 1);
        added++;
      }
    }

    renderTable();
    bulkStatusEl.textContent = `Upload complete: ${added} new, ${updated} updated, ${skipped} skipped.`;
  } catch (err) {
    console.error(err);
    bulkStatusEl.textContent = "File read/parse error. Console check karo.";
  }
}

// --- 8) EVENT LISTENERS --------------------------------------
saveWordBtn.addEventListener("click", saveWordFromForm);
deleteWordBtn.addEventListener("click", deleteWordFromForm);
newWordBtn.addEventListener("click", clearForm);
refreshExportBtn.addEventListener("click", refreshExportText);

downloadSampleBtn.addEventListener("click", downloadSampleCsv);
uploadFileBtn.addEventListener("click", handleUploadFile);

// --- 9) INIT -------------------------------------------------
renderTable();
clearForm();
