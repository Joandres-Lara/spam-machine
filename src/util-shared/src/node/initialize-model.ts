import { Sequelize, Model, Options } from "sequelize";

const refInstance: {
 current: null | Sequelize;
} = {
 current: null,
};

export default function initializeModel(
 initialize: {
  (s: Sequelize): typeof Model;
 },
 config: Options
) {
 if (!refInstance.current) {
  refInstance.current = new Sequelize(config);
 }

 return initialize(refInstance.current);
}
