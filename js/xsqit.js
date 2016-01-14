/* I BELIEVE THIS IS DEPRECATED? */

TOTECS.retail.loader.loadFunction(function(){
	/* Model Search Listing function*/
	var modelSearchListing = function(type, args, me){
		stylize();
		listDividers();
		TOTECS.retail.fs.removeAreaEventListener(1);
	};
	
	/* Product Search Results Listing */
	var productSearchResultsListing = function(type, args, me){
		stylize();
		TOTECS.retail.fs.removeAreaEventListener(2);
	};
	
	/* Wishlist/Basket Summary */
	var basketProductsListing = function(type, args, me){
		stylize();
		TOTECS.retail.fs.removeAreaEventListener(3);
	};
	
	/* Make Model search datatable */
	var initDataTable = function(type, args, me){
		$('#fitment-table').dataTable( {
				"lengthChange": false
		} );
		TOTECS.retail.fs.removeAreaEventListener(4);
	};
	
	/**
	* TOTECS.retail.fs.addAreaEventListener(webPageAreaID, eventType, eventListenerFunction, eventID, arguments)
	* creates an event listener to a given area or all areas on the web page. The event's listener function is called based when the relevent event type is fired by the area
	* @method addAreaEventListener
	* @param webPageAreaID{int}					ID of the web page area to add a listener to, set null to apply to all areas
	* @param eventType{int}						ID of the web page area event type
	* @param eventListenerFunction{function}	function to call when the area triggers the given event
	* @param eventID{string}					unique identifier to give to the listener
	* @param arguments{object}					any object to pass to the event listener function containing any relevant variables
	* @return boolean							true if the listener was added to one or more
	*/

	/* Model Search Listing event listener */
	TOTECS.retail.fs.addAreaEventListener(6726, TOTECS.retail.fs.WEBPAGE_AREA_EVENT_TYPES.AFTER_AREA_RELOAD, modelSearchListing, 1, '');
	/* Product Search Results Listing event listener */
	TOTECS.retail.fs.addAreaEventListener(7192, TOTECS.retail.fs.WEBPAGE_AREA_EVENT_TYPES.AFTER_AREA_RELOAD, productSearchResultsListing, 2, '');
	/* Wishlist/Basket Summary event listener */
	TOTECS.retail.fs.addAreaEventListener(7176, TOTECS.retail.fs.WEBPAGE_AREA_EVENT_TYPES.AFTER_AREA_RELOAD, basketProductsListing, 3, '');
	/* Make Model search datatable */
	TOTECS.retail.fs.addAreaEventListener(8494, TOTECS.retail.fs.WEBPAGE_AREA_EVENT_TYPES.AFTER_AREA_RELOAD, initDataTable, 4, '');
});

function stylize() {
	/* Forces jQuery framework to apply styles to elements */
	/* .content is the class of the div that holds the page content elements */
	$('.content').trigger('create');
}

function listDividers() {
	/* Adds list divider elements */
	$("#MakeModelList").listview({
		autodividers: true,
		autodividersSelector: function (li) {
			var x = li.attr('make');
			return x;
		}
	}).listview('refresh');
}

/* Depending on new fitment method, this may need to be deleted */
/* FITMENT TABLE SHOW BIKE FUNCTION */
//function showBikes(selectedVal) {
//	if ($("." + selectedVal).css("display") == "none") {
//		$("#fitmentTbl tr").hide();
//		$("#fitmentTbl tr.MainHeader").show();
//		$("#fitmentTbl tr.dropdown").show();
//		$("." + selectedVal).show();
//	} else {	
//		$("." + selectedVal).toggle();
//	}
//}