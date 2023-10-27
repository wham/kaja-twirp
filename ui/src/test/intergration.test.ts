import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import { loadProject } from "../client/projectLoader";

test("integration", () => {
  console.log(process.cwd());
  const protoPath = path.resolve(process.cwd(), "../proto");
  const outPath = path.resolve(process.cwd(), "../ui/src/test/protoc");
  console.log("protoPath", protoPath);

  fs.mkdir(outPath, { recursive: true }, (error) => {
    if (error) {
      console.error("An error occurred:", error);
    } else {
      console.log("Directory created or already exists");
    }
  });

  return new Promise((resolve, reject) => {
    exec(`protoc --ts_out ${outPath} --ts_opt long_type_string -I${protoPath} $(find ${protoPath} -iname "*.proto")`, (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error: ${error}`);
        reject(error);
      }

      console.log(`stdout: ${stdout}`);

      loadProject()
        .then((project) => {
          fs.writeFileSync(path.resolve(process.cwd(), "../ui/src/test/project.actual.json"), JSON.stringify(project, null, 2));
          expect(fs.readFileSync(path.resolve(process.cwd(), "../ui/src/test/project.actual.json"))).toEqual(
            fs.readFileSync(path.resolve(process.cwd(), "../ui/src/test/project.expected.json")),
          );
          resolve(project);
        })
        .catch((error) => {
          console.error("error", error);
          reject(error);
        });
    });
  });
});
