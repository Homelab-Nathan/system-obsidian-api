import { Project } from "../entities/project";

export interface ProjectParser {
    parse(projectFilePath: string): Project
}
