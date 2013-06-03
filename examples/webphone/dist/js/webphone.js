/*
@source: https://github.com/Quobis/QoffeeSIP
Copyright (C) Quobis
Licensed under GNU-LGPL-3.0-or-later (http://www.gnu.org/licenses/lgpl-3.0.html)
*/
// Generated by CoffeeScript 1.4.0
(function() {
  var UI, User, testBrowser,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  jQuery.fn.fullscreen = function(bool) {
    var cancelFullScreen;
    cancelFullScreen = document.webkitExitFullscreen || document.mozCancelFullScreen || document.exitFullscreen;
    this.each(function() {
      return this.enterFullscreen = this.webkitEnterFullScreen || this.mozRequestFullScreen || this.requestFullscreen;
    });
    if (bool) {
      return this.each(function() {
        return this.enterFullscreen();
      });
    } else {
      return cancelFullScreen();
    }
  };

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.configure("User", "user", "password", "sipServer", "userPriv", "turnServer", "turnCredential", "stunServer", "audioSession");

    User.extend(Spine.Model.Local);

    return User;

  })(Spine.Model);

  UI = (function(_super) {

    __extends(UI, _super);

    UI.prototype.events = {
      "submit form": "submitForm",
      "submit #form-register": "registerSubmit",
      "submit #form-call": "callSubmit",
      "click #answer": "answerClick",
      "click #answer": "answerClick",
      "click #cancel": "hangupClick",
      "click #hangup-established": "hangupClick",
      "click #hangup": "hangupClick",
      "click #fullscreen": "fullscreen",
      "click .toggleMuteAudio": "toggleMuteAudio",
      "click .toggleMuteVideo": "toggleMuteVideo",
      "click #expert": "toggleExpertMode",
      "dragenter .dropbox": "dragEnter",
      "dragleave .dropbox": "toggleActiveClass",
      "drop .dropbox": "onDrop"
    };

    UI.prototype.elements = {
      "#status": "$status",
      "#form-register": "$formRegister",
      "#form-call": "$formCall",
      "#form-calling": "$formCalling",
      "#form-incoming-call": "$formIncomingCall",
      "#form-established-call": "$formEstablishedCall",
      "#answer": "$answerButton",
      "#hangup": "$hangupButton",
      "#notifications": "$notifications",
      "video": "$videos",
      "#media-local": "$mediaLocal",
      "#media-remote": "$mediaRemote",
      "#register": "$registerButton",
      "#call": "$callButton",
      "#chat": "$chat",
      ".messages": "$messages",
      ".dropbox": "$dropbox",
      "#timer": "$timer",
      ".slide": "$slides",
      ".media": "$media",
      "#sound-ringing": "$soundRinging",
      "#sound-calling": "$soundCalling",
      "#expert": "$expert",
      "#expert-options": "$expertOptions"
    };

    UI.prototype.dragEnter = function(e) {
      e.dataTransfer.effectAllowed = "copy";
      this.toggleActiveClass();
      return false;
    };

    UI.prototype.toggleActiveClass = function(e) {
      e.stopPropagation();
      $(e.target).toggleClass("active");
      return false;
    };

    UI.prototype.onDrop = function(e) {
      var file, message, url, _i, _len, _ref;
      e.stopPropagation();
      e.preventDefault();
      console.log(e);
      _ref = e.originalEvent.dataTransfer.files;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        url = URL.createObjectURL(file);
        message = {
          from: this.register.ext,
          to: this.ext2,
          content: $("#chat > .messages").append("<img src=" + url + ">")
        };
        this.renderInstantMessage(message);
      }
      this.toggleActiveClass(e);
      return false;
    };

    UI.prototype.templates = {
      message: function(message, type) {
        console.log(message);
        return "<p class=\"chat-message\">\n	<span class=\"label " + type + "\">" + message.from + " says</span> " + message.content + "\n</p>";
      }
    };

    function UI() {
      this.cbEndCall = __bind(this.cbEndCall, this);

      this.cbRinging = __bind(this.cbRinging, this);

      this.cbCalling = __bind(this.cbCalling, this);

      this.cbRegisterSuccess = __bind(this.cbRegisterSuccess, this);

      this.cbEstablished = __bind(this.cbEstablished, this);

      this.updateStatus = __bind(this.updateStatus, this);

      this.stopTimer = __bind(this.stopTimer, this);

      this.startTimer = __bind(this.startTimer, this);

      this.nextForm = __bind(this.nextForm, this);

      this.stopSounds = __bind(this.stopSounds, this);

      this.hangupClick = __bind(this.hangupClick, this);

      this.answerClick = __bind(this.answerClick, this);

      this.establishedCallSubmit = __bind(this.establishedCallSubmit, this);

      this.callSubmit = __bind(this.callSubmit, this);

      this.registerSubmit = __bind(this.registerSubmit, this);

      this.toggleExpertMode = __bind(this.toggleExpertMode, this);

      this.submitForm = __bind(this.submitForm, this);

      this.toggleMuteVideo = __bind(this.toggleMuteVideo, this);

      this.toggleMuteAudio = __bind(this.toggleMuteAudio, this);

      this.fullscreen = __bind(this.fullscreen, this);

      this.warningManager = __bind(this.warningManager, this);

      this.warningManager = __bind(this.warningManager, this);

      this.infoManager = __bind(this.infoManager, this);

      this.renderInstantMessage = __bind(this.renderInstantMessage, this);

      this.onDrop = __bind(this.onDrop, this);

      this.dragEnter = __bind(this.dragEnter, this);

      var user;
      UI.__super__.constructor.apply(this, arguments);
      this.register = {};
      User.fetch();
      user = User.last();
      if (user) {
        $("#user-reg").val(user.user);
        $("#pass-reg").val(user.password);
        $("#server-reg").val(user.sipServer);
        $("#user-reg-priv").val(user.userPriv);
        if (user.audioSession) {
          $("#only-audio").attr("checked", true);
        }
        $("#stun-server").val(user.stunServer);
        $("#turn-server").val(user.turnServer);
        $("#turn-server-credential").val(user.turnCredential);
      }
    }

    UI.prototype.linkify = function(inputText) {
      var replacePattern1, replacePattern2, replacePattern3, replacedText;
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
      replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
      return replacedText;
    };

    UI.prototype.emoticonify = function(inputText) {
      var key, pattern, replacedText, substitutions;
      substitutions = {
        angry: /X\-?\(/gim,
        blink: /;-?\)/gim,
        blush: /:-?\$/gim,
        cheerful: /(:-?D)|(\^\^)/gim,
        confused: /:-?S/gim,
        cry: /;-?\(/gim,
        happy: /:-?\)/gim,
        laugh: /X-?D/gim,
        sad: /:-?\(/gim,
        serious: /:-?\|/gim,
        sunglasses: /B-?\)/gim,
        surprised: /:-?O/gim,
        tongue: /:-?P/gim
      };
      replacedText = inputText;
      for (key in substitutions) {
        pattern = substitutions[key];
        replacedText = replacedText.replace(pattern, "<img class='emoticon' src='img/emoticons/" + key + ".svg'/>");
      }
      console.log(replacedText);
      return replacedText;
    };

    UI.prototype.renderInstantMessage = function(message) {
      var contact, type;
      message.content = this.linkify(message.content);
      message.content = this.emoticonify(message.content);
      if (message.from === this.register.ext) {
        contact = message.to;
        type = "label-success";
      } else {
        contact = message.from;
        type = "label-info";
      }
      return this.$messages.append(this.templates.message(message, type)).animate({
        scrollTop: this.$messages[0].scrollHeight
      }, 0);
    };

    UI.prototype.notify = function(msg, type) {
      var args;
      if (type == null) {
        type = "success";
      }
      if (typeof msg !== "string") {
        return;
      }
      args = {
        message: {
          text: msg
        },
        type: type
      };
      return this.$notifications.notify(args).show();
    };

    UI.prototype.infoManager = function(info, data) {
      return this.notify(info);
    };

    UI.prototype.warningManager = function(warn, message) {
      return this.notify(warn, "warning");
    };

    UI.prototype.warningManager = function(error, message) {
      return this.notify(error, "danger");
    };

    UI.prototype.fullscreen = function() {
      return $("#media-remote").fullscreen(true);
    };

    UI.prototype.toggleMuteAudio = function() {
      console.log("[MEDIA] toggleMuteAudio");
      return this.qs.toggleMuteAudio();
    };

    UI.prototype.toggleMuteVideo = function() {
      console.log("[MEDIA] toggleMuteVideo");
      return this.qs.toggleMuteVideo();
    };

    UI.prototype.submitForm = function(e) {
      e.preventDefault();
      return false;
    };

    UI.prototype.toggleExpertMode = function() {
      var tmp;
      tmp = this.$expert.text();
      this.$expert.text(this.$expert.data("toggle-text"));
      this.$expert.data("toggle-text", tmp);
      return this.$expertOptions.toggleClass("hidden");
    };

    UI.prototype.registerSubmit = function(e) {
      var line, onlyAudio, onopen, server, serverRE, sipServer, stunServer, turnServer, _ref,
        _this = this;
      User.create({
        user: $("#user-reg").val(),
        password: $("#pass-reg").val(),
        sipServer: $("#server-reg").val(),
        userPriv: $("#user-reg-priv").val(),
        audioSession: $("#only-audio").is(":checked"),
        stunServer: $("#stun-server").val(),
        turnServer: $("#stun-server").val(),
        turnCredential: $("#turn-server-credential").val()
      });
      _ref = $("#user-reg").val().split("@"), this.register.ext = _ref[0], this.register.domain = _ref[1];
      this.register.pass = $("#pass-reg").val() || this.register.ext;
      server = $("#server-reg").val();
      this.register.userPriv = $("#user-reg-priv").val();
      onlyAudio = $("#only-audio").is(":checked");
      stunServer = {
        url: "stun:" + $("#stun-server").val()
      };
      turnServer = {
        url: "turn:" + $("#turn-server").val(),
        credential: $("#turn-server-credential").val()
      };
      if (stunServer.url === "stun:") {
        stunServer = {
          "url": "stun:74.125.132.127:19302"
        };
      }
      serverRE = /(wss?):\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\:(\d{2,5}))?((\/\w+)*)/;
      line = serverRE.exec(server);
      sipServer = {};
      if (line != null) {
        sipServer.transport = line[1];
        sipServer.ip = line[2];
        sipServer.port = line[4];
        sipServer.path = line[5] || "";
      } else {
        sipServer.ip = "212.145.159.109";
        sipServer.port = "80";
        sipServer.path = "";
        sipServer.transport = "ws";
      }
      onopen = function() {
        _this.qs.on("qs-ringing", _this.cbRinging);
        _this.qs.on("qs-calling", _this.cbCalling);
        _this.qs.on("qs-end-call", _this.cbEndCall);
        _this.qs.on("qs-lost-call", _this.cbEndCall);
        _this.qs.on("qs-established", _this.cbEstablished);
        _this.qs.on("qs-instant-message", _this.renderInstantMessage);
        _this.qs.on("qs-presence-update", _this.presenceUpdate);
        _this.qs.on("qs-mediastate-update", _this.mediastateUpdate);
        _this.qs.on("qs-register-success", _this.cbRegisterSuccess);
        _this.qs.register(_this.register.ext, _this.register.pass, _this.register.domain, _this.register.userPriv);
        _this.$registerButton.addClass("disabled");
        return _this.$registerButton.addClass("disabled");
      };
      this.qs = new QS({
        server: sipServer,
        turnServer: turnServer,
        stunServer: stunServer,
        mediaElements: this.mediaElements,
        onopen: onopen,
        mediaConstraints: {
          audio: true,
          video: !onlyAudio
        }
      });
      return this.qs.on("qs-localstream", function() {
        return _this.$mediaLocal.removeClass("hidden");
      });
    };

    UI.prototype.callSubmit = function(e) {
      var _ref;
      _ref = $("#ext-call").val().split("@"), this.ext2 = _ref[0], this.domain2 = _ref[1];
      this.qs.call(this.ext2, this.domain2);
      this.$callButton.addClass("disabled");
      return false;
    };

    UI.prototype.establishedCallSubmit = function(e) {
      this.hangupClick(e);
      return false;
    };

    UI.prototype.answerClick = function(e) {
      e.preventDefault();
      this.$answerButton.addClass("disabled");
      this.$hangupButton.addClass("disabled");
      this.stopSounds();
      this.answer();
      return false;
    };

    UI.prototype.hangupClick = function(e) {
      e.preventDefault();
      this.$answerButton.addClass("disabled");
      this.$hangupButton.addClass("disabled");
      this.hangup();
      return false;
    };

    UI.prototype.stopSounds = function() {
      var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if ((_ref = this.$soundRinging) != null) {
        if ((_ref1 = _ref.get(0)) != null) {
          _ref1.pause();
        }
      }
      if ((_ref2 = this.$soundCalling) != null) {
        if ((_ref3 = _ref2.get(0)) != null) {
          _ref3.pause();
        }
      }
      if ((_ref4 = this.$soundRinging) != null) {
        if ((_ref5 = _ref4.get(0)) != null) {
          _ref5.currentTime = 0;
        }
      }
      return (_ref6 = this.$soundCalling) != null ? (_ref7 = _ref6.get(0)) != null ? _ref7.currentTime = 0 : void 0 : void 0;
    };

    UI.prototype.nextForm = function($el) {
      $(".disabled").removeClass("disabled");
      this.$slides.addClass("hidden");
      $el.removeClass("hidden");
      return $el.children(" > input:first").focus();
    };

    UI.prototype.startTimer = function() {
      var hours, minutes, s, seconds, time,
        _this = this;
      s = seconds = minutes = hours = 0;
      time = function() {
        s += 1;
        seconds = s % 60;
        minutes = parseInt(s / 60) % 60;
        hours = parseInt(s / 3600) % 24;
        seconds += "";
        minutes += "";
        hours += "";
        if (seconds.length === 1) {
          seconds = "0" + seconds;
        }
        if (minutes.length === 1) {
          minutes = "0" + minutes;
        }
        if (hours.length === 1) {
          hours = "0" + hours;
        }
        return _this.$timer.text("" + hours + ":" + minutes + ":" + seconds);
      };
      return this.timer = setInterval(time, 1000);
    };

    UI.prototype.stopTimer = function() {
      if (this.timer != null) {
        return clearInterval(this.timer);
      }
    };

    UI.prototype.updateStatus = function(msg) {
      return this.$status.text(msg);
    };

    UI.prototype.cbEstablished = function(message) {
      var callback,
        _this = this;
      this.updateStatus("Call established with " + this.ext2);
      $("#remote-legend").text("Remote extension is " + this.ext2);
      this.stopSounds();
      this.startTimer();
      this.nextForm(this.$formEstablishedCall);
      if (window.autoanswering) {
        setTimeout((function() {
          return $("#hangup-established").click();
        }), 15000);
      }
      this.$chat.show();
      this.$chat.find("form").submit(function() {
        message = {
          from: _this.register.ext,
          to: _this.ext2,
          content: _this.$chat.find("input:first").val()
        };
        _this.$chat.find("input:first").val("");
        _this.qs.chat(_this.ext2, message.content);
        return _this.renderInstantMessage(message);
      });
      this.previousState = this.state;
      callback = function() {
        var h;
        _this.$mediaRemote.removeClass("hidden");
        _this.$videos.addClass("active");
        h = _this.$mediaLocal.height();
        return _this.$mediaLocal.css({
          marginTop: "-" + h + "px"
        });
      };
      return _.delay(callback, 200);
    };

    UI.prototype.cbRegisterSuccess = function() {
      var callback,
        _this = this;
      if (this.previousState > 3) {
        this.stopSounds();
      }
      callback = function() {
        _this.stopTimer();
        _this.$videos.removeClass("active");
        _this.$mediaRemote.addClass("hidden");
        return _this.$mediaLocal.css({
          marginTop: "0px"
        });
      };
      callback();
      $(window).bind("beforeunload", function() {
        return _this.qs.unregister();
      });
      this.$messages.children().remove();
      this.$chat.hide();
      this.updateStatus("Registered");
      this.nextForm(this.$formCall);
      $("#register-info").html("<p>Your extension number is <strong>" + this.register.ext + "</strong>, share this URL to a friend and tell him to call you. If you want to connect to our demo webcam, just dial extension 1234.</p>").fadeIn(200);
      $("#local-legend").text("Local extension is " + this.register.ext);
      return this.previousState = this.state;
    };

    UI.prototype.cbCalling = function(message) {
      var _this = this;
      this.updateStatus("Calling " + this.ext2);
      document.getElementById("sound-calling").play();
      this.hangup = function() {
        return _this.qs.hangup(message.branch);
      };
      return this.previousState = this.state;
    };

    UI.prototype.cbRinging = function(message) {
      var _this = this;
      this.ext2 = message.ext;
      this.updateStatus("Incoming call from " + this.ext2);
      this.answer = function() {
        return _this.qs.answer(message.branch);
      };
      this.hangup = function() {
        return _this.qs.hangup(message.branch);
      };
      this.nextForm(this.$formIncomingCall);
      document.getElementById("sound-ringing").play();
      if (window.autoanswering) {
        setTimeout((function() {
          return $("#answer").click();
        }), 1000);
      }
      return this.previousState = this.state;
    };

    UI.prototype.cbEndCall = function(message) {
      var callback,
        _this = this;
      this.updateStatus("Hanging up");
      this.stopTimer();
      if (this.previousState > 3) {
        this.stopSounds();
      }
      callback = function() {
        _this.stopTimer();
        _this.$videos.removeClass("active");
        _this.$mediaRemote.addClass("hidden");
        return _this.$mediaLocal.css({
          marginTop: "0px"
        });
      };
      callback();
      $(window).bind("beforeunload", function() {
        return _this.qs.unregister();
      });
      this.$messages.children().remove();
      this.$chat.hide();
      this.updateStatus("Registered");
      this.nextForm(this.$formCall);
      return this.previousState = this.state;
    };

    return UI;

  })(Spine.Controller);

  window.UI = UI;

  testBrowser = function() {
    var args, majorVersion, msg, supported;
    $.browser.safari = $.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase()));
    majorVersion = parseInt($.browser.version, 10);
    if ($.browser.chrome && majorVersion >= 23) {
      msg = "Browser: Google Chrome (" + $.browser.version + ")";
      supported = true;
    } else if ($.browser.mozilla && majorVersion >= 19) {
      msg = "Browser: Firefox (" + $.browser.version + ")";
      supported = true;
    } else if ($.browser.chrome) {
      msg = "Browser not supported for now!: Google Chrome ( " + $.browser.version + ")";
    } else if ($.browser.safari) {
      msg = "Browser not supported for now!: Safari (" + $.browser.version + ")";
    } else if ($.browser.msie) {
      msg = "Browser not supported for now!: Internet Explorer (" + $.browser.version + ")";
    } else if ($.browser.mozilla) {
      msg = "Browser not supported for now!: Mozilla Firefox (" + $.browser.version + ")";
    } else if ($.browser.opera) {
      msg = "Browser not supported for now!: Opera (" + $.browser.version + ")";
    } else {
      msg = "Browser not supported: (" + $.browser.version + ")";
    }
    args = {
      message: {
        text: msg
      }
    };
    if ((supported != null) && !supported) {
      _.extend(args, {
        type: "danger"
      }, {
        fadeOut: {
          enabled: false
        }
      });
    }
    return $('#notifications').notify(args).show();
  };

  window.testBrowser = testBrowser;

  $(function() {
    var conf, ext;
    console.log("Ready!");
    if (window.testBrowser) {
      window.testBrowser();
    }
    conf = {
      mediaElements: {
        localMedia: $("#media-local"),
        remoteMedia: $("#media-remote")
      },
      el: "body"
    };
    new UI(conf);
    window.autoanswering = false;
    if (window.autoanswering) {
      ext = 1234;
      $("#user-reg").val(ext);
      $("#pass-reg").val(ext);
      return $("#register").click();
    }
  });

}).call(this);