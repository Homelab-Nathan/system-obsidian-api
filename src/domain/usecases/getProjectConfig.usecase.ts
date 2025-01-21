import { Project } from "../entities/project";
import { ProjectParser } from "../ports/projectParser";

export default (projectParser: ProjectParser, obsidianProjectConfigPath: string): Project => {
    return projectParser.parse(obsidianProjectConfigPath)
}