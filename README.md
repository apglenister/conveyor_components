# Conveyor

## Features

## Usage

```bash
pnpm install

pnpm dev
```

## Scripts

- `pnpm dev` - start a development server for testing the conveyor library with hot reload.
- `pnpm build` - build library for production. The generated files will be on the `dist` folder. `pnpm pack` will package these files into a tarball for install.
- `pnpm preview` - locally preview the production build.
- `pnpm test` - run tests in watch mode.
- `pnpm test:ci` - run tests once without watch mode.
- `pnpm test:ui` - run tests with ui.
- `pnpm format` - format all files with Rome.
- `pnpm lint` - runs TypeScript, Rome and Stylelint.
- `pnpm validate` - runs `lint`, `test:ci`.

## Usage from CDN

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/src/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Conveyor</title>
  <style>
    body {
      height: 100%;
      margin: 0;
      width: 100%;
      overflow: hidden;
    }
  </style>

  <!--
      This AutoInvent example depends on Promise and fetch, which are available in
      modern browsers, but can be "polyfilled" for older browsers.
      Conveyor itself depends on React DOM.
      If you do not want to rely on a CDN, you can host these files locally or
      include them directly in your favored resource bundler.
    -->
  <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
</head>

<body>
  <div id="conveyor">Loading...</div>
  <script src="https://unpkg.com/@autoinvent/conveyor@1.0.0-beta.0/dist/conveyor.umd.js"></script>
  <script defer>
    function autoInventAdapter(aiSchema) {
      const modelTitles = Object.keys(aiSchema);
      modelTitles.pop();
      const modelNames = modelTitles.map((modelTitle) => String(modelTitle).toLowerCase());
      const modelPluralNames = modelNames.map((modelName) => `${modelName}s`);
      const relationalFieldTypes = modelNames.concat(modelPluralNames);
      const conveyorSchema = modelTitles.map((modelTitle) => {
        const fieldNames = Object.keys(aiSchema[modelTitle].fields);
        // Extracts conveyor schema fields
        const compatibleFields = [];
        fieldNames.forEach((fieldName) => {
          // Gets rid of incompatible fields
          switch (fieldName) {
            case 'noEditField':
            case 'noViewField':
            case 'noViewField2':
              return;
            default:
              break;
          }
          // Sets compatible field meta data
          const currentField = aiSchema[modelTitle].fields[fieldName];
          let type = null;
          switch (currentField.type) {
            case 'string':
            case 'currency':
            case 'enum':
            case 'date':
            case 'boolean':
            case 'file':
            case 'creatable_string_select':
            case 'email':
            case 'phone':
            case 'text':
            case 'ID': {
              type = currentField.type;
              break;
            }
            default: {
              if (relationalFieldTypes.includes(currentField.fieldName)) {
                type = {
                  // FieldName is the closest representation to what type should be
                  name: currentField.fieldName.toLowerCase(),
                };
              }
            }
          }
          if (type) {
            const field = {
              name: String(fieldName),
              type,
              required: aiSchema[modelTitle].fields[fieldName].required,
            };
            compatibleFields.push(field);
          }
        });
        return {
          name: aiSchema[modelTitle].queryName,
          fields: compatibleFields,
        };
      });
      return { models: conveyorSchema };
    }

    const Conveyor = window.conveyor.Conveyor
    const request = window.conveyor.request

    // Fetcher to retrieve schema from endpoint
    const schemaUrl = '/api/schema';
    const schemaFetcher = async () => {
      const response = await fetch(schemaUrl);
      const remoteSchemaResponse = await response.json();
      return autoInventAdapter(remoteSchemaResponse.definitions);
    };
    // Fetcher to retrieve GraphQL query/mutation from endpoint
    const graphQLUrl = '/api/graphql';
    const graphqlFetcher = async (graphQLParams) => {
      const result = await request(
        graphQLUrl,
        graphQLParams.request,
        graphQLParams.variables,
      );
      return result;
    };

    ReactDOM.render(
      React.createElement(Conveyor, {
        schemaFetcher: schemaFetcher,
        gqlFetcher: graphqlFetcher,
      }),
      document.getElementById('conveyor'),
    );
  </script>
</body>
</html>
```

## Resources
