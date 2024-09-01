# get-green-gym-sheet

### build

```
yarn build
```

### deploy that works

Copy and paste `Code.gs` into Apps Script Editor and click 💾. That's it.

### deploy that I wish worked

Area for future improvement: the below will create a deployment that is visible
in the Apps Script Editor, but how to set it as the active version remains a
source of great mystery and intrigue.

Ensure `.clasp.json` is targeting the desired script ID.

If not currently logged in:

```
yarn clasp login
```

```
yarn clasp version
yarn deploy-build
```
