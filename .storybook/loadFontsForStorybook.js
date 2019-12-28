const fontLinkId = 'storybook-font-link-tag';
export const loadFontsForStorybook = () => {
  if (!document.getElementById(fontLinkId)) {
    const fontLink = document.createElement('link');

    fontLink.id = fontLinkId;
    fontLink.href =
      'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i&display=swap';
    fontLink.rel = 'stylesheet';

    document.head.appendChild(fontLink);
  }
};
