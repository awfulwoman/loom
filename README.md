# Loom

Loom lets you easily build your own design systems. Organised around [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) it gives you a quick way of scaffolding sites, and then a more nuanced way of developing your own components.

Highly modular, Loom lets you easily extend it with your own modules and classes.

# Example

```scss
.c-fancy-button {
  @include button(get-color(white), get-color(primary-brand));
  @include font-size(large);
  padding: get-spacing(xsmall) get-spacing(small);
}
```

# Manifesto

Loom's manifesto and opinions:

- Loom tries to make things *easier* for a developer.
- Loom doesn't come with a "theme" or a prebuilt pattern library. Loom helps you to weave _your own_ pattern libraries.
- Loom is a tool and isn't designed to "drop in and go". It is something to help professional designer/developers in their everyday tasks.
- Loom is very opinionated about:
  - Being an integral part of a design system. Therefore in Loom all colour, spacing and font values originate from centralised settings and are accessed only via getter functions.
  - Keeping styling separate from structure. Loom only provides minimal styling to HTML elements and leaves everything else up to classes.
  - Keeping specificity low. Loom is structured around ITCSS, so a selectors specificity should come from its source order, and nothing else. That also means:
    - No `@extend`s. These so, so, so easily mess up the source order of a project. Because ITCSS, the core of this, is source order dependent, it's best to avoid any use of `@extend`.
    - No nesting. Loom really doesn't like nesting. Nesting makes for horrible specificity problems.
    - No IDs. IDs make for even more horrible specificity problems. Just... no.
  - Being modular. If you don't like the way something works in Loom, you can remove it or use your own module instead.
- Loom doesn't care about:
  - How you name your CSS selectors. Yes, it's opinionated about Sass structure, but kinda indifferent to your CSS output.
  - Whether you want to use atomic or utility classes.
  - Vendor prefixes - let's leave that up to Autoprefixer.

# Installation

Eventually this will be an npm module, a bower module and gem. For now it's installable via npm:

```bash
$ npm install loomcss --save-dev
```
Or go old-school and copy/paste the contents of the `assets` folder into your project. Hey, whatever works, right?

# Usage

Once installed, you will need to add the installation path to your own build system. This will probably be something like `node_modules/loomcss/assets`.

Once you have made that folder available to your build you can access the Loom layers using:

```scss
// ----->  ADD YOUR OWN MODULES ABOVE HERE!
@import 'loom/10-global-settings';

@import 'loom/20-tools';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/30-generic';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/40-base-elements';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/50-layout';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/60-objects';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/70-ui-components';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/80-utilities';
// ----->  ADD YOUR OWN MODULES BELOW HERE!

@import 'loom/90-trumps';
// ----->  ADD YOUR OWN MODULES BELOW HERE!
```
Please DON'T just link to `main.scss`! This will prevent you getting access to the interweaved layers of the ITCSS stack (it's there as an example only). Instead, copy [the list of imports](https://github.com/sonniesedge/loom/blob/master/assets/main.scss) from `main.scss` into your main project file. Yes, it feels a bit unusual, but you'll gain a lot of power by doing so.

Add you own modules underneath the Loom layers (with the exception of the settings layer - to override Loom variables your own settings module must be placed *above* the Loom module.) If you require even more fine-grained control then you can copy and paste the imports from the layer import partials to your own Sass file.

Please remember that this framework is a basis for your own design system and won't give you much to see visually out of the box!

# Organisation layers

The Sass in the project is arranged in layers, with specificity and scope increasing as you decend from layer 10 to 100. Layers at the top (10) are extremely broad in scope and of low specificity, and those at the bottom (100) being extremely specific and high specificity.

You can add your own layers, but the default ones are as follows:

## 10 - Global settings
Sass global variables. Should only contain those things used by multiple layers and modules.

## 20 - Tools
Mixins and functions to support the lower layers.

## 30 - Generic
Generic CSS, imported Normalize and Reset CSS. Things that aren't really visual, but have a lot of impact across the project.

## 40 - Base elements
Specific simple styling for base elements. Loom gives some extremely simple styling to those elements that have a standard visual "state" and are not normally styled with the aid of classes (`<p>`, `<ul>`, `<dl>`, etc).

Headings (`<h1>` to `<h6>`) are the exception to this, as they are often used to provide semantic meaning, and so have their styling removed by default.

In general styling for must be added via a module from the Objects, UI Components or Utilities layers.

## 50 - Layouts
Layer modules that provide layout-specific styling. They are used on *wrapper* containers that themselves contain Objects or UI Components.

NOTE: Complications will likely occur if a Layout module and a lower layer module are used on the same HTML element!

## 60 - Objects
Complex chunks of CSS that are used as the base for UI Component modules. Each object is defined as a mixin and expressed as a class, and each class can be used on its own.

The classes can be used for quick scaffolding, anchoring their classnames directly to CSS. (However, Loom opines that they should eventually be converted into UI Components, which directly consume the Object mixins. But Loom has some funny ideas and talks about The War a lot).

Some things might stay as class-based objects, and be used as a base for skinning, in true OOCSS style. For example, `.button` can serve as the OO base for `.c-button` and `.c-button--primary`.

```html
<button class="o-button c-button c-button--primary">Continue</button>
```

Or `.c-button` might consume `@include o-button` directly:

```scss
.c-button {
  @include button();
}
```

```html
<button class="c-button c-button--primary">Continue</button>
```

Your choice!

## 70 - UI components
These are highly visual components built from Object mixins, Loom settings and custom CSS.

This layer will probably form the core of your own projects! :D

## 80 - Utilities
Utility modules provide classes that do one thing. While most visual styling should come from the component layer, there are always occasions where a separate class is needed to quickly nudge a component into shape.

Loom thinks that these should be used with caution, and that excessive use of these implies that a component or setting is lacking.

## 90 - Trumps
"Trumps" as in "a trump card". Extremely high specificity selectors live here!

Anything in this layer is used with some embarrassment. An example use might be to override CSS coming from external sources.

The only layer that `!important` is permitted in a module.

# Selector notation
By default this project uses BEM notation for the optional CSS selectors.

# Fonts
You can specify fonts via the `$LOOM-fonts`. By default there is a `primary` and a `secondary` font. The default usage is secondary for headings and primary for everything else.

Each of these has a `base` and a `webfont` variant. These are for use with a font-observer system, that will add the class specified in `$LOOM-fonts-loaded` to the HTML element, allowing webfonts to be used without FOIC occurring.

# Naming conventions
The naming convention for internal variables and classes is as follows:

```
object-property-variant-state
```

- `object` is the thing being operated on.
- `property` is the aspect of object that is being altered.
- `variant` is a version of the object.
- `state` is a state change, such as being active, or a breakpoint.

So examples of this might be:

- `.margin-left-small {}` Object = margin; property = left; variant = small;
- `$padding-top-large` Object = padding; property = top; variant = large;
- `.button-background-primary {}` Object = button; property = background; variant = primary;
- `$button-background-color-hover` Object = button; property = background-color; state = hover; (note that background-color is one word. Hyphens are used to match the CSS property naming convention).

# Developing
Always looking for fellow conspirators.

# Reading
- http://www.hongkiat.com/blog/basics-of-object-oriented-css/
- https://www.sitepoint.com/atomic-oobemitscss/
