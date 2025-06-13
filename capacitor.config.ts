
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.1087f3e1b00b4843a1da41500c287198',
  appName: 'sentinel-mobile-guard',
  webDir: 'dist',
  server: {
    url: 'https://1087f3e1-b00b-4843-a1da-41500c287198.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
