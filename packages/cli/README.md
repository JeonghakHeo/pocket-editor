## PocketStudio

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

![preview](https://github.com/JeonghakHeo/pocket-studio/blob/main/packages/cli/public/preview.png)

- Click any text cell to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell

All of your changes get saved to the file you opened PocketStudio with. So if you ran `npx pocket-studio serve test.js`, all of the text code you write will be saved to the `test.js` file.

## Installation

```
npx install pocket-studio
```

## Quick Start

```
npx pocket-studio serve
```

## Commands

```
serve [<filename>] [--port <port>]
```

## Options

```
-p --port Port to the run local API server on

serve -p 4000
serve --port 4000
```

## Usage

```
// Cell #1
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
      <h3>Count: {count}</h3>
    </div>
  );
};

// Display any variable or React component by calling 'show'
show(<Counter />);
```

```
// Cell #2
const App = () => {
  return (
    <div>
      <h3>App Says Hi!</h3>
      <i>Counter component will be rendered below...</i>
      <hr />
      {/*
        Counter was declared in an earlier cell -
        we can reference it here!
       */}
       <Counter />
    </div>
  );
};

show(<App />);
```
