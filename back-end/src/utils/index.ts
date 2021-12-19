import util from "util";
import { exec } from "child_process";
import dns from "dns";
import IPInfo from "./IPInfo";

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

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { execPromise, isOnline, isRoot, IPInfo, sleep };
