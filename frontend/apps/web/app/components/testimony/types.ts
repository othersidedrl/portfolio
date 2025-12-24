export type Testimonial = {
  id: number;
  name: string;
  profile_url: string;
  affiliation: string;
  rating: number;
  description: string;
  ai_summary: string;
};

export type TestimonyItemsResponse = {
  data: Testimonial[];
  length: number;
};

export type TestimonyRepsonse = {
  title: string;
  description: string;
};
