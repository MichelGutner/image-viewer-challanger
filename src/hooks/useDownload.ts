import { useDispatch } from 'react-redux';
import { updateProgress, updateStatus } from '@/store/downloadSlice';
import { download } from '@kesha-antonov/react-native-background-downloader';
import { DOWNLOAD_FOLDER } from '@/constants';
import RNFS from 'react-native-fs';

export const useDownloader = () => {
  const dispatch = useDispatch();

  const startDownload = (id: string, url: string, destination: string) => {
    const task = download({
      id,
      url,
      destination,
    })
      .begin(() => {
        dispatch(updateStatus({ id, status: 'downloading' }));
      })
      .progress(({ bytesDownloaded, bytesTotal }) => {
        const percent = (bytesDownloaded / bytesTotal) * 100;
        dispatch(updateProgress({ id, progress: percent }));
      })
      .done(() => {
        dispatch(updateStatus({ id, status: 'completed' }));
        dispatch(updateProgress({ id, progress: 100 }));
      })
      .error(() => {
        dispatch(updateStatus({ id, status: 'failed' }));
      });

    return task;
  };

  const deleteDownload = (filename: string, onSuccess?: () => void) => {
    const filepath = `${DOWNLOAD_FOLDER}/${filename}`;

    RNFS.exists(filepath)
      .then(result => {
        if (result) {
          return RNFS.unlink(filepath)
            .then(() => {
              dispatch(updateStatus({ id: filename, status: 'deleted' }));
              dispatch(updateProgress({ id: filename, progress: 0 }));
              onSuccess?.();
            })
            .catch(err => {
              console.log(err.message);
            });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return { startDownload, deleteDownload };
};
