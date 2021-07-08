export interface ReviewTheme {
  readonly sentiment: number;
  readonly theme_id: number;
}

export interface Review {
  readonly comment: string;
  readonly created_at: string;
  readonly id: number;
  readonly themes: ReviewTheme[];
}
