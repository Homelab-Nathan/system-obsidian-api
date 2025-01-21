import { NoteRepository } from "../ports/noteRepository"

/**
 * Init le repository si il n'existe pas
 * Bien changer le remote pour pouvoir clone
 * true: si il a été init
 * false sinon
 */
export default (noteRepository: NoteRepository): boolean => {
    const repoNotExist = !noteRepository.repositoryExist();

    if(repoNotExist) {
        noteRepository.initRepository();
    }

    return repoNotExist;
}