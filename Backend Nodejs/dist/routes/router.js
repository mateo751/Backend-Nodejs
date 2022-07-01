"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const writer_controller_1 = require("./controllers/writer.controller");
const router = (app) => {
    app.post("/writer", writer_controller_1.createWriter);
    app.get("/writer/:id", writer_controller_1.retrieveWriter);
    app.put("/writers/:id", writer_controller_1.updateWriter);
    app.delete("/writers/:id", writer_controller_1.deleteWriter);
    app.get("/writers", writer_controller_1.listWriters);
};
exports.router = router;
