import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class notification {
  configure = () => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: Platform.OS == 'ios',
    });
  };
  createChannel = (channel) => {
    PushNotification.createChannel(
      {
        channelId: channel, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  kirimNotif = (channel, notifTitle, notifMessage) => {
    PushNotification.localNotification({
      channelId: channel,
      title: notifTitle,
      message: notifMessage,
    });
  };
  scheduleNotif = (channel, judul, pesan, alarm) => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: channel,
      message: pesan, // (required),
      title: judul,
      date: new Date(alarm), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    });
  };
}

export const notifikasi = new notification();
