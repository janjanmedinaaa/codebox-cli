# Codebox CLI
Save your Code Snippets for multiple Programming Languages directly from the CLI

## Installation
```
npm i -g codebox-cli
codebox -i
```

## Usage

### Initialize Codebox
```
// codebox [-i / --init]
codebox --init
```

### Create Programming Language Collection
- Registers a Programming Language
```
// codebox [-n / --new]
codebox --new --language=nodejs
```

### Create New Code Snippet
- Allows you to save Code Snippets for a specific Programming Language. Adding a `-c` or `--clipboard` will get the copied text from your clipboard.
```
// codebox [-s / --snip]
codebox --snip
```

### Search Code Snippet
- Allows you to search a code snippet from multiple Programming Languages using a keyword. Chosen code snippet will be copied to the clipboard.
```
// codebox [-f / --find]
codebox --find --keyword=vim
```

### Update Code Snippet
- Allows you to update a code snippet for a specific Programming Language
```
// codebox [-u / --update]
codebox --update
```

### Export Code Snippets
- Creates a Markdown File for the Collection of Code Snippets for a Specific Programming Language
```
// codebox [-e / --export]
codebox -e --language=kotlin
```