# Node Git Demo Project

## Overview
This project demonstrates:

- Git repository initialization
- Making meaningful commits
- Creating and switching branches
- Merging branches
- Resolving merge conflicts
## Git Commands Used
### git init
Initializes a new Git repository.
### git add .
Stages all modified and new files.
### git commit -m "message"
Creates a snapshot of staged changes.
### git checkout -b <branch>
Creates and switches to a new branch.
### git checkout <branch>
Switches between branches.
### git merge <branch>
Merges specified branch into current branch.
### Conflict Resolution
- Identify conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- Manually edit file
- Run `git add`
- Run `git commit`
### Branch Strategy
- main → Stable branch
- feature/add-logging → Feature development branch
## cKey Learnings
- Writing meaningful commit messages
- Safe development using branches
- Handling and resolving merge conflicts
- Maintaining structured Git workflow