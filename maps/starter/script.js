// Dummy / replaceable Firebase config — replace the SAMPLE_* values with your real Firebase project values.
const FIREBASE_CONFIG = {
  apiKey: "SAMPLE_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "SAMPLE_MESSAGING_SENDER_ID",
  appId: "SAMPLE_APP_ID"
};

// In-memory fallback DB (used when sample config is left as-is)
const DUMMY_DB = {
  players: {}
};

let currentPopup = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    WA.chat.sendChatMessage("Message from the Scripting API", "MrRobot");
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

let initialized = false;
// start with in-memory DB; may be switched to real Firestore if config is replaced & SDK loads
let db = DUMMY_DB;
let firestore = null;

function log(...a) {
  console.log("[WA GlobalChat]", ...a);
}

// Loads Firebase SDK (compat build) dynamically
function loadFirebaseSdk() {
  return new Promise((resolve, reject) => {
    if (window.firebase && window.firebase.apps) return resolve();
    const appScript = document.createElement('script');
    appScript.src = "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js";
    appScript.onload = () => {
      const fsScript = document.createElement('script');
      fsScript.src = "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js";
      fsScript.onload = () => resolve();
      fsScript.onerror = reject;
      document.head.appendChild(fsScript);
    };
    appScript.onerror = reject;
    document.head.appendChild(appScript);
  });
}

async function initFirebaseIfNeeded() {
  if (initialized) return;
  // If the config still has SAMPLE_* values we will keep using the dummy in-memory DB.
  const isPlaceholderConfig = String(FIREBASE_CONFIG.apiKey || "").startsWith("SAMPLE_");
  if (isPlaceholderConfig) {
    initialized = true;
    db = DUMMY_DB;
    log("Using dummy in-memory Firestore. Replace FIREBASE_CONFIG with real credentials to enable Firestore.");
    return;
  }

  try {
    await loadFirebaseSdk();
    if (!window.firebase) throw new Error("Firebase SDK failed to load.");
    // initialize app and firestore (compat)
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    firestore = firebase.firestore();
    db = null; // real firestore will be used via firestore variable
    initialized = true;
    log("Firebase initialized (Firestore enabled).");
  } catch (err) {
    // fall back to in-memory DB on any error
    initialized = true;
    db = DUMMY_DB;
    firestore = null;
    log("Failed to initialize Firebase, falling back to dummy DB:", err);
  }
}

async function getUserTags() {
  await initFirebaseIfNeeded();
  const playerId = WA.player.uuid || WA.player.id || WA.player.name;
  if (!playerId) return [];

  if (firestore) {
    try {
      const docRef = firestore.collection("players").doc(playerId);
      const doc = await docRef.get();
      if (!doc.exists) {
        await docRef.set({ tags: [] });
        return [];
      }
      const data = doc.data() || {};
      return data.tags || [];
    } catch (err) {
      log("Error reading tags from Firestore, using empty list:", err);
      return [];
    }
  } else {
    // in-memory fallback
    if (!db.players[playerId]) {
      db.players[playerId] = { tags: [] };
    }
    return db.players[playerId].tags || [];
  }
}

async function setUserTags(tags) {
  await initFirebaseIfNeeded();
  const playerId = WA.player.uuid || WA.player.id || WA.player.name;
  if (!playerId) return;

  if (firestore) {
    try {
      const docRef = firestore.collection("players").doc(playerId);
      await docRef.set({ tags }, { merge: true });
    } catch (err) {
      log("Error writing tags to Firestore, falling back to in-memory:", err);
      // fallback to in-memory write
      if (!db.players[playerId]) db.players[playerId] = { tags: [] };
      db.players[playerId].tags = tags;
    }
  } else {
    if (!db.players[playerId]) {
      db.players[playerId] = { tags: [] };
    }
    db.players[playerId].tags = tags;
  }
}

async function updateDisplayNameWithTags() {
  const tags = await getUserTags();
  const baseName = WA.player.name || "Guest";
  const tagString = tags.length ? ` [${tags.join(", ")}]` : "";
  WA.player.name = baseName.replace(/\s*\[.*\]$/, "") + tagString;
}

async function showTagManagerPopup() {
  const tags = await getUserTags();
  const tagInputId = "waTagInput";
  const popupId = "tagManagerPopup";
  let text = "Your tags: " + (tags.length ? tags.join(", ") : "None") + "\n\n";
  text += "Type a tag and click Add. To remove, type the tag and click Remove.\n";
  text += "Tag: ";

  WA.ui.openPopup(popupId, text, [
    {
      label: "Add",
      callback: async () => {
        const tag = prompt("Enter tag to add:");
        if (tag && !tags.includes(tag)) {
          tags.push(tag);
          await setUserTags(tags);
          await updateDisplayNameWithTags();
          WA.ui.closePopup(popupId);
          showTagManagerPopup();
        }
      }
    },
    {
      label: "Remove",
      callback: async () => {
        const tag = prompt("Enter tag to remove:");
        const idx = tags.indexOf(tag);
        if (idx !== -1) {
          tags.splice(idx, 1);
          await setUserTags(tags);
          await updateDisplayNameWithTags();
          WA.ui.closePopup(popupId);
          showTagManagerPopup();
        }
      }
    },
    {
      label: "Close",
      callback: () => WA.ui.closePopup(popupId)
    }
  ]);
}

function addTagManagerButton() {
  WA.ui.actionBar.addButton({
    id: "tagManagerBtn",
    label: "Name Tags",
    tooltip: "Manage your interest tags",
    callback: showTagManagerPopup
  });
}

if (window.WA?.onInit) {
  WA.onInit().then(async () => {
    addTagManagerButton();
    // Fetch tags from Firestore (or dummy) and update display name on load
    await updateDisplayNameWithTags();
  });
}
