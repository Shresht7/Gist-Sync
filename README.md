<h1 align='center'>
  Gist-Mirror
</h1>

<p align='center'>
  <!-- slot: description  -->
Mirror files from your repository to GitHub Gists
<!-- /slot -->
</p>

-------------

## 📑 Permissions

This action needs a [**personal access token**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with the _gist_ permission) in order to update gists.


## 📖 Usage

### 1. Workflow Setup

#### 1. Gist Token

The `GITHUB_TOKEN` that comes with GitHub Actions by default, is restricted to the local repository. In other words, it _does not_ have permission to access GitHub Gists. You will have to provide a [**personal access token**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with the `gist` permission) as a secret.

1. Get a [personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
1. Add it to your [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in the repo settings.
2. When you create the [workflow](#workflow), pass the secret in as the `GIST_TOKEN` environment variable.

```yaml
    env:
      GIST_TOKEN: ${{ secret.[SECRET_NAME] }}
```

#### 2. Workflow

Use this action in a workflow.

```yaml
- name: Gist-Mirror
  id: Gist-Mirror
  uses: Shresht7/Gist-Mirror@v1

  # Config Parameters
  # -----------------

  with:
    dryrun: false
    gists: |
      bed31c34989a8ee63ec0dc4981a74c9a:
        - README.md
        - .github/workflows/gist-mirror.yml

  # Environment Variables
  # ---------------------

  env:
    GIST_TOKEN: ${{ secrets.GIST_TOKEN }} # Personal-Access-Token with gist permissions.
```

### On Push Trigger

You can use the on-push events to run the workflow automatically whenever commits are pushed to the remote repository.

Trigger when commits are pushed to the main branch

```yaml
on:
  push:
    branches:
      - main
```

or when commits affect certain files

```yaml
  on:
    push:
      paths:
        - README.md
        - httpStatusCodes.ts
```

Read more about [events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

You can use these event triggers to run the workflow automatically whenever a file (that is to be mirrored to a gist) is changed.

To see a working example, see [Workflow-Example](#-workflow-examples).

## 📋 Inputs

<!-- slot: inputs  -->
| Input     | Description                                          |     Default | Required |
| :-------- | :--------------------------------------------------- | ----------: | :------: |
| `gists`   | YAML mapping GistIDs to their corresponding files    | `undefined` |          |
| `dry-run` | No actual changes will be made if dry-run is enabled |      `true` |          |
<!-- /slot -->

### gists

The `gists` input takes in a YAML configuration mapping GistIDs to their corresponding files. All files specified in the configs will be pushed to their corresponding gists. You can specify multiple gist-ids and files.

```yaml
<gist_id_1>:
  - README.md

<gist_id_2>:
  - package.json
  - package-lock.json
  - .gitignore
```

## 

## 📃 Workflow Example

To see a working example of this action, see this [workflow](./.github/workflows/gist-mirror.yml). This is generated [Gist]([./](https://gist.github.com/Shresht7/bed31c34989a8ee63ec0dc4981a74c9a)).

<details>

  <summary>
    or click here
  </summary>

<!-- slot: workflow-example -->
<!-- /slot -->

</details>

---

## 📑 License

> [MIT License](./LICENSE)