/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import faker from 'faker';
import { AuthorModelRecord, CommentModel, IAuthorModel, ICommentAttributes, ICommentModel } from '../comment';
import { fakeArticleModel } from './article';

export function fakeCommentModel(overrides: Partial<ICommentAttributes> = {}): ICommentModel {
  const article = (overrides && overrides['article']) || fakeArticleModel();
  const author = AuthorModelRecord({
    email: faker.internet.email(),
    location: faker.address.city(),
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
  }) as IAuthorModel;

  return CommentModel({
    id: faker.random.number().toString(),
    sourceId: faker.random.number().toString(),
    replyToSourceId: faker.random.number(),
    replyId: faker.random.number().toString(),
    authorSourceId: faker.random.number(),
    text: faker.lorem.paragraphs(3),
    author,
    isScored: faker.random.boolean(),
    isModerated: faker.random.boolean(),
    isAccepted: faker.random.boolean(),
    isDeferred: faker.random.boolean(),
    isHighlighted: faker.random.boolean(),
    isBatchResolved: faker.random.boolean(),
    isAutoResolved: faker.random.boolean(),
    flaggedCount: faker.random.number(),
    recommendedCount: faker.random.number(),
    sourceCreatedAt: faker.date.recent().toISOString(),
    sentForScoring: faker.random.boolean(),
    articleId: article.get('id') && undefined,
    article,
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  });
}
