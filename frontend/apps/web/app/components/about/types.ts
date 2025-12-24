type Card = {
    title: string;
    description: string;
};

export type AboutResponse = {
    description: string;
    cards: Card[];
    github_link: string;
    linkedin_link: string;
    available: boolean;
};


type Skills = {
    id: string;
    name: string;
    description: string;
    specialities: string[];
    level: string;
    year_of_experience: number;
    category: string;
};

export type SkillsResponse = {
    data: Skills[];
    length: number;
};

export type Careers = {
    started_at: string;
    ended_at: string;
    title: string;
    affiliation: string;
    description: string;
    location: string;
    type: string;
};

export type CareersRepsonse = {
    data: Careers[];
    length: number;
};