import favicon from "./extensions/favicon.ico";
import logo from "./extensions/logo.svg";

export default {
  config: {
    auth: {
      logo,
    },
    head: {
      favicon,
    },
    menu: {
      logo,
    },
    tutorials: false,
    notifications: { release: false },
    locales: ["sv"],
  },
  bootstrap(app) {
    console.log(app);
  },
};
