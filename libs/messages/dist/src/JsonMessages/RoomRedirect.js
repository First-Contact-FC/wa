"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoomRedirect = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
exports.isRoomRedirect = zod_1.z.object({
    redirectUrl: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "The WorkAdventure URL to redirect to.",
        example: "https://play.yourserver.com/_/global/example.com/start.json",
    }),
});
//# sourceMappingURL=RoomRedirect.js.map