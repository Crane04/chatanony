import { launchImageLibrary } from 'react-native-image-picker';

const selectImage = async () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.errorCode) {
        reject(response.errorMessage);
      } else {
        const asset = response.assets[0];
        resolve({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        });
      }
    });
  });
};
