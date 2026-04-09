import * as fs from 'fs';
import os from 'os';
import path from 'path';

import { Contact, Room } from 'wechaty';

const tmpDir = os.tmpdir();

export default class MiscHelper {
  static async fileExists(p: string) {
    try {
      await fs.promises.stat(p);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async download(url: string, filePath: string) {
    if (await this.fileExists(filePath)) return true;
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    await fs.promises.writeFile(filePath, Buffer.from(buffer));
    return true;
  }

  static async deleteFile(p: string) {
    return new Promise<void>((resolve) => fs.unlink(p, (_) => resolve()));
  }

  static async createTmpFile(filename: string) {
    const filepath = path.join(tmpDir, filename);
    try {
      // Touch: create file if it doesn't exist, update mtime if it does
      const fd = await fs.promises.open(filepath, 'a');
      await fd.close();
    } catch (error) {}
  }

  static async listTmpFile(startsWith: string) {
    return new Promise<string[]>((resolve) => {
      fs.readdir(tmpDir, (err, files) => {
        if (err) {
          resolve([]);
          return;
        }
        resolve(files.filter((f) => f.startsWith(startsWith)));
      });
    });
  }

  static async deleteTmpFile(filename: string) {
    const filepath = path.join(tmpDir, filename);
    await this.deleteFile(filepath);
  }

  static async getFriendlyName(contact: Contact | Room) {
    return contact['name']?.() || (await contact['topic']?.());
  }
}
