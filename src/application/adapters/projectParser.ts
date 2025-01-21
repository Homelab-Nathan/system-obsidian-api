import {readFileSync} from 'fs';
import { Project } from 'src/domain/entities/project';
import { ProjectParser } from 'src/domain/ports/projectParser';
import { parse } from 'yaml';

interface ProjectYaml {
    folder_path: FolderPath;
}

interface FolderPath {
    moc: string;
    atomic: string;
    litteraire: string;
    litteraire_traite: string;
}


export class ProjectParserYaml implements ProjectParser {

    parse(projectFilePath: string): Project {
        const file = readFileSync(projectFilePath, 'utf8')
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