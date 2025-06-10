import { Request } from 'express';

// Request con tipado para body solamente
export type TypedRequestBody<T> = Request<{}, {}, T>;

// Request con tipado para params y body
export type TypedRequestParams<TParams, TBody> = Request<TParams, {}, TBody>;

// Request con tipado para query y body
export type TypedRequestQuery<TQuery, TBody> = Request<{}, {}, TBody, TQuery>;

// Request con todo tipado (params, response, body, query)
export type TypedRequest<TParams, TRes, TBody, TQuery> = Request<TParams, TRes, TBody, TQuery>;