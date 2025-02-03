import { Injectable } from '@angular/core';
import { HttpHandler, HttpParams } from '@angular/common/http';

export type IRequestParams = Record<string,  string | number | boolean | readonly (string | number | boolean)[]>;

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor() { }

  protected generateRequestOptions(params: IRequestParams): { params: HttpParams, header?: HttpHandler } {
    return {
      params: this.getParams(params),
    };
  }

  private getParams(query: IRequestParams): HttpParams {
    return new HttpParams({
      fromObject: this.getValidQuery(query),
    });
  }

  private getValidQuery(query: IRequestParams): IRequestParams {
    const newQuery: IRequestParams = {};
    Object.keys(query).forEach((key: string) => {
      if ((query[key] === undefined
          || query[key] === null
          || query[key] === '')
        || (Array.isArray(query[key]) && !query[key].length)) {
        return;
      }
      newQuery[key] = query[key];
    });

    return newQuery;
  }
}
