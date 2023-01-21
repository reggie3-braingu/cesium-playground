import { NodePlopAPI } from "plop";
import { getNewComponentGenerator } from "./plop/scripts/new-component";
import { getNewUtilityGenerator } from "./plop/scripts/new-utility";
import { getNewCommonGenerator } from "./plop/scripts/new-common";
import { getInitGenerator } from "./plop/scripts/init";
import { getNewHookGenerator } from "./plop/scripts/new-hook";

module.exports = function (plop: NodePlopAPI) {
  getNewComponentGenerator(plop);
  getNewUtilityGenerator(plop);
  getNewCommonGenerator(plop);
  getInitGenerator(plop);
  getNewHookGenerator(plop);
};
