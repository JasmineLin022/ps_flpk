(function($){

	var ModuleName = 'ps_flpk';

	var Module = function(ele,options){
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
	}

	Module.DEFAULTS = {
		speed : 1000,
		whenitcallback:function(w){
			console.log(w);
		}
	}

	Module.prototype.assignPercent = function(z,options){
		console.log('assignPercent');
		$('.result').width(z+'%');
		// options(z);
	};

	Module.prototype.nextProgress = function(options){
		console.log('nextProgress');
		
		var result = parseInt(($('.result').width())*100/($('.ps_flpk').width()));
		result = (100-result)*0.2+result;
		options(result);
		$('.result').width(result+'%');
	};

	Module.prototype.doneProgress = function(whenitcallback){
		console.log('doneProgress');
		var width = 100;
		$('.result').width(width+'%');
		whenitcallback(width);
		

	};

	Module.prototype.zeroProgress = function(options){
		console.log('zeroProgress');
		var width =0;
		$('.result').width(0);
		// options(width);
	};


	// function options(e){
	// 	console.log(e);
	// }

	$.fn[ModuleName] = function(methods,options,options2){
		return this.each(function(i,e){
			var $this = $(this);
			var module = $this.data(ModuleName);
			var opts = null;
			if(!!module){
				if(typeof methods === 'string' && typeof options === 'number' && typeof options2 === 'function'){
					module[methods](options,options2);
				}else if(typeof methods === 'string' && typeof options === 'undefined' && typeof options2 === 'undefined' ){
					module[methods](options2);
				}else if(typeof methods === 'string' && typeof options === 'undefined' && typeof options2 === 'function'){
					module[methods](options2);
				}else if(typeof methods === 'string' && typeof options === 'function' && typeof options2 === 'undefined'){
					module[methods](options);
				}else{
					console.log('unsupported options !');
					throw 'unsupported options!';
				}
			}else{
				opts = $.extend({},Module.DEFAULTS,(typeof methods === 'object' && methods),(typeof options === 'object' && options));
				module = new Module(this,opts);
				$this.data(ModuleName,module);
			}
		});
	}

})(jQuery);