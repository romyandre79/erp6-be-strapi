require("dotenv").config();
const path = require("path");

module.exports = {
  apps: [
    {
      name: "erp6-be-strapi",
      // panggil langsung node + file js Strapi CLI
      script: process.execPath, // ini langsung resolve ke node.exe / node di Linux
      args: path.join("node_modules", "@strapi", "strapi", "bin", "strapi.js") + " develop",
      cwd: "c:/lara/www/erp6-be-strapi",
      env: {
        NODE_ENV: process.env.NODE_ENV || "production",
        HOST: process.env.HOST || "0.0.0.0",
        PORT: process.env.PORT || 1337,

        DATABASE_CLIENT: process.env.DATABASE_CLIENT,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

        APP_KEYS: process.env.APP_KEYS,
        API_TOKEN_SALT: process.env.API_TOKEN_SALT,
        ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
        TRANSFER_TOKEN_SALT: process.env.TRANSFER_TOKEN_SALT,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
      }
    }
  ]
}
