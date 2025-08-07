export interface SearchQueryArgs {
  searchTerm: string;
  pageNumber?: number;
  limit?: number;
}

export interface ApiMovie extends Movie {
  shortDescription?: string;
  alternativeName?: string;
}

export interface Movie {
  id: number;
  name: string;
  description: string;
}

export interface ApiResult {
  docs: ApiMovie[] | Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface ApiMovieDetails extends Movie, ApiMovie {
  year?: number | '';
  movieLength: number;
  runtime?: number;
  rating: { kp: number; imdb: number };
  genres: { name: string }[];
  poster: { previewUrl: string; url: string };
}

export class ApiError extends Error {
  constructor(props: ApiError) {
    super(props.message);
    this.status = props.status;
    this.statusText = props.statusText;
    this.name = props.name;
    this.stack = props.stack;
  }
  status?: number;
  statusText?: string;
}
