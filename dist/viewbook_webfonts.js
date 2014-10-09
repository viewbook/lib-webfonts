
// A little listing for the fonts to load, populated in the v2.sites, otherwise load all webfonts below (in manager)
var fontStylesToLoad = false || fontStylesToLoad;

// Populate this list for your fav webfonts from google
var fontData = [
	{
		font: 'Source+Sans+Pro:400,700,400italic,700italic:latin', 
		styleName: 'font_family_source-sans-pro', 
		family: "'Source Sans Pro', sans-serif"
	},
	{
		font: 'Lato:400,700,400italic,700italic:latin', 
		styleName: 'font_family_lato', 
		family: "'Lato', sans-serif"
	},
	{
		font: 'Arvo:400,700,400italic,700italic:latin', 
		styleName: 'font_family_arvo', 
		family: "'Arvo', serif'"
	},
	{
		font: 'PT+Serif:400,700,400italic,700italic:latin', 
		styleName: 'font_family_pt-serif', 
		family: "'PT Serif', serif"
	},
	{
		font: 'Roboto:700italic,300,700,300italic:latin', 
		styleName: 'font_family_roboto', 
		family: "'Roboto', sans-serif"
	},
	{
		font: 'Merriweather:300italic,300,700,700italic:latin', 
		styleName: 'font_family_merriwea', 
		family: "'Merriweather', serif"
	},
	{
		font: 'Open+Sans:300italic,600italic,300,600:latin', 
		styleName: 'font_family_open-sans', 
		family: "'Open Sans', sans-serif"
	},
	{
		font: 'Vollkorn:400italic,700italic,400,700:latin', 
		styleName: 'font_family_vollkorn', 
		family:  "'Vollkorn', serif"
	},
	{
		font: 'Gentium+Book+Basic:400,400italic,700,700italic:latin', 
		styleName: 'font_family_gentium-book-basic', 
		family: "'Gentium Book Basic', serif"
	},
	{
		font: 'Old+Standard+TT:400,400italic,700:latin', 
		styleName: 'font_family_old-standard-tt', 
		family: "'Old Standard TT', serif"
	}
];

// Generate the font families for google webfonts to use
var families = [];
if(fontStylesToLoad){

	// A crude check to see which webfonts to load based on the little list generated in the v2.sites
	// Dat kan best VEEL VEEL beter (met underscore etc)
	var fontStyle;
	for(var a = 0; a < fontData.length; ++a){
		fontStyleName = fontData[a].styleName;

		for(var b = 0; b < fontStylesToLoad.length; ++b){
			if(fontStylesToLoad[b].indexOf(fontStyleName) != '-1'){
				families.push(fontData[a].font);
				break;
			}
		}
	}
}else{
	for(var a = 0; a < fontData.length; ++a){
		families.push(fontData[a].font);
	}	
}

// If there are webfonts to load
if(families.length > 0){

	// Default google webfont embed code (Javascript version)
	WebFontConfig = {
	  google: { families:  families}
	};
	(function() {
	  var wf = document.createElement('script');
	  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	  wf.type = 'text/javascript';
	  wf.async = 'true';
	  var s = document.getElementsByTagName('script')[0];
	  s.parentNode.insertBefore(wf, s);
	})();

	// Generate V2 webfont styles and attach it to the page
	var fontStyles = [], fontTextStyles, cssText;
	var style = document.createElement('style');
	var head = document.head || document.getElementsByTagName('head')[0];
	var textTypes = [
		{prefix: '', selector: ''}, 
		{prefix: 'title_', selector: ' #vb_title'}, 
		{prefix: 'menu_', selector: ' #vb_menu'}
	];

	for(var a = 0; a < fontData.length; ++a){
		font = fontData[a];
		fontTextStyles = [];

		for(var b = 0; b < textTypes.length; ++b){
			fontTextStyles.push('.' + textTypes[b].prefix + font.styleName + textTypes[b].selector);
		}

		fontStyles.push(fontTextStyles.join(',') + '{font-family: "' + font.family + '";}');
	}

	cssText = fontStyles.join(' ');
	style.type = 'text/css';

	if (style.styleSheet){
	  style.styleSheet.cssText = cssText;
	} else {
	  style.appendChild(document.createTextNode(cssText));
	}

	head.appendChild(style);
}

