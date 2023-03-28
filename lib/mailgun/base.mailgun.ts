import { MailGunBadRequest, NetworkError } from './exceptions';
import FormData from 'form-data';
import axios, { AxiosResponse } from 'axios';
import logger from '../../src/startup/logging';

export default class ApiBase {
  baseUrl: string = 'https://api.mailgun.net/v3/';
  domain: string;
  sendingApiKey: string;
  user: string;
  headers: { [key: string]: any } = {
    'content-type': 'application/json',
  };

  constructor(domain: string, sendingApiKey: string, user: string) {
    this.domain = domain;
    this.sendingApiKey = sendingApiKey;
    this.user = user;
  }

  setAuthHeader() {
    this.headers['Authorization'] = `Basic ${this.getBasicAuthCred()}`;
  }

  setMultipartHeader(body: FormData) {
    this.headers['content-type'] = body.getHeaders()['content-type'];
  }

  getBasicAuthCred() {
    const data = `${this.user}:${this.sendingApiKey}`;
    const buff = Buffer.from(data);

    return buff.toString('base64');
  }

  async post(uri: string, data: FormData): Promise<any> {
    const fullUrl = `${this.baseUrl}${this.domain}/${uri}`;

    data.getHeaders();
    try {
      const res: AxiosResponse = await axios.post(fullUrl, data, {
        headers: this.headers,
      });

      if (res.status === 200) {
        if (res.data) {
          return res.data;
        }
      }

      let k = await res.data;
      let message: string;
      switch (res.status) {
        case 400:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Bad Request';
          }
          throw new MailGunBadRequest(message);
          break;
        case 401:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Unauthorized';
          }
          throw new MailGunBadRequest(message);
          break;
        case 402:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Request Failed ';
          }
          throw new MailGunBadRequest(message);
          break;
        case 404:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Not Found';
          }
          throw new MailGunBadRequest(message);
          break;
        case 413:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Request Entity Too Large';
          }
          throw new MailGunBadRequest(message);
          break;
        case 429:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Too many requests';
          }
          throw new MailGunBadRequest(message);
          break;
        default:
          if (res.data) {
            message = JSON.parse(k.body['message']);
          } else {
            message = 'Bad Request';
          }
          throw new MailGunBadRequest(message);
          break;
      }
    } catch (error: any) {
      logger.error(error, 'Error sending email');
      throw new NetworkError(error.message);
    }
  }
}
