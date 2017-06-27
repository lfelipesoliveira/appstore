var horizontal = require('viewability/horizontal');
var vertical = require('viewability/vertical');

var objCache = [];

var currPush = [];

setTimeout(getItems, 1000);
// todo: incluir banners alem dos produtos
/*function getBanners(){
	var banners = $('a.js-banner')
	banners.each(function(){
		if () {}



	})



}
*/
function getItems(){ // Para Itens da Store
	
	var $items = $('a.js-product-item');
	$items.each(function(){
		if (!~objCache.indexOf(this) && isVisible(this)) {
			currPush.push(this);
			objCache.push(this);
		}
	});
	if(currPush.length){

		var produtos = currPush.map(function(item){
			return {
				name: name(item),
				list: item.dataset.productList,
				brand:'Vivo App Store',
				category: category(item),
				position: item.dataset.productIndex
			}
		});

		dataLayerGauge.push({
			event:'productImpressions',
			ecommerce: {
				impressions: produtos
			}
		});
		currPush = [];	
	}

	setTimeout(getItems, 1000);
	
}

function isVisible(el){
	return vertical(el).value * horizontal(el).value > 0.5;
}

function name(product) {
	return product.dataset.productList == 'vivo-sounds' ?
	$(product).children('span').attr('title') :
	product.dataset.productName;
}

function category(product) {
	return product.dataset.productList == 'vivo-sounds' ? 'vivo-sounds' : product.dataset.productCategory
}