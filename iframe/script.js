(function() {
  var transitionTimer;

  var loading = document.getElementById('loading');
  var main = document.getElementById('main');
  var callPrompt = document.getElementById('prompt');
  var callScript = document.getElementById('script');

  function getOrg(org) {
    function getRandomOrg() {
      var coinToss = Math.random();

      if (coinToss < .20) {
        return 'coc';
      } else if (coinToss < .60) {
        return 'coc';
      } else {
        return 'coc';
      }
    }

    var orgs = {
      'coc': {
        code: 'coc',
        name: 'Color Of Change',
        url: 'https://www.colorofchange.org/',
        donate: 'https://secure.actblue.com/contribute/page/support-us'
      }
    };

    return orgs.hasOwnProperty(org) ? orgs[org] : orgs[getRandomOrg()];
  }

  function getTheme(theme) {
    switch(theme) {
      case 'money':
        return {
          className: theme,
          logos: ['images/money.png'],
          headline: 'Please upgrade your plan to proceed.',
          body: "Well, not yet. Trump and his FCC want to get rid of net neutrality- the principle that all information is treated the same on the internet. Since we are the nation's largest online racial justice organization, if they get their way, the way we use the Internet to organize will never be the same. But we can stop them and keep the web safe, open, and secure if we all use our voices to to demand Congress and the FCC save net neutrality!"
        };
      case 'stop':
        return {
          className: theme,
          logos: ['images/stop.png'],
          headline: 'This site has been blocked by your ISP.',
          body: "Well, not yet. Trump and his FCC want to get rid of net neutrality- the principle that all information is treated the same on the internet. Since we are the nation's largest online racial justice organization, if they get their way, the way we use the Internet to organize will never be the same. But we can stop them and keep the web safe, open, and secure if we all use our voices to to demand Congress and the FCC save net neutrality!"
        };
          // This option has COC specific language.
      case 'slow':
        return {
          className: theme,
          logos: ['images/slow.png'],
          headline: 'Sorry, we\'re stuck in the slow lane.',
          body: "Well, not yet. Trump and his FCC want to get rid of net neutrality- the principle that all information is treated the same on the internet. Since we are the nation's largest online racial justice organization, if they get their way, the way we use the Internet to organize will never be the same. But we can stop them and keep the web safe, open, and secure if we all use our voices to to demand Congress and the FCC save net neutrality!"
        };
      default:
        return {
          className: 'without',
          logos: ['images/slow.png', 'images/stop_gradient.png', 'images/money_gradient.png'],
          headline: 'This is the web without net neutrality.',
          body: "Well, not yet. Trump and his FCC want to get rid of net neutrality- the principle that all information is treated the same on the internet. Since we are the nation's largest online racial justice organization, if they get their way, the way we use the Internet to organize will never be the same. But we can stop them and keep the web safe, open, and secure if we all use our voices to to demand Congress and the FCC save net neutrality!"
        };
    }
  }

  function renderContent(theme, bodyCopy) {
    document.body.classList.add(theme.className);

    // Render logos
    var fragment = document.createDocumentFragment();
    var img;

    for (var i = 0; i < theme.logos.length; i++) {
      img = document.createElement('img');
      img.setAttribute('src', theme.logos[i]);
      fragment.appendChild(img);
    }

    document.getElementById('logos').appendChild(fragment);

    // Render headline and body copy
    document.getElementById('headline').textContent = theme.headline;
    if (bodyCopy) {
          document.getElementById('content').innerText = bodyCopy;
    } else {
      document.getElementById('content').innerText = theme.body;
    }
  }
  
  function addRefferingSource(referrer) {
    var org_source = document.createDocumentFragment();
    
    var orgSourceInput = document.createElement('input');
    orgSourceInput.setAttribute('type', 'hidden');
    orgSourceInput.setAttribute('name', 'source');
    if (referrer) {
      orgSourceInput.setAttribute('value', 'modal_doa_07122017_' + referrer);
    } else {
      orgSourceInput.setAttribute('value', 'modal_doa_07122017_coc');
    }
    org_source.appendChild(orgSourceInput);
    
    document.getElementById('form').appendChild(org_source);
  }

  function renderOrgRotation(org) {
    var fragment = document.createDocumentFragment();

    var orgInput = document.createElement('input');
    orgInput.setAttribute('type', 'hidden');
    orgInput.setAttribute('name', 'org');
    orgInput.setAttribute('value', org.code);
    fragment.appendChild(orgInput);

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'opt_in');
    checkbox.setAttribute('checked', 'checked');
    fragment.appendChild(checkbox);

    var orgLink = document.createElement('a');
    orgLink.setAttribute('href', org.url);
    orgLink.setAttribute('target', '_blank');
    orgLink.textContent = org.name;
    fragment.appendChild(orgLink);

    var disclaimer = document.createElement('span');
    disclaimer.textContent = ' will contact you about future campaigns.';
    fragment.appendChild(disclaimer);

    document.getElementById('rotation').appendChild(fragment);
    
    var donate = document.getElementById('donate');
    if (org.donate) donate.setAttribute('href', org.donate);
  }

  function sendMessage(requestType, data) {
    data || (data = {});
    data.requestType = requestType;
    data.BFTN_IFRAME_MSG = true;
    parent.postMessage(data, '*');
  }

  var animations = {
    main: {
      options: {
        debug: false,
      },
      init: function(options) {
        for (var k in options) this.options[k] = options[k];

        renderContent(getTheme(this.options.theme), this.options.bodyCopy);
        addRefferingSource(this.options.referrer);
        renderOrgRotation(getOrg(this.options.org));

        return this;
      },
      log: function() {
        if (this.options.debug) console.log.apply(console, arguments);
      }
    }
  }

  // Handle iframe messages
  window.addEventListener('message', function(e) {
    if (!e.data || !e.data.BFTN_WIDGET_MSG) return;

    delete e.data.BFTN_WIDGET_MSG;

    switch (e.data.requestType) {
      case 'putAnimation':
        animations[e.data.modalAnimation].init(e.data);
        break;
    }
  });

  // function onError(e) {
  //   // TODO: Error handling
  // }

  // function onSuccess(e) {
  //   if (transitionTimer) clearTimeout(transitionTimer);

  //   // TODO: Error handling
  //   // if (e && e.code >= 400) return onError(e);

  //   if (loading) {
  //     loading.addEventListener('transitionend', showAfterAction);
  //     loading.classList.add('invisible');
  //   }

  //   transitionTimer = setTimeout(showAfterAction, 500);
  // }

  // function showAfterAction(e) {
  //   if (transitionTimer) clearTimeout(transitionTimer);

  //   if (callPrompt) callPrompt.classList.remove('invisible');

  //   if (main) {
  //     main.classList.add('invisible');
  //     main.classList.add('hidden');
  //   }

  //   if (loading) loading.classList.add('hidden');
  // }

  // // Handle form submission
  // var form = document.getElementById('form');
  // form.addEventListener('submit', function submitForm(e) {
  //   e.preventDefault();

  //   // Prefill after-action call form
  //   var userPhone = document.getElementById('userPhone');
  //   var phone = document.getElementById('phone');
  //   if (userPhone && phone && phone.value) userPhone.value = phone.value;

  //   var zipcode = document.getElementById('zipcode');
  //   var postcode = document.getElementById('postcode');
  //   if (zipcode && postcode && postcode.value) zipcode.value = postcode.value;

  //   var footer = document.getElementById('footer');
  //   if (footer) {
  //     footer.classList.remove('hidden');
  //     footer.classList.remove('invisible');
  //   }

  //   if (callPrompt) callPrompt.classList.remove('hidden');
  //   if (main) main.classList.add('hidden');

  //   // TODO: Add config option to skip real submit?
  //   // loading.addEventListener('transitionend', onSuccess);
  //   // transitionTimer = setTimeout(onSuccess, 500);

  //   document.getElementById('source').value = document.referrer;

  //   var formData = new FormData(form);
  //   var xhr = new XMLHttpRequest();

  //   // TODO: Error handling
  //   xhr.addEventListener('error', onSuccess);
  //   xhr.addEventListener('load', onSuccess);

  //   xhr.open(form.getAttribute('method'), form.getAttribute('action'), true);
  //   xhr.send(formData);

  //   if (loading) {
  //     loading.classList.remove('hidden');
  //     loading.classList.remove('invisible');
  //   }
  // });

  // function showCallScript(e) {
  //   if (transitionTimer) clearTimeout(transitionTimer);

  //   if (callScript) {
  //     callScript.classList.remove('hidden');
  //     callScript.classList.remove('invisible');
  //   }

  //   if (callPrompt) {
  //     callPrompt.classList.add('invisible');
  //     callPrompt.classList.add('hidden');
  //   }

  //   if (loading) loading.classList.add('hidden');
  // }

  // function onCall(e) {
  //   if (transitionTimer) clearTimeout(transitionTimer);

  //   if (loading) {
  //     loading.addEventListener('transitionend', showCallScript);
  //     loading.classList.add('invisible');
  //   }

  //   transitionTimer = setTimeout(showCallScript, 500);
  // }

  // var call = document.getElementById('call');
  // call.addEventListener('submit', function submitCall(e) {
  //   e.preventDefault();

  //   var formData = new FormData(call);
  //   var xhr = new XMLHttpRequest();

  //   if (loading) {
  //     loading.addEventListener('transitionend', onCall);
  //     loading.classList.remove('hidden');
  //     loading.classList.remove('invisible');
  //   }

  //   transitionTimer = setTimeout(onCall, 500);

  //   if (callPrompt) callPrompt.classList.add('invisible');

  //   xhr.open(call.getAttribute('method'), call.getAttribute('action'), true);
  //   xhr.send(formData);
  // });

  // Add close button listener.
  document.getElementById('close').addEventListener('mousedown', function(e) {
    e.preventDefault();
    sendMessage('stop');
  });

  document.getElementById('background').addEventListener('mousedown', function(e) {
    // Ignore events that propagate up
    if (e.target == document.getElementById('background')) sendMessage('stop');
  });

  // Start animation
  sendMessage('getAnimation');
})();
