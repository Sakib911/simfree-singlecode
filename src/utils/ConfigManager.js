import remoteConfig from "@react-native-firebase/remote-config";

export default class ConfigManager {
  static content;
  static instance;

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async initRemoteConfigs() {
    await remoteConfig().fetch(3600);
    remoteConfig()
      .setDefaults({
        content: {},
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(() => {
        this.setContent(JSON.parse(remoteConfig().getValue("content")._value));
      })
      .catch((e) => {
        console.log("Error initializing remote configs", e);
      });
  }

  setContent(content) {
    ConfigManager.content = content;
  }
}
