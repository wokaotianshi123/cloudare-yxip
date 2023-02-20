export default {
    async fetch(request, env) {
      const Day0 = '4klu.yooki.workers.dev'
      const Day1 = '4klu.yooki.workers.dev'
      const Day2 = '4klu.yooki.workers.dev'
      const Day3 = '4klu.yooki.workers.dev'
      const Day4 = '4klu.yooki.workers.dev'
      let host = ''
      let nd = new Date();
        let day = nd.getDate() % 5;
        if (day === 0) {
            host = Day0
        } else if (day === 1) {
            host = Day1
        } else if (day === 2) {
            host = Day2
        } else if (day === 3){
            host = Day3
        } else if (day === 4){
            host = Day4
        } else {
            host = Day1
        }

      let url = new URL(request.url);
      if (url.pathname.startsWith('/')) {
        url.hostname=host;
        let new_request=new Request(url,request);
        return fetch(new_request);
      }
      // Otherwise, serve the static assets.
      return env.ASSETS.fetch(request);
    }
  };
