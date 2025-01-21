export interface NoteRepository {
    repositoryExist(): boolean;
    initRepository(): void;
    haveChanged(): boolean;
    update(): void;

}