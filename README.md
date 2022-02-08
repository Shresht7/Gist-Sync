# Gist-Sync
-----------

⚠ Work-in-Progress ⚠

Sync files from your repository to GitHub Gists.

## Workflow Setup

### Gist Token

The `GITHUB_TOKEN` that comes with GitHub Actions by default is restricted to the local repository. In other words, it does not have permission to access GitHub Gists. You will have to provide a **personal access token** with `gist` permissions as a secret.

1. Get a personal-access-token.
1. Add it to your repository secrets in the repo settings.
1. pass the secret to the action using the workflow file

```yaml
    env:
      GIST_TOKEN: ${{ secret.[SECRET_NAME] }}
```

### Workflow file

Create the workflow file `.github/workflows/gist-sync.yaml`

```yaml
# =========================================
#                   GIST-SYNC
# -----------------------------------------
# Sync files from your repo to GitHub Gists
# =========================================

name: Gist-Sync

# Activation Events
# =================

on:
  workflow_dispatch:  # When a workflow event is dispatched manually

# Jobs
# ====

jobs:
  Gist-Sync:
    runs-on: ubuntu-latest
    
    name: Gist-Sync
    steps:
    
      # Actions/Checkout
      # ================

      # Required for GITHUB_WORKSPACE
      - name: Checkout
        uses: actions/checkout@v2

      # Execute Gist-Sync Action
      # ========================

      - name: Gist-Sync
        uses: Shresht7/Gist-Sync@main
        id: Gist-Sync

        # Config Parameters
        # -----------------

        with:
          dryrun: true          # Will not make any actual changes if true (default: true)
          gists: 'gists.yaml'   # File containing the file-gist mapping


        # Environment Variables
        # ---------------------

        env:
          GIST_TOKEN: ${{ secrets.GIST_TOKEN }} # Personal-Access-Token with gist permissions.

```

### Inputs

#### dryrun

Potential changes will only be logged if `dryrun` is `true`. For Gist-Sync to actually modify anything you will have to set `dryrun` to `false`. (default: `true`)

#### gists

Name of the config file that maps files to their corresponding gist IDs. (default: `gists.yaml`)
Note: This file should be placed directly in your `.github` folder in the root of your repo.

## Usage

### Example gists.yaml

```yaml
- id: GIST_ID
  files:
    - README.md
    - httpStatusCodes.ts
```

## Permissions

This action needs a **personal access token** with _gist_ permissions in order to update gists.