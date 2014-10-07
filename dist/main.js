var families = ['Dosis:400,700:latin', 
	'Lato:400,700,400italic,700italic:latin', 
	'Arvo:400,700,400italic,700italic:latin', 
	'PT+Serif:400,700,400italic,700italic:latin', 
	'Roboto:400,700,400italic,700italic:latin', 
	'Maven+Pro:400,700:latin', 
	'Merriweather+Sans:400,700,700italic,400italic:latin', 
	'Open+Sans:400italic,700italic,400,700:latin', 
	'Vollkorn:400italic,700italic,400,700:latin', 
	'Gentium+Book+Basic:400,700,400italic,700italic:latin', 
	'Old+Standard+TT:400,700,400italic:latin'
];

var fonts = parseFamilies(families);
var font, split, id, name, classID;
var textTypes = [{prefix: '', selector: ''}, {prefix: 'title_', selector: ' #vb_title'}, {prefix: 'menu_', selector: ' #vb_menu'}];
var fontStyles = [];
var head = document.head || document.getElementsByTagName('head')[0];
var cssText;
var style = document.createElement('style');

window.webfonts = fonts;

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


// generate V2 page style for the corresponding webfonts
for(var a = 0; a < fonts.length; ++a){
	font = fonts[a];
	for(var b = 0; b < textTypes.length; ++b){
		fontStyles.push('.' + textTypes[b].prefix + 'font_family_' + font.styleID + textTypes[b].selector + '{font-family: "' + font.name + '";}');
	}	  	
}

cssText = fontStyles.join(' ');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = cssText;
} else {
  style.appendChild(document.createTextNode(cssText));
}

head.appendChild(style);

function parseFamilies(families){
	var font, fonts = [], split, name, id;

	for(var a = 0; a < families.length; ++a){
		font = families[a];
		split = font.split(':');
		id = split[0];
		name = id.replace(/\+/g, ' ');
		styleID = id.toLowerCase().replace(/\+/g, '-');

		fonts.push({
			id: id,
			name: name,
			styleID: styleID,
			font: font
		});
	}

	return fonts;
}