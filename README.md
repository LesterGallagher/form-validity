# form-validity

Adding this library to your page automatically add validation for your forms. Form validation is build on the HTML5 constraint validation API which is supported on all modern browsers.
You can use the default style.css or use it as a boilerplate.
```html 
<link rel="stylesheet" href="style.css">
<script src="form-validity.min.js">
```

For example:
```html
<form class="form-validity" action="/backend-form-sumission" method="POST">
    <input type="text" minlength="6" required name="username" placeholder="username">
</form>
```
Make sure to add the "form-validity". If you open this example you will instantly see the form validation it work. You dont have to call any javascript. All of the css styles can be overidden, including the required star (*) symbol image. 

Right now the user only sees changing colors when the validity of the form element changes. We can add validation messages by the "aria-describedby" attribute and setting the value to the id of the helper message element:

```html
<form class="form-validity" action="/backend-form-sumission" method="POST">
    <input type="text" minlength="6" required name="username" aria-describedby="username-help" placeholder="username">
    <small id="username-help"></small>
</form>
```

If you have a submit button in the form, it's best to set the disabled attribute to true. The value will be changed to false when all of the inputs are valid.
```html
<input disabled type="submit" value="Submit">
```

You can also do password matching by setting the "data-validity-match=&lt;elementid&gt;" attribute:
```html
<form class="form-validity" action="/backend-form-sumission" method="POST">
    <input type="password" minlength="6" required name="password" aria-describedby="password-help" placeholder="password">
    <small id="password-help"></small>

    <input type="password" data-validity-match="password" minlength="6" required aria-describedby="password-match-help" placeholder="confirm password">
    <small id="password-match-help"></small>
</form>
```

A more complex example with pattern matching:
```html
<form class="form-validity" action="/backend-form-sumission" method="POST">
    <label for="date" aria->
        <span>Expiration date:</span>
        <strong>
            <abbr title="required">*</abbr>
        </strong>
        <em>formatted as mm/yy</em>
    </label>
    <input aria-describedby="date-help" required pattern="[0-9][0-2]?/[1,2][9,0][0-9]{2}" type="text" id="date" name="expiration">
    <small id="date-help"></small>
</form>

<input aria-describedby="date-help" required pattern="[0-9][0-2]?/[1,2][9,0][0-9]{2}" type="text" id="date" name="expiration">
```

You can also it warning messages by setting "data-validity-warn-&lt;warning-type&gt;" attributes. Warning-type attributes are:
* pattern
* minlength
* maxlength
* min
* max

Manually triggering vorm validation can be done like this:
```javascript
var event = new Event('form-validity');
document.getElementById('form-or-input-element-id').dispatchEvent(event);
```
