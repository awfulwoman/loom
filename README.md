# Loom

Loom gives you a way to build your own atomic design systems. Organised using ITCSS, and uses BEM as a naming convention, it aims to give you a quick way of scaffolding sites, and then give you a way of building your own atomic components.

Loom tries to find that sweet spot between [Atomic CSS](http://acss.io/) and manually written, appended-to-the-end-of-one-huge-css-file CSS.

It's highly modular, and lets you easily extend it with your own modules and classes.

# Example

```scss
.c-fancy-button {
  @include button(get-color(white), get-color(primary-background);
  @include font-size(large);
  padding: get-spacing(xsmall) get-spacing(small);
}
```

# Manifesto

Loom's manifesto:

- Loom tries to make things *easier* for a developer.
- Loom doesn't come with a "theme" or a prebuilt pattern library. Loom helps you to weave _your own_ pattern libraries.
- Loom is a tool and isn't designed to "drop in and go". It is something to help professional designer/developers in their everyday tasks.
- Loom loves design systems. THey're built into it from the core, with standardised ways of accessing global colours, spacing units and fonts.
- Loom doesn't try and force you into the binary of choosing to write components or utility classes. It leaves that choice up to you.
- Loom is opinionated about Sass structure, but kinda indifferent to CSS output. Loom would LOVE it if you used BEM, but you don't have to. Your final UI Components can be written however you wish.
- Loom is modular. You can easily add your own modules into a layer and have them working alongside the prebuilt ones.
- Loom loves best practise, and is quite opinionated on this, even if it doesn't force your hand. It loves the avoidance of nesting, styling of classes rather than base elements and the avoidance of specificity battles!
  - No nesting. Loom really doesn't like nesting. Nesting makes for horrible specificity problems.
  - No IDs. IDs make for even more horrible specificity problems. Just... no.
  - Specificity should come from source order, not selector specificity weight.
  - CSS decoupled from markup. Only the Base Elements layer touches HTML directly, and then only to lightly style it. Every other layer should interact with HTML via classes.
- Loom knows when others do it better. Browser prefixes are (when necessary) best left to Autoprefixer, no?


# Installation

Eventually this will be an npm module, a bower module and gem.

```bash
$ npm install loomcss --save-dev
```

# Usage

Once installed, you will need to add the installation path to your own build system. This will probably be something like `node_modules/loomcss/assets`.

Once you have made that folder available to your build you can access the Loom layers using:

```scss
@import 'loom/10-global-settings/misc';
// etc
```
DON'T just link to `main.scss`! This will prevent you getting access to the interweaved layers of the ITCSS stack. Instead, copy [the list of imports](https://github.com/sonniesedge/loom/blob/master/assets/main.scss) from `main.scss` into your main project file. Yes, it feels unusual, but you'll gain a lot of power by doing so.

This library is a basis for your own design system and won't give you much visually out of the box!

# Organisation layers

The layers of this project descend in specificity and scope order, from 10 to 100, with those at the top (10) being extremely broad and of low specificity, and those at the bottom (100) being extremely specific and high specificity.

## 10 - Global settings
Sass global variables. Should only contain those things used by multiple layers and modules.

## 20 - Tools
Mixins and functions to support lower layers.

## 30 - Generic
Generic CSS, imported Normalize and Reset CSS. Things that aren't really visual.

## 40 - Base elements
Specific simple styling for base elements. Loom gives some extremely simple styling to those elements that have a standard visual "state" are not normally styled with the aid of classes (`<p>`, `<ul>`, `<dl>`, etc). Headings (`<h1>` to `<h6>`) are the exception to this, as they are often used to provide semantic meaning, and so have their styling removed by default. Styling must be added via the Objects, UI Components or Utilities.

## 50 - Layouts
Layer modules that provide layout-specific styling. They are used on wrapper containers that contain objects or components. Complications will likely occur if a Layout module and a lower layer module are used on the same HTML element.

## 60 - Objects
Complex chunks of CSS that are used as the base for UI Component modules. Each object is defined as a mixin and expressed as a class, and each class can be used on its own. The classes can be used for quick scaffolding, anchoring their classnames directly to CSS. However, they should eventually be converted into UI Components, which directly consume the Object mixins.

Some things might stay as class-based objects, and be used as a base for skinning, in true OOCSS style. For example, `.button` can serve as the OO base for `.c-button` and `.c-button--primary`. `<button class="o-button c-button c-button--primary">Continue</button>`. Or `.c-button` might consume `@include o-button` directly, with the HTML being `<button class="c-button c-button--primary">Continue</button>`. Your choice!

Nothing really "visual" here, although a wireframe site and be quickly built up using this layer alone.

## 70 - UI components
These are highly visual components built from Object mixins, Loom settings and custom CSS.

## 80 - Utilities
Utility modules provide classes that do one thing. While most visual styling should come from the component layer, there are always occasions where a separate class is needed to quickly nudge a component into shape. Should be used with caution. Excessive use of these implies that a component or setting is lacking.

## 90 - Trumps
"Trumps" as in "a trump card". Extremely high specificity selectors. Anything in this layer is used with some embarrassment. An example use might be to override CSS coming from external sources.

The only layer that `!important` is permitted in a module.

# Selector notation
By default this project uses BEM notation for the optional CSS selectors.

# Fonts
You can specify fonts via the `$LOOM-fonts`. By default there is a `primary` and a `secondary` font. The default usage is secondary for headings and primary for everything else.

Each of these has a `base` and a `webfont` variant. These are for use with a font-observer system, that will add the class specified in `$LOOM-fonts-loaded` to the HTML element, allowing webfonts to be used without FOIC occurring.

# Developing
Always looking for fellow conspirators.

# Reading
- http://www.hongkiat.com/blog/basics-of-object-oriented-css/
- https://www.sitepoint.com/atomic-oobemitscss/
