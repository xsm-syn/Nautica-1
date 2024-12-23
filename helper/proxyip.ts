import { appendFileSync } from "node:fs";

interface ProxyStruct {
  address: string;
  port: number;
  country: string;
  org: string;
}

interface ProxyTestResult {
  error: boolean;
  message?: string;
  result?: {
    proxy: string;
    proxyip: boolean;
    ip: string;
    port: number;
    delay: number;
    country: string;
    asOrganization: string;
  };
}

const RAW_PROXY_LIST_FILE = "./rawProxyList.txt";
const PROXY_LIST_FILE = "./proxyList.txt";
const IP_RESOLVER_DOMAIN = "https://id1.foolvpn.me/api/v1/check";
const CONCURRENCY = 100;

const CHECK_QUEUE: string[] = [];

async function readProxyList(): Promise<ProxyStruct[]> {
  const proxyList: ProxyStruct[] = [];

  const proxyListString = (await Bun.file(RAW_PROXY_LIST_FILE).text()).split("\n");
  for (const proxy of proxyListString) {
    const [address, port, country, org] = proxy.split(",");
    proxyList.push({
      address,
      port: parseInt(port),
      country,
      org,
    });
  }

  Bun.write(PROXY_LIST_FILE, "");
  return proxyList;
}

async function checkProxy(proxyAddress: string, proxyPort: number): Promise<ProxyTestResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await Bun.fetch(IP_RESOLVER_DOMAIN + `?ip=${proxyAddress}:${proxyPort}`, {
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (res.status == 200) {
      return {
        error: false,
        result: await res.json(),
      };
    } else {
      throw new Error(res.statusText);
    }
  } catch (e: any) {
    return {
      error: true,
      message: e.message,
    };
  }
}

(async () => {
  const start = new Date().getTime();
  const proxyList = await readProxyList();
  const proxyChecked: string[] = [];
  const uniqueRawProxies: string[] = [];

  let proxySaved = 0;
  let finish = new Date().getTime();

  for (const proxy of proxyList) {
    const proxyKey = `${proxy.address}:${proxy.port}`;
    if (!proxyChecked.includes(proxyKey)) {
      proxyChecked.push(proxyKey);
      uniqueRawProxies.push(`${proxy.address},${proxy.port},${proxy.country},${proxy.org}`);
    } else {
      continue;
    }

    CHECK_QUEUE.push(proxyKey);
    checkProxy(proxy.address, proxy.port)
      .then((res) => {
        if (!res.error && res.result?.proxyip === true && res.result.country) {
          appendFileSync(
            PROXY_LIST_FILE,
            `${res.result?.proxy},${res.result?.port},${res.result?.country},${res.result?.asOrganization}\n`
          );

          proxySaved += 1;
          console.log(`Proxy disimpan:`, proxySaved);
        }
      })
      .finally(() => {
        CHECK_QUEUE.pop();
        finish = new Date().getTime();
      });

    if (CHECK_QUEUE.length >= CONCURRENCY) {
      await Bun.sleep(50);
    }
  }

  await Bun.sleep(3000);
  Bun.write(RAW_PROXY_LIST_FILE, uniqueRawProxies.join("\n"));

  console.log(`Waktu proses: ${((finish - start) / 1000).toFixed(2)} detik`);
})();
