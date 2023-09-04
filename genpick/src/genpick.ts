import * as fs from "fs";

export function main() {
  const directoryPath = process.argv[2];

  if (!directoryPath) {
    console.error("No directory path provided");
    return;
  }

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      console.log(file);
    });
  });
}
