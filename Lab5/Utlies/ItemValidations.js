const Ajv = require("ajv");
const ajv = new Ajv();//creating object form Ajv


//#region StudentValid
let ItemsSchema = {
    type: "object", // declare the type of the data coming
    properties: {
        id: { type: "integer"},
        name:{type: "string","minLength":3},
        price: { type: "integer", "minimum":50,"maximum":1000},
        desc:{type: "string","minLength":15}
        

    },
    required: ["id","name","price","desc"],
    additionalProperties: false
}
module.exports = ajv.compile(ItemsSchema);
//#endregion