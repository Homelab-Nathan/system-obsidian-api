import { ProjectParser } from "../adapters/projectParser";
import { Project } from "../entities/project";

export default (projectParser: ProjectParser, obsidianProjectConfigPath: string): Project => {
    return projectParser.parse(obsidianProjectConfigPath)
}