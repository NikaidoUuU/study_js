const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

// promise 사용할 수 있게 감싸줌
const read = promisify(readFile);
const write = promisify(writeFile);

async function writeAndRead(data = "") {
  try {
    await write("test.txt", data);
    return await read("test.txt");
  } catch (e) {
    console.error(e);
  }
}

writeAndRead("안뇽");
