import util from "util";
import { exec } from "child_process";
import dns from "dns";

const execPromise = util.promisify(exec);

const isRoot = async () => {
  const command = "[ -w /etc/shadow ]";
  try {
    await execPromise(command);
    return true;
  } catch (err) {
    return false;
  }
};

const isOnline = () => {
  return new Promise((resolve) => {
    dns.resolve("www.google.com", (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

export { execPromise, isOnline, isRoot };
