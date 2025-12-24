export interface ProjectPageResponse {
  title: string;
  description: string;
}

export interface ProjectItemResponse {
  id: number;
  name: string;
  imageUrls: string[];
  description: string;
  techStack: string[];
  githubLink: string;
  type: string;
  contribution: string;
  projectLink: string;
}
