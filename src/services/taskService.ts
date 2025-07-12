import RNBackgroundDownloader, {
  download,
  DownloadOption,
} from '@kesha-antonov/react-native-background-downloader';

export const executeDownloadTask = (
  filename: string,
  downloadProps: Omit<DownloadOption, 'destination'>,
) => {
  const destination = `${RNBackgroundDownloader.directories.documents}/${filename}`;
  return download({
    ...downloadProps,
    destination,
  });
};

export const stopAllTasks = async () => {
  const oldTask = await RNBackgroundDownloader.checkForExistingDownloads();
  oldTask.forEach(task => task.stop());
};

export const retrieveAndStartExistentsTasks = () => {
  return RNBackgroundDownloader.checkForExistingDownloads();
};
