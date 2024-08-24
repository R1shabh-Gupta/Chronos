# Chronos: A Lightweight Version Control System

Chronos is a simplified version control system inspired by Git, designed to provide basic functionalities for managing and tracking changes in your projects. This tool is perfect for learning the fundamentals of version control or for use in small-scale projects where full Git functionality is not required.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialize a Repository (`init`)](#initialize-a-repository-init)
  - [Add Files to Staging Area (`add`)](#add-files-to-staging-area-add)
  - [Commit Changes (`commit`)](#commit-changes-commit)
  - [View Commit History (`log`)](#view-commit-history-log)
  - [Show Differences Between Commits (`show`)](#show-differences-between-commits-show)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Installation

Chronos is implemented in Node.js. Before using Chronos, ensure you have Node.js installed on your machine.

```bash
# Clone the repository
git clone https://github.com/R1shabh-Gupta/Chronos

# Change into the directory
cd core

# Install dependencies
npm install

# Run the executable
./Chronos.mjs init
```

## Usage

Chronos supports several basic commands to manage your project's version history.

### Initialize a Repository (`init`)

The `init` command initializes a new Chronos repository in your project directory. This command creates a `.chronos` directory to store all the necessary metadata and objects.

```bash
./Chronos.mjs init
```

**Technical Details:**

- A `.chronos` directory is created at the root of your project.
- Subdirectories and files like `objects/`, `HEAD`, and `index` are initialized.

### Add Files to Staging Area (`add`)

The `add` command stages files for the next commit. This command takes the file path as an argument, reads its contents, creates a SHA-1 hash, and stores the content as a blob object in the `.chronos/objects/` directory.

```bash
./Chronos.mjs add <file>
```

**Technical Details:**

- The file's content is hashed using SHA-1, and the hash is used as the filename in the `objects/` directory.
- The file's path and hash are recorded in the `index` file to track what is staged.

### Commit Changes (`commit`)

The `commit` command saves a snapshot of the staged changes. It records the current state of the project, the commit message, and a reference to the parent commit (if any).

```bash
./Chronos.mjs commit "<message>"
```

**Technical Details:**

- The `commit` command reads the `index` file to get the list of staged files and their hashes.
- A commit object is created, containing:
  - A timestamp
  - The commit message
  - The list of files (paths and hashes)
  - A reference to the parent commit
- The commit object is stored in the `objects/` directory, and its hash is written to the `HEAD` file to denote the latest commit.

### View Commit History (`log`)

The `log` command displays the commit history of the repository. It starts from the current commit (as recorded in the `HEAD` file) and traces back through the parent commits, printing out each commit's details.

```bash
./Chronos.mjs log
```

**Technical Details:**

- The command reads the current commit hash from the `HEAD` file.
- It then retrieves each commit's data from the `objects/` directory and prints it to the console, including the timestamp, commit message, and hash.

### Show Differences Between Commits (`show`)

The `show` command displays the differences between the specified commit and its parent commit. If no parent exists (i.e., for the first commit), it simply shows the content of the files.

```bash
./Chronos.mjs show <commitHash>
```

**Technical Details:**

- The command retrieves the commit data for the specified commit hash.
- It compares the content of the files in the specified commit with their counterparts in the parent commit (if available).
- The differences are displayed with lines added in green and lines removed in red, using the `diff` library.

## Future Enhancements

Chronos is still in its early stages, and several features are planned for future releases:

- **Branching**: Support for creating and managing branches, allowing users to work on multiple versions of their project simultaneously.
- **AI-Powered Commit Suggestions**: Integration of AI to suggest meaningful commit messages based on the changes.
- **Checkout**: Ability to switch between different branches or specific commits.
- **Stashing**: Temporary storage of work-in-progress changes without committing them.
- **Enhanced Diffing**: Improved diff tools to make it easier to understand changes between commits.

## Contributing

Contributions to Chronos are welcome! If you'd like to contribute, please fork the repository, make your changes, and open a pull request. Ensure your code follows the project's coding standards and includes appropriate tests.

## License

Chronos is licensed under the MIT License. See the `LICENSE` file for more details.
