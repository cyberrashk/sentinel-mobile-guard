
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useToast } from './use-toast';

export const useMobilePermissions = () => {
  const [permissions, setPermissions] = useState({
    storage: false,
    notifications: false,
    camera: false,
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const { toast } = useToast();

  const requestStoragePermission = async () => {
    if (!Capacitor.isNativePlatform()) return true;
    
    try {
      const permission = await Filesystem.requestPermissions();
      const granted = permission.publicStorage === 'granted';
      setPermissions(prev => ({ ...prev, storage: granted }));
      
      if (granted) {
        toast({
          title: "Storage Permission Granted",
          description: "App can now access storage for real-time scanning.",
        });
      }
      
      return granted;
    } catch (error) {
      console.error('Storage permission error:', error);
      return false;
    }
  };

  const requestNotificationPermission = async () => {
    if (!Capacitor.isNativePlatform()) return true;
    
    try {
      const permission = await LocalNotifications.requestPermissions();
      const granted = permission.display === 'granted';
      setPermissions(prev => ({ ...prev, notifications: granted }));
      
      if (granted) {
        toast({
          title: "Notification Permission Granted",
          description: "You'll receive real-time threat alerts.",
        });
      }
      
      return granted;
    } catch (error) {
      console.error('Notification permission error:', error);
      return false;
    }
  };

  const requestAllPermissions = async () => {
    setIsRequesting(true);
    
    const storageGranted = await requestStoragePermission();
    const notificationGranted = await requestNotificationPermission();
    
    setIsRequesting(false);
    
    if (storageGranted && notificationGranted) {
      toast({
        title: "All Permissions Granted",
        description: "Mobile scanning is now fully enabled.",
      });
    }
    
    return { storage: storageGranted, notifications: notificationGranted };
  };

  const checkPermissions = async () => {
    if (!Capacitor.isNativePlatform()) {
      setPermissions({ storage: true, notifications: true, camera: true });
      return;
    }

    try {
      const [storageStatus, notificationStatus] = await Promise.all([
        Filesystem.checkPermissions(),
        LocalNotifications.checkPermissions()
      ]);
      
      setPermissions({
        storage: storageStatus.publicStorage === 'granted',
        notifications: notificationStatus.display === 'granted',
        camera: true, // Will be checked when needed
      });
    } catch (error) {
      console.error('Permission check error:', error);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    permissions,
    requestAllPermissions,
    requestStoragePermission,
    requestNotificationPermission,
    isRequesting,
    checkPermissions,
  };
};
