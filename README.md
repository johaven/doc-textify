# Doc-Textify

**Doc-Textify** is a TypeScript library and command-line tool that extracts and cleans text from various document formats. 


## 🚀 Features

* **Multi-format support**:

    * Microsoft Word (`.docx`)
    * PowerPoint (`.pptx`)
    * Excel (`.xlsx`)
    * OpenOffice/LibreOffice (`.odt`, `.odp`, `.ods`)
    * PDF (`.pdf`)
    * Plain text (`.txt`)
    * HTML (`.html`, `.htm`)
* **Content cleaning**: removes extra whitespace, handles custom line delimiters.
* **Configurable options**: set newline delimiter, minimum characters to extract, and toggle error logging.

## 📦 Library Usage

Install the package and import it in your project:

```bash
npm install doc-textify --save
```

```ts
import { docTextify } from 'doc-textify'

// async/await version
try {
    const text = await docTextify('path/to/file.pdf')
} catch (e) {
    console.error(err)
}

// or callback version
docTextify('path/to/file.pdf')
    .then(text => console.log(text))
    .catch(err => console.error(err))
```

**Default options**:
  ```ts
  try {
    const text = await docTextify('path/to/file.pdf', {
        newlineDelimiter: '\n', // output content delimiter
        minCharsToExtract: 0, // number of chars required to output the content, default disabled (0)
        outputErrorToConsole: true // log error to console
        })
    } catch (e) {
        console.error(err)
    }
  ```

## 🚀 CLI Usage (Optional)

If you prefer a ready-made command, the `doc-textify` CLI wraps the same functionality:

### Installation

Global install to use the `doc-textify` command anywhere:

```bash
npm install -g doc-textify
```

Or install locally:

```bash
npm install doc-textify --save
```

### Command

```bash
doc-textify <path/to/document> [options]
```

#### Options

| Option                                               | Description                             | Default                   |
| ---------------------------------------------------- | --------------------------------------- |---------------------------|
| <code>-n</code>, <code>--newlineDelimiter</code>     | Line delimiter to insert                | <code>"\n"</code>         |
| <code>-m</code>, <code>--minCharsToExtract</code>    | Minimum number of characters to extract | <code>0 (disabled)</code> |
| <code>-h</code>, <code>--help</code>                 | Display help message                    | —                         |

#### Example

```bash
doc-textify document.docx -n "\r\n" -m 20 > output.txt
```

## 📥 Installation from Source

```bash
git clone https://github.com/johaven/doc-textify.git
cd doc-textify
npm install
npm run build    # outputs compiled files into /dist
npm run test     # test parsing
```

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to your branch: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).