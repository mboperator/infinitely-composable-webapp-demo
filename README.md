# Infinitely Composable Webapps
> A demo of the Elm Architecture using `redux-modules` and `redux-loop`

## The Apps Being Composed:

### PokemonMe!
PokemonMe uses the public `Pokemon API` to deliver nostalgia on every button press. The app is comprised of of a single Component that holds the view, and a module which takes care of fetching and caching responses from the Pokemon API.

![PokemonMe Demo](https://i.imgur.com/GhT6J0k.gif)

[Link to repository](https://github.com/procore/redux-modules/tree/master/examples/PokemonMe/src)

### Stopwatch
A self managed stopwatch component which increments its time until the reset button is clicked.
![Stopwatch Demo](https://i.imgur.com/JJk8MtX.gif)

[Link to repository](https://github.com/procore/redux-modules/tree/master/examples/Stopwatch/src)

### SplitPane
SplitPane is an attempt to replicate pane splitting, similar to `tmux` and `iTerm`. The app comprises of a single Component that holds the view, and a module which takes care of state transformations and side effects.

This is a great example of the power of `redux-modules` and `loops` in that each parent box delegates state transformations to its children to the child reducer.
![SplitPane D](https://i.imgur.com/ha2bLxn.gif)

[Link to Repository](https://github.com/procore/redux-modules/tree/master/examples/SplitPane/src)

## Putting it together

![Infinite Split Pane](https://i.imgur.com/zHJY33E.gif)
This infinite split pane example tests the limits of the pattern.

Each of the apps rendered share a slice of the full parent state. By keeping the state nested and denormalized, there's no added complexity when it comes to managing child components.

Additionally, because each `parent` component manages its children, we have control over child state at every level. This gives us the ability to respond to global actions, as well as local ones.
