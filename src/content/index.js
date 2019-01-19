'use strict';
console.log('content index script loaded ...');

// sentry. only do if we think this is a jenkins site.
if ($('body#jenkins').length) {
  // handle the page generated timestamp in the footer
  $('.page_generated').text((_index, text) => {
    var [label, utcTimeString] = text.split(': ');
    utcTimeString =
      new Date(utcTimeString)
        .toLocaleString(undefined,
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
          });

    return [label, utcTimeString].join(': ')
  });

  /*
    handle the build history.
    look for a div with a time attribute. The value of the attribute is an epoch time. replace the text of the anchor
    tag with the converted time.
  */
  $('[time]').each((_index, element) => {
    const time = Number($(element).attr('time'));

    $(element).find('a').text((_index, text) => {
      return new Date(time).toLocaleString(undefined,
        {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'});
    });
  });

  // handle the page title on a specific build
  $('.build-caption').html(function (_index, text) {
    const re = /([\s\S]*\()(.*)(\)[\s\S]*)/;
    var [, open, dateString, close] = text.match(re);
    dateString = new Date(`${dateString} UTC`).toLocaleString(undefined,
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      });

    return [open, dateString, close].join('');
  });
}

// todo. modify content before rendering? looks like there's a visible redraw