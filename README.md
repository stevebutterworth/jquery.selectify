jquery.selectify
================

A javascript widget for simple multi select when dealing with short lists. It uses standard HTML select boxes and jquery to add a more intuitive and easily cusomizable interface.

## Rational
I love [Chosen](http://harvesthq.github.io/chosen/) for intuitive multi select of long lists such as countries but it doesn't seem like the right choice for multi select from a short list. I still wanted a select box because I wanted the same behaviour as a select box but I wanted a more intuitive UI.

## Details
This is a branch of [jquery.tabselect](http://fredibach.ch/jquery-plugins/tabselect.php) with a couple of extra features and a bit of cleaning up so my HTML markup can be exactly as a standard select box and the js widget does the rest.

It works for multi select...

![Multi select](https://raw.githubusercontent.com/stevebutterworth/jquery.selectify/master/images/eg1.png)

...and for single select...

![Single select](https://raw.githubusercontent.com/stevebutterworth/jquery.selectify/master/images/eg2.png)

...and the styling is easily customizable via css


## Code Example

To get started just download jquery.selectify.js and selectify.css and include them in your html page. Then simply add some shine to those select boxes with something like this...

HTML

```html
  <select class="selectify" id="languages" multiple="multiple" name="languages">
    <option value="ruby">Ruby</option>
    <option value="javascript">Javascript</option>
    <option value="swift">Swift</option>
    <option value="java">Java</option>
    <option value="php">PHP</option>
  </select>
```

Javascript

```javascript
  $(document).ready(function(){
    $(".selectify").selectify();
  })
```

## Attribution
Thank you to [Fredi Bach](http://fredibach.ch/) for the original work and thank you to [Working Planet Ltd](http://www.workingplanet.co.uk/) for sponsoring the development of the selectify widget.

