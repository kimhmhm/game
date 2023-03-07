import introJs from "./intro.js";
import gameMenu from "./gameMenu.js";
import rulet from "./rulet.js";
import work from "./work.js";
import yabawee from "./yabawee.js";

const gameList = {
  rulet: rulet,
  work : work,
  yabawee : yabawee,
}

introJs(()=>{
  // gameMenu({rulet, work})
  gameMenu(gameList)
})