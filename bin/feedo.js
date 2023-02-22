#!/usr/bin/env node
import dotenv from "dotenv";

dotenv.config();

const cli = (await import("../cli/index.js")).default;

await cli();
