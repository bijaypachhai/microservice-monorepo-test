# Issues fixed on Latest

### Shared Library (`libs`): Module Not Found

`tsconfig.json`

```json

"paths": {
      "@app/common": [
        "libs/common/src"
      ],
      "@app/common/*": [
        "libs/common/src/*"
      ]
    }
```
This is the order in which paths are created (by `nest g library common` command).
For this to work in Docker build, we must copy `libs/common` directory in following way.

```Dockerfile

COPY ./libs/common/ ./libs/common/

```

Only then `pnpm build` can run successfully. The above Dockerfile instruction copies all files (`src/*`, `tsconfig.lib.json`), which are necessary to build the application.

