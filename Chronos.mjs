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
}

const chronos = new Chronos();
