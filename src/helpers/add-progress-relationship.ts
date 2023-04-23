import { FindManyOptions, FindOneOptions, IsNull } from 'typeorm';

export function addProgressRelationship<
  T extends FindOneOptions | FindManyOptions,
>(profileId: number | undefined, entityType, options: T = {} as T): T {
  if (!options.where) options.where = {};
  if (!options.relations) options.relations = {};

  options.where = {
    ...options.where,
    ...(profileId
      ? {
          progresses: [
            { profileId: IsNull(), entityType },
            { profileId: profileId, entityType },
          ],
        }
      : {}),
    progresses: [{ profileId: IsNull() }, { profileId: profileId ?? IsNull() }],
  };
  options.relations = [
    ...(profileId ? ['progresses'] : []),
    ...(options.relations as string[]),
  ];

  return options;
}
