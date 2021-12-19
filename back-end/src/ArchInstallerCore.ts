import IPInfo, { IPInfoProps } from "./utils/IPInfo";
import { sleep } from "./utils";

class ArchInstaller {
  preInstall = false;
  disks = false;
  ipInfo?: IPInfoProps;

  constructor() {
    this.load();
  }

  async load() {
    console.log("loading....");
    this.ipInfo = await IPInfo.getInfo();
    console.log("load ok");
  }

  async getIPInfo() {
    for (;;) {
      if (this.ipInfo) {
        return this.ipInfo;
      }
      await sleep(100);
    }
  }
}

export default new ArchInstaller();
