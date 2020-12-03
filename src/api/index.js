import axios from "@/plugins/axios";

// 在需要使用该api的地方直接import就好
export function TestAxios(params) {
  return axios({
    url: "test/url/",
    method: "POST",
    data: params
  });
}
