# Link International
Link International is Australia's leading motorcycle parts importer and distributor; this is the repository for linkint.com.au.

## Table of contents
1. [About](#about)
2. [Maintenance](#maintenance)
	1. [Updating pages and area formats](#updating-pages-and-area-formats)
	2. [Using SCSS to edit the styling](#using-SCSS-to-edit-the-styling)
3. [Key global areas](#key-global-areas)
	1. [Navigation](#navigation)
		1. [Top Bar](#top-bar)
		2. [Products drop down](#products-drop-down)
		3. [Mobile Nav](#mobile-nav)
		4. [Side bar](#side-bar)





## About
The Link site is created using:
* [TOTECS CMS](http://www.totecs.com/index_page.html)
* [Foundation 5](http://foundation.zurb.com/sites/docs/v/5.5.3/) with [SCSS](http://sass-lang.com/)
* [Font Awesome](http://fontawesome.io/icons/)
* [Slick Image Slider](http://kenwheeler.github.io/slick/)
* [DataTables](https://datatables.net/)
* [Stacktable](http://johnpolacek.github.io/stacktable.js/)


## Maintenance

### Updating pages and area formats
The **.html** files under **/pages/** are snippets. These files do not get displayed directly in the browser. The snippets are pasted into the TOTECS CMS page areas or format libraries.

### Using SCSS to edit the styling
This project uses **.scss** files which can be compiled into the **.css** file using [Grunt](http://gruntjs.com/getting-started). A Grunt extension should be available for most major text editors and makes compiling the CSS a one button task.

- **_Never_** edit the **app.css** file
- Make all styling changes in the **app.scss** file
- Foundation core styling changes can be made in the **_settings.scss** file

## Key global areas

### Navigation

#### Top bar

Official top bar documentation can be found on the [here](http://foundation.zurb.com/sites/docs/v/5.5.3/components/topbar.html) on the Foundation docs.

Coming soon

#### Products Drop Down

__Files:__ *Global Products Drop Down.html*, *Global Nav.html*

The Products Drop Down navigation is *only used on medium and up screens*, it is not used for mobile devices. When editing the Products Drop Down area, the Global Nav area *must* also be edited for the mobile styles.


Open __*Global Products Drop Down.html*__

Basic HTML for each brand option:

```html
<li><a href="BRAND-PAGE-URL"><img alt="" src="BRAND-LOGO-IMAGE"></a></li>
```

- To remove a brand, delete the corresponding list item.
- To add a brand, add a list item using the HTML above, where ```BRAND-PAGE-URL``` is replaced with the URL of the brand page, and ```BRAND-LOGO-IMAGE``` is replaced with the URL of the logo.
- The logo image must be a *PNG* file with the dimensions *250* x *130*.

The changes made in the Global Product Drop Down area must also be made in the Global Nav area. Use the same methods listed in the [Top Bar](#top-bar) section to edit the *mobile* navigation.

#### Mobile nav

Open __*Global Nav.html*__

Basic HTML for Top Bar navigation:

```<li><a href="BRAND-PAGE-URL">BRAND-NAME</a></li>```

- To remove a brand, delete the corresponding list item.
- To add a brand, add a list item using the HTML above, where ```BRAND-PAGE-URL``` is replaced with the URL of the brand page, and ```BRAND-NAME``` is replaced with the name of the brand.


#### Side bar

__File:__ *Global Sidebar.html*

Basic HTML for the side bar navigation, this example is using the **JT Sprockets** page:

```html
<li class="heading jt-nav">JT Sprockets</li>
<li class="jt-nav"><a href="http://www.linkint.com.au/jt-sprockets.html">About</a></li>
``` 

To add content to the side bar, add a list item with the class ```CLASSNAME-nav```, where ```CLASSNAME``` is replaced with an abbreviated name of the page that the side bar belongs to.

Add the class ```heading``` to the list item that contains the heading.

Make all changes to the side bar in the **_Global Product Side Nav.html_** file, then paste the entire HTML into the **_Global Product Side Nav_** global area.

To get a specific side nav to appear on a page, add this code to the pages local side bar area, replacing ```CLASSNAME``` with the class of the side bar needed for that page.

```html
<style type="text/css">
	.CLASSNAME-nav {
		display: list-item!important;
	}
</style>
```
