export interface Project{
    id?: number;
    name: string;
    description: string;
    category: string;
    status: string;
    technologies: string;
    idUser?: number;
    nameUser?: string;
}