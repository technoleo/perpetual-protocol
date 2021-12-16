const dotenv = require("dotenv")
const { resolve, join } = require("path")
dotenv.config({ path: resolve(__dirname, ".env") })

const ROOT_DIR = __dirname
const SRC_DIR_NAME = "src"
module.exports = {
    COVERAGE_URL: "http://127.0.0.1:8555",
    LOCALHOST_URL: "http://127.0.0.1:8545",
    ROPSTEN_URL: `${process.env["WEB3_ENDPOINT"]}`,
    KOVAN_URL: `${process.env["WEB3_KOVAN_ENDPOINT"]}`,
    RINKEBY_URL: `${process.env["WEB3_RINKEBY_ENDPOINT"]}`,
    HOMESTEAD_URL: `${process.env["WEB3_HOMESTEAD_ENDPOINT"]}`,
    SOKOL_URL: `${process.env["WEB3_SOKOL_ENDPOINT"]}`,
    XDAI_URL: `${process.env["WEB3_XDAI_ENDPOINT"]}`,
    AVAX_URL: `${process.env["WEB3_AVAX_ENDPOINT"]}`,
    ROPSTEN_MNEMONIC: process.env["ROPSTEN_MNEMONIC"] || "",
    KOVAN_MNEMONIC: process.env["KOVAN_MNEMONIC"] || "",
    RINKEBY_MNEMONIC: process.env["RINKEBY_MNEMONIC"] || "",
    HOMESTEAD_MNEMONIC: process.env["HOMESTEAD_MNEMONIC"] || "",
    SOKOL_MNEMONIC: process.env["SOKOL_MNEMONIC"] || "",
    XDAI_MNEMONIC: process.env["XDAI_MNEMONIC"] || "",
    AVAX_MNEMONIC: process.env["AVAX_MNEMONIC"] || "",
    ARTIFACTS_DIR: "./build/contracts",
    GAS: process.env["GAS_UNITS"] || 8000000,
    GAS_PRICE: process.env["GAS_PRICE"] || 70000000000,
    ROOT_DIR,
    SRC_DIR_NAME,
    SRC_DIR: join(ROOT_DIR, SRC_DIR_NAME),
    ETHERSCAN_API_KEY: process.env["ETHERSCAN_API_KEY"] || "",
    NEW_AGGREGATOR_ADDRESS: `${process.env["NEW_AGGREGATOR_ADDRESS"]}` || "",
    NEW_PRICE_FEED_KEY: `${process.env["NEW_PRICE_FEED_KEY"]}` || "",
    NEW_INSTANCE_NAME: `${process.env["NEW_INSTANCE_NAME"]}` || "",
    NEW_INSTANCE_PRICE: `${process.env["NEW_INSTANCE_PRICE"]}` || "",
}
