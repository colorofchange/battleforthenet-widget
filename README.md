# How to install the widget

Add this to any page, and you're golden: ([**See the demo!**](https://widget.battleforthenet.com/demos/modal.html))

```html
<script src="//fightforthefuture.github.io/battleforthenet-widget/widget/rtn.js" async></script>
```

The goal of this project is to allow anyone with a web site to run their own campaign to save net neutrality. Simply add one line of Javascript and you're good to go! The modal animation will show up front-and-center on your page, prompting
visitors to contact Congress and the FCC.

If you have any problems or questions regarding the widget, please [submit an issue](https://github.com/fightforthefuture/battleforthenet-widget/issues).


# How it works

The widget is designed to only appear on July 12, 2017, and only once, per user, per device. If you'd like to force it to show up on your page for testing, please reload the page with `#SHOW_BFTN_WIDGET` at the end of the URL.

Please take a look at [**widget.js**](https://github.com/fightforthefuture/battleforthenet-widget/blob/master/widget.js) if you want to see exactly what you'll
be embedding on your page.

* Compatible with Firefox, Chrome, Safari and Internet Explorer 10+
* Embed the widget Javascript code on your page
* Optionally pass in customization parameters (see below), or defaults are used
* Widget checks to make sure it should be shown (September 10th 2014 and hasn't
  been shown to this user before, via cookie). You can override this check for
  testing purposes
* Widget preloads any images required for the chosen animation
* Widget injects a floating `iframe` onto your page. All but the most trivial
  styles and interactions take place in the `iframe` so as not to interfere with
  your CSS and Javascript
* Animation displays in floating `iframe`
* The user can dismiss the `iframe` and a cookie is written so it won't show
  again (unless you override)


#### Modal customization options:

If you define an object called `_bftn_options` before including the widget code,
you can pass some properties in to customize the default behavior.

* `skipEmailSignup`: (Boolean, default _false_) Disables the email signup and
  only shows the Call Congress tool.
* `skipCallTool`: (Boolean, default _false_) Disables the Call Congress tool and
  only shows the email signup form. Creates a quantum singularity if the
  `skipEmailSignup` option is also used.
* `fastAnimation`: (Boolean, default _false_) Fast forwards through the intro
  animation and makes the action form appear much faster.


#### Customized modal examples:

**Call Congress modal with email signup disabled. Paste this into your `HEAD`:**
```html
<script type="text/javascript">
    var _bftn_options = {
      skipEmailSignup: true
    }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```

**Modal with Call Congress tool disabled. Paste this into your `HEAD`:**
```html
<script type="text/javascript">
    var _bftn_options = {
      skipCallTool: true
    }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```


# Embed the modal on your site

If you want to show off the modal to your users prior to September 10th
(thanks!) you can use this code to directly embed it on your page:

**To embed the action form on your page, use this code:**
```html
<iframe style="width: 750px; height: 467px;" frameborder="no"
  src="https://widget.battleforthenet.com/iframe/modal.html#EMBED">
  </iframe>
```


# Which browsers are supported

Modern browsers, and the two latest versions of Internet Explorer (11 and Edge).
