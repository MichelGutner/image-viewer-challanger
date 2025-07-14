import Realm, { index, ObjectSchema } from 'realm';

export class Image extends Realm.Object {
  id?: string;
  author?: string;
  filename?: string;
  url?: string;
  download_url?: string;
  downloadStatus?: string;
  createdAt?: string;
  deletedAt?: string;

  static createBlank(data: Partial<Image>) {
    return {
      ...data,
      createdAt: new Date(),
      downloadStatus: 'blank',
    };
  }

  static createPlaceholder(data: Partial<Image>) {
    return {
      ...data,
      createdAt: new Date(),
      downloadStatus: 'downloading',
    };
  }

  static markAsDownloaded(data: Partial<Image>) {
    return {
      ...data,
      filename: `${data.id}.jpg`,
      downloadStatus: 'completed',
    };
  }

  static markAsDeleted(data: Partial<Image>) {
    return {
      ...data,
      filename: `${data.id}.jpg`,
      downloadStatus: 'deleted',
      deletedAt: new Date(),
    };
  }

  static markAsFailed(data: Partial<Image>) {
    return { ...data, downloadStatus: 'failed', deletedAt: new Date() };
  }

  static schema: ObjectSchema = {
    name: 'ImageModel',
    primaryKey: 'id',
    properties: {
      id: 'string',
      author: 'string?',
      filename: 'string?',
      url: 'string?',
      download_url: 'string?',
      downloadStatus: { type: 'string', default: 'pending', optional: true },
      createdAt: { type: 'date', default: new Date().toISOString() },
      deletedAt: { type: 'date', optional: true },
    },
  };
}
