import { LayoutMode } from "./utils/enums";

interface Config {
  layout: LayoutMode;
  apiBaseURL: string;
}

const config: Config = {
  layout: LayoutMode.Side,
  apiBaseURL: "https://api.yuanjiazc.com/admin",
};

export default config;
