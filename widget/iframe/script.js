(function() {
  function getOrganiztion(org) {
    switch(org) {
      case 'dp':
        return {
          code: 'dp',
          name: 'Demand Progress',
          url: 'https://demandprogress.org/'
        };
      case 'fp':
        return {
          code: 'fp',
          name: 'Free Press',
          url: 'https://www.freepress.net/'
        };
      case 'fftf':
      default:
        return {
          code: 'fftf',
          name: 'Fight for the Future',
          url: 'https://www.fightforthefuture.org/'
        };
    }
  }

  function setVariation(variation) {
    document.body.className += (' ' + (variation || 'without'));

    switch(variation) {
      case 'money':
        return {
          logos: ['images/money.png'],
          headline: 'Please upgrade your<br/>plan to proceed.',
          body: 'Just kidding. You can still get to this site *for now*. But if the FCC ends net neutrality, your cable company could charge you extra fees just to use the websites and apps you want. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
      case 'stop':
        return {
          logos: ['images/stop.png'],
          headline: 'This site has been<br/>blocked by your ISP.',
          body: 'Well, not yet. But without net neutrality, cable companies could censor websites, favoring their own business partners. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
      case 'slow':
        return {
          logos: ['images/slow.png'],
          headline: 'Sorry, we\'re stuck<br/>in the slow lane.',
          body: 'Well, not yet. Cable companies want to get rid of net neutrality, so they can slow sites like ours to a crawl and shake us down for extra fees just to reach you. If they get their way, the Internet will never be the same. We can stop them and keep the web fast, open, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
      case 'without':
      default:
        return {
          logos: ['images/slow.png', 'images/stop.png', 'images/money.png'],
          headline: 'This is the web<br/>without net neutrality.',
          body: 'Cable companies want to get rid of net neutrality. Without it, sites like ours could be censored, slowed down, or forced to charge extra fees. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
    }
  }

  function sendMessage(requestType, data) {
      data || (data = {});
      data.requestType = requestType;
      data.RTN_IFRAME_MSG = true;
      parent.postMessage(data, '*');
  }

  var animations = {
      main: {
          options: {
              debug: false,
          },
          init: function(options) {
              for (var k in options) this.options[k] = options[k];
              this.log('RTN ANIMATION STARTING');
              return this;
          },
          log: function() {
              if (this.options.debug) console.log.apply(console, arguments);
          }
      }
  }

  // Handle iframe messages
  window.addEventListener('message', function(e) {
    if (!e.data || !e.data.RTN_WIDGET_MSG) return;

    delete e.data.RTN_WIDGET_MSG;

    switch (e.data.requestType) {
      case 'putAnimation':
        animations[e.data.modalAnimation].init(e.data);
        break;
    }
  });

  // Add close button listener.
  document.getElementById('close').addEventListener('mousedown', function(e) {
      e.preventDefault();
      sendMessage('stop');
  });

  // Set content variation
  var content = setVariation(undefined);

  // Render logos
  var fragment = document.createDocumentFragment();
  var img;
  for (var i = 0; i < content.logos.length; i++) {
    img = document.createElement('img');
    img.setAttribute('src', content.logos[i]);
    img.className = 'slow';
    fragment.appendChild(img);
  }
  document.getElementById('logos').appendChild(fragment);

  // Render headline and body copy
  document.getElementById('headline').innerHTML = content.headline;
  document.getElementById('content').innerText = content.body;

  // Start animation
  sendMessage('getAnimation');
})();
