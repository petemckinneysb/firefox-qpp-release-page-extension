import * as fs from "fs";

const templateString = fs.readFileSync("./template/template.html");

fs.readFile("./background.js", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\`(\n|.)*?\`/, `\`${templateString}\``);

  fs.writeFile("./background.js", result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});
