import path = require("path");
import fs = require("fs");
import {AbstractLocator} from "./abstractLocator";

export class GitLocator extends AbstractLocator {

    public getKind(): string {
        return "git";
    }

    public getDisplayName(): string {
        return "Git";
    }

    public isRepoDir(projectPath: string) {
        let isGit: boolean;
        isGit = fs.existsSync(path.join(projectPath, ".git", "config"));
        if (isGit) {
            return true;
        }

        isGit = fs.existsSync(path.join(projectPath, ".git"));
        if (isGit) {
            let file: string;
            try {
                file = fs.readFileSync(path.join(projectPath, ".git"), "utf8");
                isGit = file.indexOf("gitdir: ") === 0;
                if (isGit) {
                    return true;
                }
            } catch (e) {
                console.log("Error checking git-worktree: " + e);
            }
        }
        
        return false;
    }

    public decideProjectName(projectPath: string): string {
        return path.basename(projectPath);
    }
}