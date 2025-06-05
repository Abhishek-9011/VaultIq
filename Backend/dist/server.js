"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectDb_js_1 = require("./config/connectDb.js");
const user_route_js_1 = __importDefault(require("./routes/user.route.js"));
const content_route_js_1 = __importDefault(require("./routes/content.route.js"));
const share_route_js_1 = __importDefault(require("./routes/share.route.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, connectDb_js_1.connectDb)();
app.use("/api/v1", user_route_js_1.default);
app.use("/api/v1", content_route_js_1.default);
app.use("/api/v1", share_route_js_1.default);
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
