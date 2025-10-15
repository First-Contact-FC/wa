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

if (userIsAdmin) { // Replace with actual admin check
  WA.ui.actionBar.addButton({
    id: "announceBtn",
    label: "Send Announcement",
    tooltip: "Broadcast a public announcement",
    callback: () => {
      WA.event.broadcast("announcement", {
        text: "🚨 Public Announcement: The event starts now!",
        sender: "Admin"
      });
    }
  });
}

if (window.WA?.onInit) {
  WA.onInit().then(() => {
  WA.event.on("announcement").subscribe((event) => {
    const { text, sender } = event.data;
    WA.chat.sendChatMessage(text, sender || "System");
    // this is for showing a popup if needed
    WA.ui.openPopup("announcementPopup", text, []);
  })
})
}
