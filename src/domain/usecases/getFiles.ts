import { FileParser } from "../adapters/fileParser";
import { File } from "../entities/file";

export default (fileParser: FileParser, filesFolderPath: string): File[] => {
    return fileParser.parseFolder(filesFolderPath)
}