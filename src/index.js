window.addEventListener('input', validate);
window.addEventListener('click', validate);
window.addEventListener('form-validity', validate);
window.addEventListener('form-validity', function (e) {
    if (e.target.getAttribute('class').indexOf('form-validity') !== -1)
        validateFormElem(e.target);
});
function validate(e) {
    var isValidityForm = false;
    var form;
    var curr = e.target;
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') return;
    if (e.target.getAttribute('type') === 'submit' || e.target.getAttribute('type') === 'button') return;
    while (curr = curr.parentElement) {
        if (curr.hasAttribute('class')
            && curr.getAttribute('class').indexOf('form-validity') !== -1) {
            form = curr;
            isValidityForm = true;
            break;
        }
    }
    if (!isValidityForm) return;
    var validity = e.target.validity;
    console.log(validity);
    if (e.target.hasAttribute('data-validity-match')) {
        var matchInput = document.getElementById(e.target.getAttribute('data-validity-match'));
        if (e.target.value !== matchInput.value) {
            e.target.setCustomValidity(e.target.getAttribute('data-validity-match-msg') ||
                'Doesn\'t match ' + (matchInput.getAttribute('aria-label') || matchInput.getAttribute('title') 
                    || matchInput.getAttribute('name') || 'other element') + '.');
        } else e.target.setCustomValidity('');
    }
    if (e.target.hasAttribute('data-validity-warn-pattern')) {
        var pattern = e.target.getAttribute('data-validity-warn-pattern');
        var reg = new RegExp(pattern);
        if (reg.test(e.target.value)) {
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity(e.target.getAttribute('data-validity-warn-pattern-msg') || 'Incorrect format.');
        }
    }
    if (e.target.hasAttribute('data-validity-warn-minlength')) {
        var minLen = +e.target.getAttribute('data-validity-warn-minlength');
        if (minLen > e.target.value.length) {
            e.target.setCustomValidity(e.target.getAttribute('data-validity-warn-pattern-msg') || 'Should be at least ' + minLen + ' characters long.');
        } else  {
            e.target.setCustomValidity('');
        }
    }
    if (e.target.hasAttribute('data-validity-warn-maxlength')) {
        var maxLen = +e.target.getAttribute('data-validity-warn-maxlength');
        if (maxLen > e.target.value.length) {
            e.target.setCustomValidity(e.target.getAttribute('data-validity-warn-maxlength-msg') || 'Should not be more than ' + maxLen + ' characters long.');
        } else {
            e.target.setCustomValidity('');
        }
    }
    if (e.target.hasAttribute('data-validity-warn-min')) {
        var min = +e.target.getAttribute('data-validity-warn-min');
        if (min < +e.target.value) {
            e.target.setCustomValidity(e.target.getAttribute('data-validity-warn-min-msg') || 'Should not be less than ' + min + '.');
        } else {
            e.target.setCustomValidity('');
        }
    }
    if (e.target.hasAttribute('data-validity-warn-max')) {
        var max = +e.target.getAttribute('data-validity-warn-max');
        if (max > +e.target.value) {
            e.target.setCustomValidity(e.target.getAttribute('data-validity-warn-max-msg') || 'Should not be more than ' + maxLen + '.');
        } else {
            e.target.setCustomValidity('');
        }
    }
    if (validity.valid) {
        e.target.setAttribute('aria-invalid', 'false');
    } else {
        e.target.setAttribute('aria-invalid', 'true');
    }
    if (e.target.hasAttribute('aria-describedby')) {
        var helper = document.getElementById(e.target.getAttribute('aria-describedby'));
        if (validity.valid) {
            helper.innerText = '';
            helper.classList.remove('error');
            helper.classList.remove('warning');
        } else if (validity.patternMismatch) {
            helper.innerText = e.target.getAttribute('title') || e.target.validationMessage;
        } else {
            helper.innerText = e.target.validationMessage;
        }
        if (!validity.valid) {
            helper.classList.add('error');
        }
    }
    validateFormElem(form);
};
function validateFormElem(form) {
    var validForm = form.checkValidity();
    var submitButtons = Array.prototype.slice.apply(
        document.getElementsByTagName('button')).concat(
            Array.prototype.slice.apply(document.getElementsByTagName('input')));
    var i;
    if (validForm) {
        for (i = 0; i < submitButtons.length; i++) {
            if (submitButtons[i].getAttribute('type') === 'submit')
                submitButtons[i].removeAttribute('disabled')
        }
    } else {
        for (i = 0; i < submitButtons.length; i++) {
            if (submitButtons[i].getAttribute('type') === 'submit')
                submitButtons[i].setAttribute('disabled', 'true');
        }
    }
}



