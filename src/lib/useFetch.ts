import { Config } from "../config/config";

export async function useFetch(action: string, payload?: any, awaitResponse?: boolean) {
  const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : Config.resName;
  const url = `https://${resourceName}/${action}`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload) {
    requestOptions.body = JSON.stringify(payload);
  }

  if (awaitResponse) {
    const resp = await fetch(url, requestOptions);
    return resp.json();
  } else {
    return fetch(url, requestOptions);
  }
}
