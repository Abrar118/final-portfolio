# Security Policy

## Reporting a vulnerability

Email abrarme118@gmail.com with the steps to reproduce it. Please don't open a public issue for a security problem.

## Supported version

Only the `master` branch, which is what the live site at https://www.abrarmahiresam.dev/ is built from, receives security fixes.

## Changes to `master`

`master` is protected by two repository rulesets:

- Only the repository owner, Abrar118, can merge or otherwise update it. Everyone else is blocked, and the owner does this by bypassing the rule.
- Force pushes and deleting the branch are blocked for everyone, including the owner.
