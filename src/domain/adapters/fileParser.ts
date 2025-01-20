import fs from "fs";
import { File } from "../entities/file";

export interface FileParser {
    parseFolder(folderPath: string): File[]
}

export class FileParserObsidianMarkdown implements FileParser {

    parseFolder(folderPath: string): File[] {
        const filesNames = this.getFilesPath(folderPath);
        return filesNames.map(fileName => this.parseContentToFile(fileName, this.getFileContent(folderPath, fileName)))
    }

    private getFilesPath(folderPath: string): string[] {
        return fs.readdirSync(folderPath)
    }

    private getFileContent(folderPath: string, fileName: string): string {
        return fs.readFileSync(folderPath + "/" + fileName, "utf-8")
    }

    private parseContentToFile(fileName: string, fileContent: string): File {
        const idMatch = fileContent.match(/id: (.*)/)
        if (!idMatch) {
            throw Error("Impossible de parser la regex pour le fichier " + fileName);
        }

        let id = "undefined";
        if (idMatch.length >= 1) {
            id = idMatch[1]
        }

        return {
            title: fileName,
            content: fileContent,
            id: id
        }
    }

}