export interface ICollection {
  id: string;
  name: string;
  requests: IRequest[];
  parentId?: string | null;
  isExpanded?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRequest {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
  url: string;
  headers: { key: string; value: string; enabled: boolean }[];
  params: { key: string; value: string; enabled: boolean }[];
  body: {
    type: 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded';
    content: string;
  };
  auth?: {
    type: 'none' | 'basic' | 'bearer' | 'apikey';
    params: {
      username?: string;
      password?: string;
      token?: string;
      key?: string;
      value?: string;
      addTo?: 'header' | 'query';
    };
  };
  collectionId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
} 