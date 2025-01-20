import fs from 'fs';
import { parse } from "yaml";
import { Project } from "../entities/project";

export interface ProjectParser {
    parse(projectFilePath: string): Project
}

interface ProjectYaml {
    folder_path: FolderPath;
}

interface FolderPath {
    moc: string;
    atomic: string;
    litteraire: string;
    litteraire_traite: string;
}


export class YamlProjectParser implements ProjectParser {

    parse(projectFilePath: string): Project {
        const file = fs.readFileSync(projectFilePath, 'utf8')
        const fileContent = parse(file) as ProjectYaml

        return this.mapProjectYamlToProject(fileContent);
    }

    private mapProjectYamlToProject(projectYaml: ProjectYaml): Project {
        return {
            folderPath: {
                atomic: projectYaml.folder_path.atomic,
                litteraire: projectYaml.folder_path.litteraire,
                litteraireTraite: projectYaml.folder_path.litteraire_traite,
                moc: projectYaml.folder_path.moc
            }
        }
    }

}