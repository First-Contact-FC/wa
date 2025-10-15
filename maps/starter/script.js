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

const eventSchedule = [
  { name: "Morning Yoga", start: "09:00", end: "10:00", zone: "yogaZone", popupId: "yogaPopup", popupText: "🧘 Morning Yoga is live! Join in for a refreshing start." },
  { name: "Team Meeting", start: "10:30", end: "11:30", zone: "meetingZone", popupId: "meetingPopup", popupText: "👥 Team Meeting is happening now. Collaborate and share ideas!" },
  { name: "Lunch Break", start: "13:00", end: "14:00", zone: "lunchZone", popupId: "lunchPopup", popupText: "🍽️ Lunch Break! Grab a bite and relax." },
  { name: "Workshop: Web Dev", start: "15:00", end: "16:30", zone: "workshopZone", popupId: "workshopPopup", popupText: "💻 Web Dev Workshop is live! Level up your skills." },
  { name: "Evening Social", start: "18:00", end: "20:00", zone: "pop", popupId: "popup1", popupText: "🎉 Evening Social! Connect and have fun." },
  { name: "Midnight", start: "23:00", end: "00:00", zone: "midnightZone", popupId: "midnightPopup", popupText: "🌙 Midnight Hour! Wind down and chat." }
];

function getCurrentEvent(schedule) {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  const currentTime = pad(now.getHours()) + ":" + pad(now.getMinutes());

  for (const event of schedule) {
    if (currentTime >= event.start && currentTime < event.end) {
      return event;
    }
  }
  return null;
}

// Register zone handlers for all events
function registerEventZones() {
  eventSchedule.forEach(event => {
    WA.room.onEnterZone(event.zone, () => {
      const currentEvent = getCurrentEvent(eventSchedule);
      if (currentEvent && currentEvent.name === event.name) {
        // Only show popup if this event is live
        if (currentPopup) currentPopup.close();
        currentPopup = WA.ui.openPopup(event.popupId, event.popupText, []);
      }
    });
    WA.room.onLeaveZone(event.zone, () => {
      if (currentPopup) {
        currentPopup.close();
        currentPopup = undefined;
      }
    });
  });
}

if (window.WA?.onInit) {
  WA.onInit().then(() => {
    registerEventZones();
  });
}