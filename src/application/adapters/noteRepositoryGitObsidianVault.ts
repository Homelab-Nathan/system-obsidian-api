import { Logger } from "@nestjs/common";
import { execSync } from "child_process";
import { createHash } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { NoteRepository } from "src/domain/ports/noteRepository";
import constants from "../configs/constants";

const gitToken = process.env.GIT_TOKEN
const gitRepo = "github.com/Homelab-Nathan/system-obsidian-vault.git";
const gitUsername = "nSakkriou";

const gitRepoWithLogin = `https://${gitUsername}:${gitToken}@${gitRepo}`

export class NoteRepositoryGitObsidianVault implements NoteRepository {
    private readonly logger = new Logger("NoteRepository");

    constructor(private readonly hashStorage: HashStorage, private readonly repositoryPath: string) { }

    repositoryExist(): boolean {
        return existsSync(constants.obsidian_path);
    }

    initRepository(): void {
        this.logger.debug(execSync(`git clone ${gitRepoWithLogin}`).toString())
    }

    haveChanged(): boolean {
        const remoteHash = this.hashInformation(this.getRemoteInformation());
        const currentHash = this.hashStorage.get();
        this.hashStorage.set(remoteHash);

        this.logger.debug(`Hash du repository stocké : ${currentHash}`)
        this.logger.debug(`Hash du repository en ligne : ${remoteHash}`)

        return remoteHash !== currentHash;
    }

    private getRemoteInformation(): string {
        return execSync(`git ls-remote ${gitRepoWithLogin}`).toString();
    }

    private hashInformation(info: string): string {
        return createHash("sha1").update(info).digest("hex")
    }

    update(): void {
        this.pullRepo()
    }

    private pullRepo(): void {
        const pull = execSync(`git -C ${this.repositoryPath} pull`).toString()
        console.log(pull)
    }
}

export interface HashStorage {
    set(newHash: string): void
    get(): string
}

export class HashStorageFile implements HashStorage {

    private hash: string = "";
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.initFile()
        this.loadHash()
    }

    private saveHash(): void {
        if (!existsSync(this.filePath)) {
            throw new Error(`Le fichier de hash n'existe pas ${this.filePath}`)
        }

        writeFileSync(this.filePath, this.hash, { encoding: "utf-8" })
    }

    private initFile() {
        if (!existsSync(this.filePath)) {
            writeFileSync(this.filePath, "", { encoding: "utf-8" })
        }
    }

    private loadHash(): void {
        this.hash = readFileSync(this.filePath, {
            encoding: "utf-8",
            flag: "r"
        })
    }

    set(newHash: string): void {
        this.hash = newHash;
        this.saveHash();
    }

    get(): string {
        return this.hash;
    }
}