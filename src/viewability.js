import horizontal from "viewability/horizontal";
import vertical from "viewability/vertical";

let objCache = [];

let currPush = [];

setTimeout(getItems, 1000);
// todo: incluir banners alem dos produtos

function getItems(){ // Para Itens da Store
	
	const $items = $('a.js-product-item, a.js-banner');
	$items.each(function(){
		if (!~objCache.indexOf(this) && isVisible(this)) {
			currPush.push(this);
			objCache.push(this);
		}
	});

	if(currPush.length){
		const produtos = currPush
      .filter(function(item){return $(item).is('.js-product-item')})
      .map(function (item) {
        return {
          name: productName(item),
          list: item.dataset.productList,
          brand: 'Vivo App Store',
          category: productCategory(item),
          position: item.dataset.productIndex
        }
      });

    const banners = currPush
      .filter(function(item){return $(item).is('.js-banner')
				&& (!$(item).is('.js-carousel-item') || parseInt(item.dataset['carouselIndex']) > parseInt(item.dataset['slickIndex']))})
      .map(function (item) {
        return {
          'id': item.dataset['itemid'],
          'name': item.dataset['productName'],
          'creative': item.dataset['bannerName'],
          'position': '{{DL - page.type}}:'+
					($(item).is('.js-carousel-item ') ? 'carousel'+':'+item.dataset['carouselIndex'] : 'banner')
        }
      });

		dataLayerGauge.push({
			event:'productBannerImpressions',
			ecommerce: {
        impressions: produtos,
        promoView: {
          'promotions': banners
        }
      }
		});
		currPush = [];	
	}

	setTimeout(getItems, 1000);
	
}

function isVisible(el){
	return vertical(el).value * horizontal(el).value > 0.5;
}

function productName(product) {
	return product.dataset.productList === 'vivo-sounds' ?
	$(product).children('span').attr('title') :
	product.dataset.productName;
}

function productCategory(product) {
	return product.dataset.productList === 'vivo-sounds' ? 'vivo-sounds' : product.dataset.productCategory
}