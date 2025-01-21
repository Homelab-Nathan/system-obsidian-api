import { File } from "../entities/file";

export interface FileParser {
    parseFolder(folderPath: string): File[]
}
