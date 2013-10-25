/*
 * jquery-countdown plugin
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Forked by Lito in Github
 * https://github.com/eusonlito/jquery-countdown
 */

var end = new Date('10/11/2014 00:00:01 AM');
	function getTheDate(){
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;

        var now = new Date();
        var distance = end - now;
            
            var days = Math.floor(distance / _day);
                if (days < 10) {
            	days = "0" + days;
            }
            var hours = Math.floor((distance % _day) / _hour);
            if (hours < 10) {
            	hours = "0" + hours;
            }
            var minutes = Math.floor((distance % _hour) / _minute);
                        if (minutes < 10) {
            	minutes = "0" + minutes;
            }
            var seconds = Math.floor((distance % _minute) / _second);
                                    if (seconds < 10) {
            	seconds = "0" + seconds;
            }

            var total = days + ":";
            total += hours + ":";
            total += minutes + ":";
            total += seconds;
            return total;
       }


jQuery.fn.countdown = function(userOptions)

{
  // Default options
  var options = {
    stepTime: 60,
    // startTime and format MUST follow the same format.
    // also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
    format: "ddd:hh:mm:sx",
    startTime: getTheDate(),
    digitImages: 6,
    digitWidth: 67,
    digitHeight: 90,
    timerEnd: function(){},
    image: "digits.png",
    continuous: false
  };
  var digits = [], intervals = [];

  // Draw digits in given container
  var createDigits = function(where)
  {
    var c = 0;
    // Iterate each startTime digit, if it is not a digit
    // we'll asume that it's a separator
    for (var i = 0; i < options.startTime.length; i++)
    {
      if (parseInt(options.startTime[i]) >= 0)
      {
        elem = $('<div id="cnt_' + c + '" class="cntDigit" />').css({
          height: options.digitHeight,
          float: 'left',
          background: 'url(\'' + options.image + '\')',
          width: options.digitWidth
        });

        elem.current = parseInt(options.startTime[i]);
        digits.push(elem);

        margin(c, -elem.current * options.digitHeight * options.digitImages);

        if (options.continuous === true)
        {
          digits[c]._max = function(){ return 9; };
        }
        else
        {
          // Add max digits, for example, first digit of minutes (mm) has
          // a max of 5. Conditional max is used when the left digit has reach
          // the max. For example second "hours" digit has a conditional max of 4
          switch (options.format[i]) 
          {
            case 'h':
              digits[c]._max = function(pos, isStart) {
                if (pos % 2 == 0)
                  return 2;
                else
                  return (isStart) ? 3: 9;
              };
              break;
            case 'd':
              digits[c]._max = function(){ return 9; };
              break;
            case 'm':
            case 's':
              digits[c]._max = function(){ return 5; };
              break;
            case 'x':
            digits[c]._max = function(){ return 9; };
              break;
          }
        }

        ++c;
      }
      else
      {
        elem = $('<div class="cntSeparator"/>').css({float: 'left'})
                                               .text(options.startTime[i]);
      }

      where.append(elem);
    }
  };

  // Set or get element margin
  var margin = function(elem, val)
  {
    if (val !== undefined)
    {
      digits[elem].margin = val;
      return digits[elem].css({'backgroundPosition': '0 ' + val + 'px'});
    }

    return digits[elem].margin || 0;
  };

  var makeMovement = function(elem, steps, isForward)
  {
    // Stop any other movement over the same digit.
    if (intervals[elem])
      window.clearInterval(intervals[elem]);

    // Move to the initial position (We force that because in chrome
    // there are some scenarios where digits lost sync)
    var initialPos = -(options.digitHeight * options.digitImages *
                       digits[elem].current);
    margin(elem, initialPos);
    digits[elem].current = digits[elem].current + ((isForward) ? steps: -steps);

    var x = 0;
    intervals[elem] = setInterval(function(){
      if (x++ === options.digitImages * steps)
      {
        window.clearInterval(intervals[elem]);
        delete intervals[elem];
        return;
      }

      var diff = isForward ? -options.digitHeight: options.digitHeight;
      margin(elem, initialPos + (x * diff));
    }, options.stepTime / steps);
  };

  // Makes the movement. This is done by "digitImages" steps.
  var moveDigit = function(elem)
  {
    if (digits[elem].current == 0)
    {
      // Is there still time left?
      if (elem > 0)
      {
        var isStart = (digits[elem - 1].current == 0);

        makeMovement(elem, digits[elem]._max(elem, isStart), true);
        moveDigit(elem - 1);
      }
      else // That condition means that we reach the end! 00:00.
      {
        for (var i = 0; i < digits.length; i++)
        {
          clearInterval(intervals[i]);
          clearInterval(intervals.main);
          margin(i, 0);
        }
        options.timerEnd();
      }

      return;
    }

    makeMovement(elem, 1);
  };
  $.extend(options, userOptions);
  createDigits(this);
  intervals.main = setInterval(function(){ moveDigit(digits.length - 1); },
                               1000);
                               
};
