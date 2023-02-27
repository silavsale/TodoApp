// This can be an additional module to Document API Endpoints
// WIP
import { Express, Request, Response } from "express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { version } from "../../package.json"

import log from "./logger"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {},
  },
}
