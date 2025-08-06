import type { GeolocationPosition, Position } from './types';

import Geolocation from '@react-native-community/geolocation';
import i18next from 'i18next';
import { Alert, Linking } from 'react-native';

export const locationService = {
  async getCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`${i18next.t('weatherapp:weather.location.error_location')}: ${error.message}`));
        },
        {
          enableHighAccuracy: false,
          maximumAge: 30_000, // 30 seconds
          timeout: 15_000, // 15 seconds
        }
      );
    });
  },

  async handleBlockedPermission(): Promise<void> {
    const shouldOpenSettings = await this.showSettingsAlert();
    if (shouldOpenSettings) {
      await Linking.openSettings();
    }
  },

  async requestLocationWithFlow(): Promise<Position | undefined> {
    // Step 1: Try to get current position (iOS will show permission dialog automatically)
    const position = await this.tryGetCurrentPosition();
    if (position) {
      return position;
    }

    // Step 2: If failed, show settings alert
    await this.handleBlockedPermission();
    return undefined;
  },

  async showSettingsAlert(): Promise<boolean> {
    return new Promise((resolve) => {
      Alert.alert(
        i18next.t('weatherapp:weather.location.permission_blocked_title'),
        i18next.t('weatherapp:weather.location.permission_blocked_message'),
        [
          {
            onPress: () => {
              resolve(false);
            },
            style: 'cancel',
            text: i18next.t('weatherapp:weather.location.button_not_now'),
          },
          {
            onPress: () => {
              resolve(true);
            },
            text: i18next.t('weatherapp:weather.location.button_open_settings'),
          },
        ]
      );
    });
  },

  async tryGetCurrentPosition(): Promise<Position | undefined> {
    try {
      const position = await this.getCurrentPosition();
      return position;
    } catch (error) {
      // Check if it's a permission error vs other error
      if (error instanceof Error) {
        console.warn('Error details:', {
          message: error.message,
          name: error.name,
        });
      }
      return undefined;
    }
  },
};
