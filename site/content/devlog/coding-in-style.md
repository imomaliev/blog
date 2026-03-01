---
title: "Coding in Style"
date: "2026-01-27T21:15:34Z"
tags: ["editorconfig", "pre-commit", "style-guide"]
---

With my blog "going public" I can finally start writing. My next step was going to be adding [TailwindCSS](https://tailwindcss.com/), I started working on that and immediately noticed that my editor, neovim, applies the wrong indentation, so we are going to fix that first.

I can update the indentation configuration in neovim, but I think a much nicer option and better convention would be to set up [`.editorconfig`](https://editorconfig.org/).

## EditorConfig

1. Create `.editorconfig`
    ```console
    $ touch .editorconfig
    ```
2. Configure EditorConfig for available file types.
    ```diff
    diff --git a/.editorconfig b/.editorconfig
    new file mode 100644
    index 0000000..2a0efbf
    --- /dev/null
    +++ b/.editorconfig
    @@ -0,0 +1,21 @@
    +# EditorConfig is awesome: https://EditorConfig.org
    +
    +# top-most EditorConfig file
    +root = true
    +
    +[*]
    +# Unix-style newlines with a newline ending every file
    +end_of_line = lf
    +insert_final_newline = true
    +charset = utf-8
    +trim_trailing_whitespace = true
    +
    +[*.md]
    +# Two or more spaces at the end of the line are parsed as hard line break
    +trim_trailing_whitespace = false
    +indent_style = space
    +indent_size = 4
    +
    +[*.{html,css,js,yaml,yml,toml}]
    +indent_style = space
    +indent_size = 2
    ```
3. Commit our changes.
    ```console
    $ git add .editorconfig
    $ git commit -m 'configure EditorConfig'
    ```

Neovim supports `.editorconfig` out of the box[^1], but it doesn't automatically enforce specified coding style. To ensure better code consistency, let's set up [pre-commit](https://pre-commit.com/) with the [editorconfig-checker](https://editorconfig-checker.github.io/) hook.

## pre-commit

1. Create `.pre-commit-config.yaml`
    ```console
    $ touch .pre-commit-config.yaml
    ```
1. Add hooks
    ```diff
    diff --git a/.pre-commit-config.yaml b/.pre-commit-config.yaml
    new file mode 100644
    index 0000000..931910f
    --- /dev/null
    +++ b/.pre-commit-config.yaml
    @@ -0,0 +1,13 @@
    +# See https://pre-commit.com for more information
    +# See https://pre-commit.com/hooks.html for more hooks
    +repos:
    +-   repo: https://github.com/pre-commit/pre-commit-hooks
    +    rev: v6.0.0
    +    hooks:
    +    -   id: check-yaml
    +    -   id: check-toml
    +    -   id: check-added-large-files
    +-   repo: https://github.com/editorconfig-checker/editorconfig-checker
    +    rev: v3.6.0
    +    hooks:
    +    -   id: editorconfig-checker
    ```
1. Make sure we are using the latest versions.
    ```console
    $ pre-commit autoupdate
    $ git add -u
    $ pre-commit install
    $ git commit -m 'configure pre-commit'
    ```
1. Run pre-commit on the whole repo.
    ```console
    $ pre-commit run --all-files
    check yaml...............................................................Passed
    check toml...............................................................Passed
    check for added large files..............................................Passed
    run editorconfig-checker.................................................Failed
    - hook id: editorconfig-checker
    - exit code: 1

    site/content/devlog/show-your-work.md:
        19: Wrong amount of left-padding spaces(want multiple of 4)
        23-24: Wrong amount of left-padding spaces(want multiple of 4)
        37-39: Wrong amount of left-padding spaces(want multiple of 4)
        41-43: Wrong amount of left-padding spaces(want multiple of 4)
        45-47: Wrong amount of left-padding spaces(want multiple of 4)
        50-52: Wrong amount of left-padding spaces(want multiple of 4)

    6 errors found
    site/content/devlog/create-a-site.md:
        64-66: Wrong amount of left-padding spaces(want multiple of 4)

    1 errors found
    site/content/devlog/dogfooding-a-theme.md:
        45-47: Wrong amount of left-padding spaces(want multiple of 4)
        62: Wrong amount of left-padding spaces(want multiple of 4)
        64: Wrong amount of left-padding spaces(want multiple of 4)
        67: Wrong amount of left-padding spaces(want multiple of 4)

    4 errors found
    ```
    These ones I do not consider errors; maybe this is a bug?

    After a bit of digging, it turns out this is [expected behavior](https://github.com/editorconfig-checker/editorconfig-checker/issues/351). But I do not like it, so I will disable it.

## Fixing editorconfig-checker for markdown

editorconfig-checker can't be [configured per filetype](https://editorconfig-checker.github.io/#configuration), but luckily for me, I can sidestep this by having two separate editorconfig-checker hooks with different arguments for different filetypes. One for markdown only, another for all other filetypes.

```diff
diff --git a/.pre-commit-config.yaml b/.pre-commit-config.yaml
index 931910f..95b7c80 100644
--- a/.pre-commit-config.yaml
+++ b/.pre-commit-config.yaml
@@ -11,3 +11,11 @@ repos:
     rev: v3.6.0
     hooks:
     -   id: editorconfig-checker
+        name: run editorconfig-checker excluding markdown
+        exclude_types: [markdown]
+    -   id: editorconfig-checker
+        name: run editorconfig-checker for markdown
+        # Disable indent size check for code block
+        # See https://github.com/editorconfig-checker/editorconfig-checker/issues/351
+        args: [-disable-indent-size]
+        types_or: [markdown]
```

Let's try it

```console
$ pre-commit run --all-files
check yaml...............................................................Passed
check toml...............................................................Passed
check for added large files..............................................Passed
run editorconfig-checker excluding markdown..............................Passed
run editorconfig-checker for markdown....................................Passed
```

All green, perfect! 

## editorconfig-checker does checking only

I purposefully added multiple new lines at the end of `site/hugo.toml` to see how editorconfig-checker will autoformat it and found out it does not have autoformatting capabilities (and does not consider multiple new lines as an error 🤦‍♂️). Which is a bummer; I specifically chose this hook in the hope of using it instead of [prettier](http://prettier.io) for autoformatting, because recent versions of prettier broke integration with pre-commit[^2]. I think instead of wasting more time on this sidequest I should stop, but I want to add a couple of helper hooks to remediate basic autoformatting issues.

```
diff --git a/.pre-commit-config.yaml b/.pre-commit-config.yaml
index 95b7c80..588ef57 100644
--- a/.pre-commit-config.yaml
+++ b/.pre-commit-config.yaml
@@ -4,9 +4,14 @@ repos:
 -   repo: https://github.com/pre-commit/pre-commit-hooks
     rev: v6.0.0
     hooks:
+    -   id: trailing-whitespace
+        # Two or more spaces at the end of the line are parsed as hard line break
+        exclude_types: [markdown]
+    -   id: end-of-file-fixer
     -   id: check-yaml
     -   id: check-toml
     -   id: check-added-large-files
+    # TODO: replace with autoformating hook
 -   repo: https://github.com/editorconfig-checker/editorconfig-checker
     rev: v3.6.0
     hooks:
```

## Future considerations

- Replace editorconfig-checker with another tool that actually has autoformatting.
- Project Idea: I can write an editorconfig-checker replacement with autoformatting based on [TreeSitter](https://tree-sitter.github.io/tree-sitter/).
- Add a pre-commit workflow for GitHub Actions or use [https://pre-commit.ci](https://pre-commit.ci).

[^1]: https://neovim.io/doc/user/plugins.html#editorconfig
[^2]: https://github.com/pre-commit/mirrors-prettier/commit/f62a70a3a7114896b062de517d72829ea1c884b6
