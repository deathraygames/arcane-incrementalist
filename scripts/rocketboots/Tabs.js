(function(){
	var component = {
		fileName: 		"Tabs",
		classNames:		["Tabs"],
		requirements:	[], 
		description:	"",
		credits:		"By Luke Nickerson, 2016"
	};

	var Tabs = component.Tabs = function WorldClass (options){
		var defaults = {
			containerSelector: 		'.tabs',
			contentSelector: 		'.tabs > div',
			navContainerSelector: 	'.nav > ol',
			navClickableSelector: 	'a',
			navSelector: 			null, 
			selectedClass: 			'selected',
			$nav: 					null,
			$content: 				null,
			showWithJQuery: 		false
		};
		$.extend(this, options, defaults);
	};

	/* EXAMPLE HTML:
		<section class="nav">
			<ol>
				<li><a href="#hopes" class="hopes">Hopes</a></li
				><li><a href="#dreams" class="dreams">Grimoires</a>
			</ol>
		</section>
		<section class="tabs">
			<div class="hopes">
				<!-- Tab content -->
			</div>
			<div class="dreams">
				<!-- Tab content -->
			</div>
		</section>
	*/

	/* EXAMPLE CSS:
		.nav > ol {
			display: block;
			padding: 0;
			margin: 0;
			width: 100%;
			text-align: center;
		}
		.nav > ol > li {
			padding: 0;
			margin: 0;
			display: inline-block;
			box-sizing: border-box;
			width: 25%;	
		}
		.nav > ol a {
			display: inline-block;
			width: 100%;
			padding: 1em 0;
		}
			.nav > ol a.selected {
				background-color: rgba(255,255,255,0.3);
				box-shadow: 0 0 0.5em rgba(0,0,0,0.2);
			}

		.tabs > div {
			display: none;
		}
			.tabs > div.selected {

				display: block;
			}
	*/

	Tabs.prototype.setup = function() {	
		var tabs = this;
		tabs.$content = $(tabs.contentSelector);
		tabs.navSelector = tabs.navContainerSelector + ' ' + tabs.navClickableSelector;
		tabs.$nav = $(tabs.navSelector);

		$(tabs.navContainerSelector).off("click").on("click", tabs.navClickableSelector, function(e){
			var $clicked = $(e.target);
			var goTo = $clicked.data("goto");
			if (typeof goTo === 'undefined') {
				var href = $clicked.attr("href");
				if (typeof href !== 'undefined') {
					goTo = href.split('#')[1];
				}
			}
			tabs.select(goTo, $clicked);
		});

		if (tabs.showWithJQuery) {
			tabs.$content.hide();
		}

		return tabs;
	};

	Tabs.prototype.select = function(goToClass, $selectedNav) {
		var tabs = this;
		var $selected = tabs.$content.filter('.' + goToClass);
		var $notSelected = tabs.$content.not($selected);
		if (typeof $selectedNav === 'undefined') {
			$selectedNav = tabs.$nav.filter('.'+ goToClass);
		}
		// Remove selected class from tab content and tab links
		$notSelected.add(tabs.$nav).not($selectedNav).removeClass(tabs.selectedClass);
		// Add selected class
		$selected.add($selectedNav).addClass(tabs.selectedClass);
		if (tabs.showWithJQuery) {
			$selected.show();
			$notSelected.hide();
		}
		return tabs;
	};


	// Install into RocketBoots if it exists
	if (typeof RocketBoots === "object") {
		RocketBoots.installComponent(component);
	} else { // Otherwise put the classes on the global window object
		for (var i = 0; i < component.classNames.length; i++) {
			window[component.classNames[i]] = component[component.classNames[i]];
		}
	}
})();