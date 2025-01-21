import { NoteRepository } from "../ports/noteRepository"

/**
 * true: Si il y a eu du changement
 * false: Sinon
 */
export default (noteRepository: NoteRepository): boolean => {
    if(noteRepository.haveChanged()) {
        noteRepository.update();
        return true;
    }

    return false;
}