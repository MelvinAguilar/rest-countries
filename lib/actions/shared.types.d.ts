import { IUser } from "@/database/user.model";

export interface GetCountryParams {
  sort?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
