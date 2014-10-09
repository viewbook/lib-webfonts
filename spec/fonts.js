describe("Google Webfont loader", function () {
  var webfonts = [
    {font: 'Dosis:400,700:latin', styleName: 'font_family_dosis', family: 'Dosis'},
    { font: 'Lato:400,700,400italic,700italic:latin', styleName: 'font_family_lato', family: 'Lato'},
    { font: 'Arvo:400,700,400italic,700italic:latin', styleName: 'font_family_arvo', family: 'Arvo'}
  ];

  it("can select webfonts", function () {
    expect(VBFont.getFontSpec(webfonts)).toEqual([
      'Dosis:400,700:latin',
      'Lato:400,700,400italic,700italic:latin',
      'Arvo:400,700,400italic,700italic:latin'
    ]);

    expect(VBFont.getFontSelectionSpec(webfonts, ['font_family_lato'])).toEqual(['Lato:400,700,400italic,700italic:latin']);
    expect(VBFont.getFontSelectionSpec(webfonts, [
      "font_family_lucida",
      "font_family_arvo",
      "title_font_family_lucida",
      "menu_font_family_georgia"
    ])).toEqual(['Arvo:400,700,400italic,700italic:latin']);


    expect(VBFont.getFontSelectionSpec(webfonts)).toEqual([]);

  });
});
