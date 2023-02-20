export default {
    async fetch(request, env) {
      const Day0 = 'a.ae1085.eu.org'
      const Day1 = 'a.ae1085.eu.org'
      const Day2 = 'a.ae1085.eu.org'
      const Day3 = 'a.ae1085.eu.org'
      const Day4 = 'a.ae1085.eu.org'
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
