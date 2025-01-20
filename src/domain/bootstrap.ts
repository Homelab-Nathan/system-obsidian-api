import { FileParser, FileParserObsidianMarkdown } from "./adapters/fileParser";
import { ProjectParser, YamlProjectParser } from "./adapters/projectParser";
import constants from "./configs/constants";
import getFiles from "./usecases/getFiles";
import getProjectConfig from "./usecases/getProjectConfig";

export default () => {
    const projectParser: ProjectParser = new YamlProjectParser();
    const fileParser: FileParser = new FileParserObsidianMarkdown();

    const project = getProjectConfig(projectParser, constants.obsidian_project_config_path)
    getFiles(fileParser, constants.obsidian_path + "/" + project.folderPath.atomic)
};