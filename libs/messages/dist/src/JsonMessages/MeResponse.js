"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeResponse = exports.MeSuccessResponse = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
const ErrorApiData_1 = require("./ErrorApiData");
exports.MeSuccessResponse = (0, zod_openapi_1.extendApi)(zod_1.z.object({
    status: zod_1.z.literal("ok"),
    authToken: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "The authToken.",
    }),
    userUuid: (0, zod_openapi_1.extendApi)(zod_1.z.string(), {
        description: "A unique identifier for the user.",
    }),
    email: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable().optional(), {
        description: "The email of the user.",
    }),
    username: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable().optional(), {
        description: "The name of the Woka.",
        example: "John",
    }),
    locale: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable().optional(), {
        description: "The locale (if returned by OpenID Connect).",
    }),
    /*textures: extendApi(z.array(z.object({
        id: extendApi(z.string(), {
            description:
                "The id of the texture.",
        }),
    })), {
        description:
            "The textures of the Woka.",
    }),*/
    visitCardUrl: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable().optional(), {
        description: "The visit card URL of the Woka.",
    }),
    isCharacterTexturesValid: (0, zod_openapi_1.extendApi)(zod_1.z.boolean(), {
        description: "True if the character textures are valid, false if we need to redirect the user to the Woka selection page.",
        example: true,
    }),
    isCompanionTextureValid: (0, zod_openapi_1.extendApi)(zod_1.z.boolean(), {
        description: "True if the companion texture is valid, false if we need to redirect the user to the companion selection page.",
        example: true,
    }),
    matrixUserId: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable().optional(), {
        description: "The matrix user id of the user.", // Note: do we need this with OpenID Connect?
    }),
    matrixServerUrl: (0, zod_openapi_1.extendApi)(zod_1.z.string().nullable().optional(), {
        description: "The matrix server url for this user.",
    }),
    /*isMatrixRegistered: extendApi(z.boolean(), {
        description:
            "???",
    }),*/
}), {
    description: 'This is a response to the /me endpoint.',
});
exports.MeResponse = zod_1.z.union([exports.MeSuccessResponse, ErrorApiData_1.ErrorApiData]);
//# sourceMappingURL=MeResponse.js.map