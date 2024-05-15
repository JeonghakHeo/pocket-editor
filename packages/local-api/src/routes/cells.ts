import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

interface LocalApiError {
  code: string
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string'
    }

    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      res.send(JSON.parse(result))
    } catch (err) {
      // If read throws an error
      // Inspect the error see if it says that the file doesn't exist

      // Parse a list of cells out of it
      // Send list of cells back to browser
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8')
          res.send([
            {
              type: 'text',
              content:
                '## PocketStudio\n\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add enw cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened PocketStudio with. So if you ran `npx pocket-studio serve test.js`, all of the text code you write will be saved to the `test.js` file.',
              id: 'y06nv',
            },
            {
              type: 'code',
              content:
                "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>\n        Click\n      </button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n\n// Display any variable or React component by calling 'show'\nshow(<Counter />);",
              id: 'yp883',
            },
            {
              type: 'code',
              content:
                'const App = () => {\n  return (\n    <div>\n      <h3>App Says Hi!</h3>\n      <i>Counter component will be rendered below...</i>\n      <hr />\n      {/*\n        Counter was declared in an earlier cell -\n        we can reference it here!\n       */}\n       <Counter />\n    </div>\n  );\n};\n\nshow(<App />);',
              id: '3vfy5',
            },
          ])
        }
      } else {
        throw err
      }
    }
  })

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body
    // Write the cells into the file

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 'ok' })
  })

  return router
}
