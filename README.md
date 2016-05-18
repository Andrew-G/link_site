# Link International
Link International is Australia's leading motorcycle parts importer and distributor, this is the repository for linkint.com.au.

## Table of contents
1. [About](#about)
2. [Maintenance](#maintenance)
	1. Updating pages and area formats
	2. Using SCSS to edit the styling
3. [Key global areas](#areas)
	1. Navigation
		1. Side bar





## About <a name="about"></a>
The Link site is created using:
* [TOTECS CMS](http://www.totecs.com/index_page.html)
* [Foundation 5](http://foundation.zurb.com/sites/docs/v/5.5.3/) with [SCSS](http://sass-lang.com/)
* [Font Awesome](http://fontawesome.io/icons/)
* [Slick Image Slider](http://kenwheeler.github.io/slick/)
* [DataTables](https://datatables.net/)
* [Stacktable](http://johnpolacek.github.io/stacktable.js/)


## Maintenance <a name="maintenance"></a>

### Updating pages and area formats
The **.html** files under **/pages/** are snippets. These files do not get displayed directly in the browser. The snippets are pasted into the TOTECS CMS page areas or format libraries.

### Using SCSS to edit the styling
This project uses **.scss** files which can be compiled into the **.css** file using [Grunt](http://gruntjs.com/getting-started). A Grunt extension should be available for most major text editors and makes compiling the CSS a one button task.

- **_Never_** edit the **app.css** file
- Make all styling changes in the **app.scss** file
- Foundation core styling changes can be made in the **_settings.scss** file

## Key global areas <a name="areas"></a>

### Navigation

### Top bar

Coming soon.

#### Side bar

Here is the basic HTML for the side bar navigation, this example is using the **JT Sprockets** page:

```html
<li class="heading jt-nav">JT Sprockets</li>
<li class="jt-nav"><a href="http://www.linkint.com.au/jt-sprockets.html">About</a></li>
``` 

To add content to the side bar, add a list element with the class ```CLASSNAME-nav```, where ```CLASSNAME``` is replaced with the name of the page that the side bar belongs to.

Add the class ```heading``` to the list element that contains the heading.

Make all changes to the side bar in the **_Global Product Side Nav.html_** file, then paste the entire HTML into the **_Global Product Side Nav_** global area.

To get a specific side nav to appear on a page, add this code to the pages local side bar area, replacing ```CLASSNAME``` with the class of the side bar needed for that page.

```html
<style type="text/css">
	.CLASSNAME-nav {
		display: list-item!important;
	}
</style>
```
