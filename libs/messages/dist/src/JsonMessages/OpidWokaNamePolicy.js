"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpidWokaNamePolicy = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
exports.OpidWokaNamePolicy = (0, zod_openapi_1.extendApi)(zod_1.z.enum(["user_input", "allow_override_opid", "force_opid", ""]), {
    example: "['user_input', 'allow_override_opid', 'force_opid']",
})
    .optional()
    .nullable();
//# sourceMappingURL=OpidWokaNamePolicy.js.map