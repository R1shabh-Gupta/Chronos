import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

class Chronos {
  constructor(repoPath = ".") {
    this.repoPath = path.join(repoPath, ".chronos");
    this.objectsPath = path.join(this.repoPath, "objects");
    this.headPath = path.join(this.repoPath, "HEAD");
    this.indexPath = path.join(this.repoPath, "index");
    this.init();
  }

  async init() {
    await fs.mkdir(this.objectsPath, { recursive: true });
    try {
      await fs.writeFile(this.headPath, "", { flag: "wx" });

      await fs.writeFile(this.indexPath, JSON.stringify([]), { flag: "wx" });
    } catch (error) {
      console.log("Already initialized the .chronos directory");
    }
  }

  hashObject(content) {
    return crypto.createHash("sha1").update(content, "utf-8").digest("hex");
  }

  async add(fileToBeAdded) {
    const fileData = await fs.readFile(fileToBeAdded, { encoding: "utf-8" });
    const fileHash = this.hashObject(fileData);
    console.log(fileHash);
    const newFileHashedObjectPath = path.join(this.objectsPath, fileHash);
    await fs.writeFile(newFileHashedObjectPath, fileData);
    await this.updateStagingArea(fileToBeAdded, fileHash);
    console.log(`Added ${fileToBeAdded} to the index`);
  }

  async updateStagingArea(filePath, fileHash) {
    const index = JSON.parse(await fs.readFile(this.indexPath, "utf-8"));
    index.push({ path: filePath, hash: fileHash });
    await fs.writeFile(this.indexPath, JSON.stringify(index));
  }

  async commit(message) {
    const index = JSON.parse(await fs.readFile(this.indexPath, "utf-8"));
    const parentCommit = await this.getCurrentHead();

    const commitData = {
      timeStamp: new Date().toISOString(),
      message,
      files: index,
      parent: parentCommit,
    };

    const commitHash = this.hashObject(JSON.stringify(commitData));
    const commitPath = path.join(this.objectsPath, commitHash);
    await fs.writeFile(commitPath, JSON.stringify(commitData));
    await fs.writeFile(this.headPath, commitHash);
    await fs.writeFile(this.indexPath, JSON.stringify([]));
    console.log(`Committed sucessfully created: ${commitHash}`);
  }

  async getCurrentHead() {
    try {
      return await fs.readFile(this.headPath, "utf-8");
    } catch (error) {
      console.log("No commits yet");
      return null;
    }
  }

  async log() {
    let currentCommitHash = await this.getCurrentHead();

    while (currentCommitHash) {
      const commitData = JSON.parse(
        await fs.readFile(
          path.join(this.objectsPath, currentCommitHash),
          "utf-8"
        )
      );

      console.log("-".repeat(50));
      console.log(
        `Commit: ${currentCommitHash}\nDate: ${commitData.timeStamp}\n${commitData.message}\n\n`
      );

      currentCommitHash = commitData.parent;
    }
  }
}

(async () => {
  const chronos = new Chronos();
  await chronos.add("sample.txt");
  await chronos.commit("Second commit");
  await chronos.log();
})();
