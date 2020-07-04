import fs from 'fs';
import tmpDir from 'temp-dir';
import path from 'path';

interface ITmpFile {
  recentContact?: { name: string; locked?: boolean };
}

export function writeFile(filename: string, content: ITmpFile) {
  const filepath = path.join(tmpDir, filename);

  return new Promise(resolve => {
    fs.writeFile(filepath, JSON.stringify(content), { encoding: 'utf8' }, () => resolve());
  });
}

export function readFile(filename: string) {
  const filepath = path.join(tmpDir, filename);

  return new Promise<ITmpFile>(resolve => {
    fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
      let content: ITmpFile = {};

      try {
        content = JSON.parse(data);
      } catch (error) {}

      resolve(content);
    });
  });
}