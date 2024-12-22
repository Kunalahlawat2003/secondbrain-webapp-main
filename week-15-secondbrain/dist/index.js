"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const content_1 = require("./content");
const link_1 = require("./link");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.options("*", (0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: 'https://secondbrain-webapp-rosy.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/content", content_1.contentRouter);
app.use("/api/v1/link", link_1.LinkRouter);
const url = `https://secondbrain-backend-rcc4p0sdc-kunalahlawats-projects.vercel.app/`; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)
function reloadWebsite() {
    axios_1.default.get(url)
        .then(response => {
        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
        .catch(error => {
        console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}
setInterval(reloadWebsite, interval);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
