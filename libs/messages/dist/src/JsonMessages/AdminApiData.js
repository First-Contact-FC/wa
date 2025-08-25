"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOauthRefreshToken = exports.isUserRoomToken = exports.isAdminApiData = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
exports.isAdminApiData = zod_1.z.object({
    userUuid: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        example: "998ce839-3dea-4698-8b41-ebbdf7688ad9",
    }),
    email: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable(), {
        description: "The email of the current user.",
        example: "example@workadventu.re",
    }),
    roomUrl: (0, zod_openapi_1.extendApi)(zod_1.z.string(), { example: "/@/teamSlug/worldSlug/roomSlug" }),
    mapUrlStart: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "The full URL to the JSON map file",
        example: "https://myuser.github.io/myrepo/map.json",
    }),
    messages: zod_1.z.optional(zod_1.z.array(zod_1.z.unknown())),
});
exports.isUserRoomToken = zod_1.z.object({
    messages: zod_1.z.optional(zod_1.z.array(zod_1.z.unknown())),
    alg: zod_1.z.string(),
    iss: zod_1.z.string(),
    aud: zod_1.z.string(),
    iat: zod_1.z.number(),
    uid: zod_1.z.string(),
    user: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable(), {
        description: "The email of the current user.",
        example: "example@workadventu.re",
    }),
    room: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "The room URL of the current user.",
        example: "/@/teamSlug/worldSlug/roomSlug",
    }),
    exp: zod_1.z.number(),
});
exports.isOauthRefreshToken = zod_1.z.object({
    message: zod_1.z.string(),
    token: zod_1.z.string(),
});
//# sourceMappingURL=AdminApiData.js.map