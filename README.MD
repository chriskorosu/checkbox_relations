# Checkbox Relations

### Quick Description

Relational checkboxes are interdependent inputs that automatically toggle related children and parents on or off.

### Visual Description

![Animated GIF demonstrating the interactions and data structure](readme.gif)

### Detailed Description

This script and the corresponding data structure allow you to set up relationships between any number of checkboxes on an HTML page. When a parent is toggled manually, the children are automatically toggled on or off, depending on the state the parent requires them to be in. Similarly, when a child is toggled manually, the parents may also be toggled on or off automatically if needed.

The state of the checkboxes is saved between browser sessions, assuming the user has local storage turned on in their browser (this is on by default on most systems).

### How To Use It

To see this script in action, open up `index.html` and play around with the checkboxes for a bit. The checkboxes are implemented in the HTML file. The main script is in `main.js`, and the data structure is in `data.js`. The `demo.js` file merely imports the two other files and makes the function call.

To adapt this script for your own purposes, you should only have to edit your own HTML file by adding the required input boxes, and define a data structure reflecting your own setup and desired checkbox relations. The main script in `main.js` shouldn't have to be touched but merely imported into your own javascript file as a module and called with your new data file as an argument. 

Our demo consists of nine checkboxes in total: four parents (`parent1`, `parent2`, `parent3`, `fallback`) and five children (`child1` through `child5`).

The HTML code for one of the input checkboxes is provided below. The important thing to note here is the `id` attribute, which is reflected in the data structure.

```
<input type="checkbox" id="parent1">
```

Our demo data structure provided looks as follows.

```
const checkboxRelations = {
  parents: ['parent1', 'parent2', 'parent3', 'fallback'],
  children: {
    child1: [true, false, false],
    child2: [true, false, false],
    child3: [true, false, false],
    child4: [false, false, true],
    child5: [false, false, false]
  },
  last_non_fallback_parent: 'parent1',
  last_fallback_state: [true, true, true, true, true]
}
```

Again, note that the identifiers used in the data structure match the ID attributes used for the HTML checkboxes. Also note that the child identifiers are not surrounded by quotes in our case, but the quotes may be required depending on what identifiers you use (e.g. identifiers with dashes such as `child-one`).

Each child consists of an array of boolean values. Each boolean value corresponds to the checked state of the child that the parent of the same index in the parents array needs it to be in. So when `parent1` is manually toggled on, the script automatically toggles `child1`, `child2`, and `child3` on and `child4` and `child5` off.

The `fallback` parent is a special parent that is toggled when the children are in an undefined state. So if all children are toggled on, then `fallback` will also be toggled on, because there is no other parent that corresponds to that set of child states.

The `last_non_fallback_parent` and `last_fallback_state` are used for initialization. You may specify a different default parent or default fallback state if you'd like.

### Projects Using This Module

https://wordluxe.io/ (the game settings are relational checkboxes styled as toggles).

### Usage License

All content is copyright 2023 by Chris. You are welcome to use/modify every part of this program/script to your heart's content provided you give me attribution in a non-hidden, accessible location in your work where such information would usually be found. The credit should include my first name and a link to the repository itself. Below is an example of what this attribution might look like.

> The checkbox relations module is free and open-source software originally created by Chris. The original module is available at https://github.com/chriskorosu/checkbox_relations.

I would also appreciate a note letting me know where and how this is being used, but it's not necessary. My contact information is available on my [Github profile](https://github.com/chriskorosu/).