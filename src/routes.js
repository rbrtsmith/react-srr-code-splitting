import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Secret from "./Secret";

export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/contact",
    component: Contact,
    exact: true,
  },
  {
    path: "/secret",
    component: Secret,
    exact: true,
  },
];
