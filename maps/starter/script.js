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

const teleportWaypoints = [
  { name: "Spawn/Entrance", x: 500, y: 500 },
  { name: "Meeting Room", x: 1000, y: 800 },
  { name: "Social Area", x: 1500, y: 600 },
  { name: "Workshop Zone", x: 800, y: 1200 },
  { name: "Quiet Zone", x: 1800, y: 1000 }
];

function showTeleportMenu() {
  const popupId = "teleportMenuPopup";
  let text = "Quick Teleport Menu\n\nSelect a location:\n\n";
  
  const buttons = teleportWaypoints.map((waypoint, index) => ({
    label: waypoint.name,
    callback: () => {
      WA.player.moveTo(waypoint.x, waypoint.y, 15); // 15 is the speed
      console.log(`[Teleport] Moving to ${waypoint.name} (${waypoint.x}, ${waypoint.y})`);
      WA.chat.sendChatMessage(`Teleporting to ${waypoint.name}...`, "System");
      WA.ui.closePopup(popupId);
    }
  }));
  
  // Add a close button
  buttons.push({
    label: "Cancel",
    callback: () => WA.ui.closePopup(popupId)
  });
  
  WA.ui.openPopup(popupId, text, buttons);
}

function addTeleportButton() {
  WA.ui.actionBar.addButton({
    id: "quickTeleportBtn",
    label: "Quick Teleport",
    tooltip: "Teleport to key locations",
    callback: showTeleportMenu
  });
  console.log("[Teleport] Quick teleport button added");
}

if (window.WA?.onInit) {
  WA.onInit().then(async () => {
    addTeleportButton();
  });
}
