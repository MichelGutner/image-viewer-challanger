import Realm, { index, ObjectSchema } from 'realm';

export class Image extends Realm.Object {
  id?: string;
  author?: string;
  url?: string;
  download_url?: string;
  downloadStatus?: string;
  createdAt?: Date;
  deletedAt?: Date;

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
      downloadStatus: 'in_progress',
    };
  }

  static markAsDownloaded(data: Partial<Image>) {
    return {
      ...data,
      downloadStatus: 'completed',
    };
  }

  static markAsDeleted(data: Partial<Image>) {
    return {
      ...data,
      downloadStatus: 'pending',
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
      url: 'string?',
      download_url: 'string?',
      downloadStatus: { type: 'string', default: 'pending', optional: true },
      createdAt: 'date',
      deletedAt: { type: 'date', optional: true },
    },
  };
}
