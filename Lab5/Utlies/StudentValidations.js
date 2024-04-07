const Ajv = require("ajv");
const ajv = new Ajv();//creating object form Ajv

//#region StudentValid
let StudentsSchema = {
    type: "object", // declare the type of the data coming
    properties: {
        name: { type: "string", "minLength":3 },
        age: { type: "integer", "minimum":10 },
        dept:{type: "string",enum:["SD","OS","AI"]}
    },
    required: ["name","age","dept"],
    additionalProperties: false
}
module.exports = ajv.compile(StudentsSchema);
//#endregion