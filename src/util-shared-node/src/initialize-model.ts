import { Sequelize, Options } from "sequelize";

const refInstance: {
 current: null | Sequelize;
} = {
 current: null,
};

export default function initializeModel<T>(
 initialize: {
  (s: Sequelize): T;
 },
 config: Options
) {
 if (!refInstance.current) {
  refInstance.current = new Sequelize(config);
 }

 return initialize(refInstance.current);
}
