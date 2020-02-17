import 'isomorphic-fetch';

import { DashboardMetaData } from './types';

type Options = {
  url: string;
  key: string;
  projectId: string;
};

enum Headers {
  MetaData = 'X-Keen-Blob-Metadata',
}

export default class API {
  private url: string;

  private key: string;

  private projectId: string;

  private setAuthHeader = () => ({
    Authorization: this.key,
  });

  constructor({ url, key, projectId }: Options) {
    this.url = url;
    this.key = key;
    this.projectId = projectId;
  }

  getDashboards = (): Promise<DashboardMetaData[]> =>
    fetch(`${this.url}/projects/${this.projectId}/metadata/dashboard`, {
      headers: this.setAuthHeader(),
    }).then(res => res.json());

  getDashboardById = (id: string) =>
    fetch(`${this.url}/projects/${this.projectId}/blobs/dashboard/${id}`, {
      headers: this.setAuthHeader(),
    }).then(res => res.json());

  deleteDashboard = (id: string) =>
    fetch(`${this.url}/projects/${this.projectId}/blobs/dashboard/${id}`, {
      method: 'DELETE',
      headers: this.setAuthHeader(),
    });

  saveDashboard = (id: string, body: any) =>
    fetch(`${this.url}/projects/${this.projectId}/blobs/dashboard/${id}`, {
      method: 'PUT',
      headers: {
        ...this.setAuthHeader(),
        [Headers.MetaData]: JSON.stringify({ id }),
      },
      body: JSON.stringify(body),
    });
}
