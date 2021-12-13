import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const RequestIdsKey = 'RequestIds';

export type RequestIds = {
  bodyIdPropertyName: string;
  paramsIdPropertyName: string;
};

export const RequestIdsDecorator = (
  requestIds: RequestIds,
): CustomDecorator<string> => SetMetadata(RequestIdsKey, requestIds);
