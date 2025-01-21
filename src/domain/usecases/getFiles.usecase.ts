import { File } from "../entities/file";
import { FileParser } from "../ports/fileParser";

export default (fileParser: FileParser, filesFolderPath: string): File[] => {
    return fileParser.parseFolder(filesFolderPath)
}