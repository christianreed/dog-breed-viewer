## Dog viewer

This was built off of Create React App.

It's live at: https://d159h0wpzqgh4x.cloudfront.net

## Interface

This is pretty minimal. I didn't really go overboard with all the tags, or making React fully accessible, but it gets the job done on desktop and mobile in Chrome.

I liked the big images, but the aspect ratio isn't always right. Tap the image to see the whole thing.

Note that stroking text isn't universally supported, and is actually kind of janky, so not a good production choice.

## Code

I like breaking out the styling for each breakpoint, as I feel it's an easier way to work and maintain. I also like working with a library of mixins, which are documented in the `sassdoc/` folder. Usually I would also abstract out all the variables, but in this case it felt like overkill.

I'm a fan of TypeScript, but didn't use it here, as I'm still figuring out best practices in React.

Test coverage isn't all there, but I threw in a few on a key method in the home container.