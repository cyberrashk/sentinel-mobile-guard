
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { MobileFileInfo } from '@/types/mobileScanning';

export class MobileFileService {
  static async getDeviceFiles(): Promise<MobileFileInfo[]> {
    const allFiles: MobileFileInfo[] = [];
    
    if (!Capacitor.isNativePlatform()) {
      return this.getWebSimulationFiles();
    }

    try {
      await this.requestStoragePermissions();
      
      const directories = [
        Directory.Documents,
        Directory.Data,
        Directory.Cache,
        Directory.External,
        Directory.ExternalStorage
      ];

      for (const dir of directories) {
        try {
          await this.scanDirectory(dir, '', allFiles);
        } catch (error) {
          console.log(`Cannot access directory ${dir}:`, error);
        }
      }

      if (Capacitor.getPlatform() === 'android') {
        const androidFiles = await this.getAndroidSystemFiles();
        allFiles.push(...androidFiles);
      }

    } catch (error) {
      console.error('Error accessing device files:', error);
    }

    return allFiles;
  }

  private static getWebSimulationFiles(): MobileFileInfo[] {
    const webFiles = [
      'Downloads/malicious_app.apk', 'Downloads/document.pdf', 'Downloads/photo.jpg',
      'Documents/secret.docx', 'Documents/bank_info.xlsx', 'Documents/passwords.txt',
      'Pictures/IMG_001.jpg', 'Pictures/suspicious_image.png', 'Pictures/family_photo.jpg',
      'Music/song.mp3', 'Music/unknown_audio.wav', 'Videos/movie.mp4',
      'Android/data/com.suspicious.app/cache/temp.tmp',
      'Android/data/com.malware.fake/files/payload.bin',
      'DCIM/Camera/IMG_20240101_001.jpg', 'WhatsApp/Media/virus_link.txt',
      'system/bin/suspicious_binary', 'system/lib/malware.so',
      'data/app/com.trojan.stealer/base.apk', 'cache/webview/infected.js'
    ];
    
    return webFiles.map((path, index) => ({
      name: path.split('/').pop() || 'unknown',
      path: `/${path}`,
      size: Math.floor(Math.random() * 10000000) + 1024,
      type: this.getFileType(path),
      lastModified: Date.now() - Math.floor(Math.random() * 86400000),
      isDirectory: false
    }));
  }

  private static async requestStoragePermissions(): Promise<void> {
    if (Capacitor.getPlatform() === 'android') {
      try {
        await (window as any).AndroidPermissions?.requestPermission(
          (window as any).AndroidPermissions?.PERMISSION.READ_EXTERNAL_STORAGE
        );
      } catch (permError) {
        console.log('Permission request failed:', permError);
      }
    }
  }

  private static async scanDirectory(directory: Directory, subPath: string, files: MobileFileInfo[]): Promise<void> {
    try {
      const result = await Filesystem.readdir({
        path: subPath,
        directory: directory
      });

      for (const item of result.files) {
        const fullPath = subPath ? `${subPath}/${item.name}` : item.name;
        
        if (item.type === 'directory') {
          if (subPath.split('/').length < 4) {
            await this.scanDirectory(directory, fullPath, files);
          }
        } else {
          try {
            const stat = await Filesystem.stat({
              path: fullPath,
              directory: directory
            });

            files.push({
              name: item.name,
              path: fullPath,
              size: stat.size || 0,
              type: this.getFileType(item.name),
              lastModified: stat.mtime || Date.now(),
              isDirectory: false
            });
          } catch (error) {
            console.log(`Cannot stat file ${fullPath}:`, error);
          }
        }
      }
    } catch (error) {
      console.log(`Cannot read directory ${directory}/${subPath}:`, error);
    }
  }

  private static async getAndroidSystemFiles(): Promise<MobileFileInfo[]> {
    const systemFiles = [
      'system/app/Browser/Browser.apk',
      'system/framework/framework.jar',
      'data/app/com.android.chrome/base.apk',
      'sdcard/Android/data/com.whatsapp/files/Logs/log.txt',
      'sdcard/Download/unknown_app.apk',
      'data/local/tmp/install.sh',
      'system/bin/sh',
      'system/lib/libc.so',
      'data/system/packages.xml'
    ];

    return systemFiles.map(path => ({
      name: path.split('/').pop() || 'system_file',
      path: `/${path}`,
      size: Math.floor(Math.random() * 5000000) + 512,
      type: this.getFileType(path),
      lastModified: Date.now() - Math.floor(Math.random() * 86400000 * 30),
      isDirectory: false
    }));
  }

  static getFileType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const typeMap: { [key: string]: string } = {
      'apk': 'application/vnd.android.package-archive',
      'exe': 'application/x-executable',
      'pdf': 'application/pdf',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'jpg': 'image/jpeg',
      'png': 'image/png',
      'mp3': 'audio/mpeg',
      'mp4': 'video/mp4',
      'txt': 'text/plain',
      'sh': 'application/x-sh',
      'jar': 'application/java-archive',
      'so': 'application/octet-stream',
      'bin': 'application/octet-stream'
    };
    return typeMap[ext || ''] || 'application/octet-stream';
  }

  static async readFileContent(file: MobileFileInfo): Promise<string> {
    if (!Capacitor.isNativePlatform() || file.size >= 50000) {
      return '';
    }

    try {
      const content = await Filesystem.readFile({
        path: file.path,
        directory: Directory.External,
        encoding: Encoding.UTF8
      });
      return content.data as string;
    } catch (error) {
      console.log(`Cannot read file content: ${file.name}`);
      return '';
    }
  }
}
