import axios from "axios";

interface IPInfoProps {
  ip: string;
  city: string;
  region: string;
  country: string;
  timezone: string;
}

interface IPInfo {
  getInfo(): Promise<IPInfoProps>;
}

class IPInfoIO implements IPInfo {
  async getInfo(): Promise<IPInfoProps> {
    const url = "http://ipinfo.io";
    const response = await axios.get(url);
    return response.data;
  }
}

export default new IPInfoIO();

export { IPInfoProps };
