// / <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

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
let db = DUMMY_DB;

function log(...a) {
  console.log("[WA GlobalChat]", ...a);
}

async function initFirebaseIfNeeded() {
  if (initialized) return;
  // No-op for dummy
  initialized = true;
  log("Dummy Firestore initialized");
}

async function getUserTags() {
  await initFirebaseIfNeeded();
  const playerId = WA.player.uuid || WA.player.id || WA.player.name;
  if (!playerId) return [];
  if (!db.players[playerId]) {
    db.players[playerId] = { tags: [] };
  }
  return db.players[playerId].tags || [];
}

async function setUserTags(tags) {
  await initFirebaseIfNeeded();
  const playerId = WA.player.uuid || WA.player.id || WA.player.name;
  if (!playerId) return;
  if (!db.players[playerId]) {
    db.players[playerId] = { tags: [] };
  }
  db.players[playerId].tags = tags;
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
    // Fetch tags from Firestore and update display name on load
    await updateDisplayNameWithTags();
  });
}