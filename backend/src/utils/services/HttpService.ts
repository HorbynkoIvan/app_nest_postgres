import axios from 'axios';
import { Injectable } from '@nestjs/common';

interface ResponseInterface {
  status: number;
  url: string;
  data: any;
  headers: any;
}

@Injectable()
export class HttpService {
  cookies: ReadonlyArray<string>;

  async get(url: string, options: any): Promise<ResponseInterface> {
    const response: any = await axios.get(encodeURI(url), options);

    this.cookies = response.headers['set-cookie'];

    return response;
  }

  async post(
    url: string,
    body?: any,
    options?: any,
  ): Promise<ResponseInterface> {
    const response: any = await axios.post(url, body, options);
    this.cookies = response.headers['set-cookie'];

    return response;
  }

  async delete(
    url: string,
    body?: any,
    options?: any,
  ): Promise<ResponseInterface> {
    const response: any = await axios({
      method: 'delete',
      url,
      data: body,
      ...options,
    });

    this.cookies = response.headers['set-cookie'];

    return response;
  }

  getCookies(): any {
    return this.cookies.reduce((ac, el) => {
      const cookie = el.split(';').shift().split('=');

      return { ...ac, [cookie.shift()]: cookie.pop() };
    }, {});
  }
}
