# octoherd-script-create-unique-issue

> create an issue with a unique title unless it already exists

[![@latest](https://img.shields.io/npm/v/octoherd-script-create-unique-issue.svg)](https://www.npmjs.com/package/octoherd-script-create-unique-issue)
[![Build Status](https://github.com/gr2m/octoherd-script-create-unique-issue/workflows/Test/badge.svg)](https://github.com/gr2m/octoherd-script-create-unique-issue/actions?query=workflow%3ATest+branch%3Amain)

The script checks all open issues and creates a new one unless an open issue with the same title already exists.

## Usage

Minimal usage

```js
npx octoherd-script-create-unique-issue \
  --title My unique issue title \
  --body ./path/to/my-body.md
```

Pass all options as CLI flags to avoid user prompts

```js
npx octoherd-script-create-unique-issue \
  -T ghp_0123456789abcdefghjklmnopqrstuvwxyzA \
  -R "gr2m/*" \
  --title My unique issue title \
  --body ./path/to/my-body.md
```

## Options

| option                       | type             | description                                                                                                                                                                                                                                 |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--title`                    | string           | **Required.** Title of the issue to be created                                                                                                                                                                                              |
| `--body`                     | string           | **Required.** Issue body text or path to fail containing the issue body                                                                                                                                                                     |
| `--octoherd-token`, `-T`     | string           | A personal access token ([create](https://github.com/settings/tokens/new?scopes=repo)). Script will create one if option is not set                                                                                                         |
| `--octoherd-repos`, `-R`     | array of strings | One or multiple space-separated repositories in the form of `repo-owner/repo-name`. `repo-owner/*` will find all repositories for one owner. `*` will find all repositories the user has access to. Will prompt for repositories if not set |
| `--octoherd-bypass-confirms` | boolean          | Bypass prompts to confirm mutating requests                                                                                                                                                                                                 |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## About Octoherd

[@octoherd](https://github.com/octoherd/) is project to help you keep your GitHub repositories in line.

## License

[ISC](LICENSE.md)
