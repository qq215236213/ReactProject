import $ from 'jquery/dist/jquery';

(function (show) {
	(function ($, win) {
		var prefix = "tips-msg",
			defaults = {
				// 动画时间
				duration: 123,
				// 消息内容
				msg: "Hello World!!",
				// 消息类型:inverse/warning(默认)/error/success/info/muted
				type: "warning",
				// 消息位置，默认水平垂直居中
				position: {}
			};

		$.extend({
			msg: function () {
				var args = arguments,
					argL = args.length;

				// 1. $.msg("");
				if (argL === 1 && isStrOrNum(args[0])) {
					open({
						msg: args[0]
					});
				}
				// 2. $.msg("","");
				else if (argL === 2 && $.type(args[0]) === "string" && isStrOrNum(args[1])) {
					open({
						type: args[0],
						msg: args[1]
					});
				}
				// 3. $.msg({...});
				else if (argL === 1 && $.type(args[0]) === "object") {
					open(args[0]);
				}
			}
		});

		$.msg.defaults = defaults;


		/**
		 * 判断值是否为字符串或者数值
		 * @param  {String/Number} 字符串或数值
		 * @return {Boolean}
		 * @version 1.0
		 * 2013年9月23日15:23:04
		 */
		function isStrOrNum(val) {
			return $.type(val) === "string" || $.type(val) === "number";
		}

		/**
		 * 创建消息
		 * @param {Object} 参数
		 * @return {undefined}
		 * @version 1.0
		 * 2013年10月2日0:08:50
		 */
		function open(params) {
			if ($(".tips-msg").length > 0)
				return;
			var
				options = $.extend({}, defaults, params),
				id = prefix + new Date().getTime(),
				$msg = $('<div style="display:none" class="' + prefix + ' ' + prefix + "-" + options.type + '" id="' + id + '"><div class="' + prefix + '-body">' + options.msg + '</div></div>').appendTo("body"),
				winW = $(window).width(),
				winH = $(window).height(),
				theW = 0,
				theH = 0,
				theL = 0,
				theT = 0;

			$msg.data("timer", 0);
			$msg.data("options", options);
			init();
			function init() {
				if (options.position.left === undefined) {
					theW = $msg.width();
					theL = (winW - theW) / 2;
					if (theL < 0) theL = 0;
				} else {
					theL = options.position.left;
				}

				if (options.position.top === undefined) {
					theH = $msg.height();
					theT = (winH - theH) / 2;
					if (theT < 0) theT = 0;
				} else {
					theT = options.position.top;
				}

				$msg.css({
					left: theL,
					top: theT
				}).fadeIn(options.duration);

				close($msg);
			}

			// 鼠标悬停暂停停止计时
			$msg.hover(function () {
				close($msg, true);
			}, function () {
				close($msg);
			});
		}

		/**
		 * 关闭消息
		 * @param  {Object} 消息对象
		 * @param  {Boolean} 是否只是清除时间
		 * @return {undefined}
		 * @version 1.0
		 * 2013年10月23日15:07:33
		 */
		function close($msg, justClearTimer) {
			var timer = $msg.data("timer"),
				options = $msg.data("options");

			if (timer) {
				clearTimeout(timer);
				timer = 0;
			}

			if (!justClearTimer) {
				// 延迟1s关闭
				timer = setTimeout(function () {
					$msg.fadeOut(options.duration, function () {
						$(this).remove();
					});
				}, 1000);
				$msg.data("timer", timer);
			}
		}

		// ReSharper disable once ThisInGlobalContext
	})($, this);
})($);

export default $;