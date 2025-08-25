"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMetaTagFavicon = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
exports.isMetaTagFavicon = zod_1.z.object({
    rel: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "Device specification",
        example: "apple-touch-icon",
    }),
    sizes: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "Icon sizes",
        example: "57x57",
    }),
    src: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "Icon path",
        example: "https://workadventu.re/icons/apple-icon-57x57.png",
    }),
});
//# sourceMappingURL=MetaTagFavicon.js.map