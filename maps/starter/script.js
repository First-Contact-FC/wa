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

function checkNotifications() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Convert to IST (offset +5:30)
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const istHour = istTime.getUTCHours();

  // Between 21:00 and 23:00 IST
  if (istHour >= 21 && istHour < 23) {
    triggerThemeNotifications();
  }
}

function triggerThemeNotifications() {
  // personal message with custom author ('System' here)
  WA.chat.sendChatMessage(
    "🔔 Reminder: Themed Hours are active now!",
    "System"
  );

  // Map layer changes 
  WA.room.showLayer("themed-hours-layer");

  // Popup with today’s theme
  WA.room.onEnterZone("pop", () => {
    WA.chat.sendChatMessage("Welcome");
    currentPopup = WA.ui.openPopup(
      "popup1",
      "Welcome to the special area! 🎉\nEnjoy your stay.",
      []
    );
  });
  WA.room.onLeaveZone("pop", () => {
    if (currentPopup) {
      currentPopup.close();
      currentPopup = undefined;
    }
  });

}

if (window.WA?.onInit) {
  WA.onInit().then(async () => {
    checkNotifications()
  })
}
