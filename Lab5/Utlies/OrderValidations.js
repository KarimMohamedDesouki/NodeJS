const Ajv = require("ajv");
const ajv = new Ajv();//creating object form Ajv


//#region StudentValid
let OrdersSchema = {
    type: "object", // declare the type of the data coming
    properties: {
        id: { type: "integer" },
        totalprice: { type: "integer", "minimum":100,"maximum":10000},
        items:{type: "array"}

    },
    required: ["id","totalprice","items"],
    additionalProperties: false
}
module.exports = ajv.compile(OrdersSchema);
//#endregion