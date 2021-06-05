import { ContentResponse, ListContentsResponse } from "./api";
import { CategoryResponse } from "./category";

export type BlogListResponse = ListContentsResponse<BlogResponse>;

export type BlogResponse = ContentResponse<{
  title?: string;
  body?: string;
  categories?: CategoryResponse[];
}>;

export type CategoryListResponse = ListContentsResponse<CategoryResponse>;
