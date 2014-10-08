var fontData = [
	{
		font: 'Dosis:400,700:latin', 
		name: 'font_family_dosis', 
		family: 'Dosis'
	},
	{
		font: 'Lato:400,700,400italic,700italic:latin', 
		name:, 'font_family_lato', 
		family: 'Lato'
	},
	{
		font: 'Arvo:400,700,400italic,700italic:latin', 
		name: 'font_family_arvo', 
		family: 'Arvo'
	},
	{
		font: 'PT+Serif:400,700,400italic,700italic:latin', 
		name: 'font_family_pt-serif', 
		family: 'PT Serif'
	},
	{
		font: 'Roboto:400,700,400italic,700italic:latin', 
		name: 'font_family_roboto', 
		family: 'Roboto'
	},
	{
		font: 'Maven+Pro:400,700:latin', 
		name: 'font_family_maven-pro', 
		family: 'Maven Pro'
	},
	{
		font: 'Merriweather+Sans:400,700,700italic,400italic:latin', 
		name: 'font_family_merriwea{class: ther-sans', 
		family: 'Merriweather Sans'
	},
	{
		font: 'Open+Sans:400italic,700italic,400,700:latin', 
		name: 'font_family_open-sans', 
		family: 'Open Sans'
	},
	{
		font: 'Vollkorn:400italic,700italic,400,700:latin', 
		name: 'font_family_vollkorn', 
		family:  'Vollkorn'
	},
	{
		font: 'Gentium+Book+Basic:400,700,400italic,700italic:latin', 
		name: 'font_family_gentium-book-basic', 
		family: 'Gentium Book Basic'
	},
	{
		font: 'Old+Standard+TT:400,700,400italic:latin', 
		name: 'font_family_old-standard-tt', 
		family: 'Old Standard TT'
	}
];


// Generate the font families for google webfonts to use
var families = [];
for(var a = 0; a < fontData.length; ++a){
	families.push(fontData[a].font);
}


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


// Generate V2 webfont styles
var fontStyles = [], fontTextStyles, cssText;
var style = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
var textTypes = [
	{prefix: '', selector: ''}, 
	{prefix: 'title_', selector: ' #vb_title'}, 
	{prefix: 'menu_', selector: ' #vb_menu'}
];

for(var a = 0; a < fontClassNames.length; ++a){
	fontClassName = fontClasses[a];
	fontTextStyles = [];

	for(var b = 0; b < textTypes.length; ++b){
		fontTextStyles.push('.' + textTypes[b].prefix + fontClassName + textTypes[b].selector);
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