import { Review } from '_domain/Feed/Review';
import { Theme } from '_domain/Feed/Theme';
import { authHeader } from '_helpers';
import { baseRequestService } from './baseRequest.service';

/* eslint-disable sonarjs/no-duplicate-string */

const getReviews = async (): Promise<Review[]> => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return baseRequestService(
    `https://frontend-task.production.cloud.chattermill.xyz/api/reviews`,
    requestOptions
  ).then((reviews: any) => reviews.data);
};

const getReviewById = async (id: number): Promise<Review> => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return baseRequestService(
    `https://frontend-task.production.cloud.chattermill.xyz/api/reviews/${id}`,
    requestOptions
  ).then((review) => review.data);
};

const getThemes = async (): Promise<Theme[]> => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return baseRequestService(
    `https://frontend-task.production.cloud.chattermill.xyz/api/themes`,
    requestOptions
  ).then((themes: any) => themes.data);
};

const getThemeById = async (id: number): Promise<Theme> => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return baseRequestService(
    `https://frontend-task.production.cloud.chattermill.xyz/api/themes/${id}`,
    requestOptions
  ).then((theme) => theme.data);
};

export const feedService = {
  getReviews,
  getReviewById,
  getThemes,
  getThemeById,
};
