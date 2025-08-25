"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCapabilities = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
exports.isCapabilities = zod_1.z.object({
    "api/companion/list": (0, zod_openapi_1.extendApi)(zod_1.z.optional(zod_1.z.string()), {
        description: "Means the api implements a companion list",
        example: "v1",
    }),
    "api/woka/list": (0, zod_openapi_1.extendApi)(zod_1.z.optional(zod_1.z.string()), {
        description: "Means the api implements woka list, This capability will be added regardless",
        example: "v1",
    }),
    "api/domain/verify": (0, zod_openapi_1.extendApi)(zod_1.z.optional(zod_1.z.string()), {
        description: "Means the api can validate if a domain is a legitimate domain. Needed if you do OAuth login AND your WorkAdventure install supports multiple domains.",
        example: "v1",
    }),
    "api/save-name": (0, zod_openapi_1.extendApi)(zod_1.z.optional(zod_1.z.string()), {
        description: "Means the api can save the name of the Woka when configured in WorkAdventure.",
        example: "v1",
    }),
    "api/save-textures": (0, zod_openapi_1.extendApi)(zod_1.z.optional(zod_1.z.string()), {
        description: "Means the api can save the textures of the Woka when configured in WorkAdventure.",
        example: "v1",
    }),
});
//# sourceMappingURL=CapabilitiesData.js.map