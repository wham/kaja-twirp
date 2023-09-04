import { Model } from "./Model";
import { model } from "./gen/kt";

export function loadModel(): Model {
  return {
    services: [],
    extraLibs: [],
  };
}
