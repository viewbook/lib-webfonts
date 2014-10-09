(function (root) {
  function select_web_font (webfonts, set) {

    var set = set.map(function (s) {
      return s.substr(s.indexOf('font_family'));
    });

    var style_names = webfonts.map(function (f) {
      return f.styleName;
    });

    return set.filter(function (s) {
      return style_names.indexOf(s) !== -1;
    });
  }


  function font_style_to_spec (webfonts, selection) {
    return webfonts.reduce(function (acc, f) {
      if(selection.indexOf(f.styleName) != '-1')
        acc.push(f.font);
      return acc;
    }, []);
  }

  root.VBFont = {
    getFontSpec: function (data) {
      return data.map(function(d) {
        return d.font;
      });
    },

    getFontSelectionSpec: function (webfonts, selection) {
      return font_style_to_spec(webfonts, select_web_font(webfonts, selection || []));
    },

    loadFontFamilies: function (families)  {
      // Default google webfont embed code (Javascript version)
      window.WebFontConfig = {
        google: { families:  families}
      };

      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    },

    // Generate V2 webfont styles and attach it to the page
    appendFontStyles: function (webfonts) {
      var cssText, textTypes, style = document.createElement('style'),
          head = document.head || document.getElementsByTagName('head')[0];

      textTypes = [
        {prefix: '', selector: ''},
        {prefix: 'title_', selector: ' #vb_title'},
        {prefix: 'menu_', selector: ' #vb_menu'}
      ];

      style.type = 'text/css';

      cssText = webfonts.map(function (wf) {
        return textTypes.map(function (tType) {
          return '.' + tType.prefix + wf.styleName + tType.selector;
        }).join(",\n") + " {" + wf.styles + "}";
      }).join("\n");

      if (style.styleSheet){
        style.styleSheet.cssText = cssText;
      } else {
        style.appendChild(document.createTextNode(cssText));
      }

      head.appendChild(style);

    }
  };
})(this);

var webFontData = [
	{
		font: 'Source+Sans+Pro:400,700,400italic,700italic:latin', 
		styleName: 'font_family_source-sans-pro', 
		styles: "font-family: 'Source Sans Pro', sans-serif;",
		name: 'Source Sans Pro'
	},
	{
		font: 'Lato:400,700,400italic,700italic:latin', 
		styleName: 'font_family_lato', 
		styles: "font-family: 'Lato', sans-serif;",
		name: 'Lato'
	},
	{
		font: 'Arvo:400,700,400italic,700italic:latin', 
		styleName: 'font_family_arvo', 
		styles: "font-family: 'Arvo', serif;",
		name: 'Arvo'
	},
	{
		font: 'PT+Serif:400,700,400italic,700italic:latin', 
		styleName: 'font_family_pt-serif', 
		styles: "font-family: 'PT Serif', serif;",
		name: 'PT Serif'
	},
	{
		font: 'Roboto:700italic,300,700,300italic:latin', 
		styleName: 'font_family_roboto', 
		styles: "font-family: 'Roboto', sans-serif;",
		name: 'Roboto'
	},
	{
		font: 'Merriweather:300italic,300,700,700italic:latin', 
		styleName: 'font_family_merriwea', 
		styles: "font-family: 'Merriweather', serif;",
		name: 'Merriweather'
	},
	{
		font: 'Open+Sans:300italic,600italic,300,600:latin', 
		styleName: 'font_family_open-sans', 
		styles: "font-family: 'Open Sans', sans-serif;",
		name: 'Open Sans'
	},
	{
		font: 'Vollkorn:400italic,700italic,400,700:latin', 
		styleName: 'font_family_vollkorn', 
		styles:  "font-family: 'Vollkorn', serif;",
		name: 'Vollkorn'
	},
	{
		font: 'Gentium+Book+Basic:400,400italic,700,700italic:latin', 
		styleName: 'font_family_gentium-book-basic', 
		styles: "font-family: 'Gentium Book Basic', serif;",
		name: 'Gentium Book Basic'
	},
	{
		font: 'Old+Standard+TT:400,400italic,700:latin', 
		styleName: 'font_family_old-standard-tt', 
		styles: "font-family: 'Old Standard TT', serif;",
		name: 'Old Standard TT'
	}
];

var fontStylesToLoad = false || fontStylesToLoad;

//Manager
if(! fontStylesToLoad) {
  families = VBFont.getFontSpec(webFontData);
} else {
  families = VBFont.getFontSelectionSpec(webFontData, fontStylesToLoad);
}

if(families.length) {
  VBFont.loadFontFamilies(families);
  VBFont.appendFontStyles(webFontData);
}
