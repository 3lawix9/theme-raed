"use strict";(self.webpackChunkTheme_One=self.webpackChunkTheme_One||[]).push([[469],{469:(s,e,t)=>{t.r(e),t.d(e,{salla_search_modal:()=>h});var a=t(48);const h=class{constructor(s){(0,a.r)(this,s),this.fetchStatus="",this.showModal=!1,this.searchPlaceholder="Search here ...",this.noResultsText="There are no results at the moment",this.handleChange=s=>{this.searchTerm=s.target.value,this.fetchStatus="loading",this.showResult=!1,this.results=[],this.searchTerm.length>2&&window.salla.search.api.search(this.searchTerm).then((s=>s)).then((s=>{console.log("response",s),this.fetchStatus="idle",this.results=s.results,this.showResult=!0,this.results.length<1&&(this.fetchStatus="error")})).catch((s=>{this.showResult=!0,this.fetchStatus="error",console.log(s)}))},this.openSearch=()=>{this.searchTerm="",this.fetchStatus="",this.results=[],this.showModal=!0,window.scrollTo(0,0),document.getElementsByTagName("html")[0].style.position="fixed",document.getElementsByTagName("html")[0].style.overflowY="scroll"},this.closeSearch=()=>{this.searchTerm="",this.fetchStatus="",this.results=[],document.getElementsByTagName("html")[0].style.position="static",document.getElementsByTagName("html")[0].style.overflowY="auto",this.showModal=!1}}componentWillLoad(){this.hasSearchIconSlot=!!this.hostElement.querySelector('[slot="search-icon"]'),this.hasProductTemplateSlot=!!this.hostElement.querySelector('[slot="product-template"]'),this.hasProductTemplateSlot&&(this.productTemplateHtml=this.hostElement.querySelector('[slot="product-template"]').innerHTML)}getProduct(s){var e,t;if(this.hasProductTemplateSlot){let t=this.productTemplateHtml.replace("{title}",s.title).replace("{price}",null===(e=s.price)||void 0===e?void 0:e.after).replace("{url}",s.url).replace("{thumb}",s.thumb);return(0,a.h)("div",{class:"s-search-modal-product",innerHTML:t})}return(0,a.h)("div",{class:"s-search-modal-product"},(0,a.h)("a",{target:"_blank",href:s.url,class:"s-search-modal-product-image-container"},(0,a.h)("img",{class:"s-search-modal-product-image",src:s.thumb})),(0,a.h)("div",{class:"s-search-modal-product-details"},(0,a.h)("div",{class:"s-search-modal-product-title"},s.title),(0,a.h)("div",{class:"s-search-modal-product-price"},null===(t=s.price)||void 0===t?void 0:t.after)))}render(){return(0,a.h)(a.e,{class:"s-search-modal"},(0,a.h)("button",{type:"button",onClick:this.openSearch,class:"s-search-modal-search-button-icon"},this.hasSearchIconSlot?(0,a.h)("slot",{name:"search-icon"}):(0,a.h)("i",{class:"sicon-search font-bold"})),this.showModal&&(0,a.h)("div",{class:"s-search-modal-container",style:{backgroundColor:"rgba(0,0,0,0.5)"}},(0,a.h)("div",{class:"s-search-modal-wrapper",onClick:this.closeSearch},(0,a.h)("div",{class:"s-search-modal-inner",onClick:s=>{s.stopPropagation()}},(0,a.h)("div",{class:"s-search-modal-search-box-container"},(0,a.h)("div",{class:this.showResult?"s-search-modal-search-box-inner-open":"s-search-modal-search-box-inner"},(0,a.h)("input",{class:"s-search-modal-input",type:"text",placeholder:this.searchPlaceholder,value:this.searchTerm,onInput:s=>this.handleChange(s)}),"loading"!=this.fetchStatus?(0,a.h)("button",{class:"s-search-modal-search-icon"},(0,a.h)("i",{class:"sicon-search"})):(0,a.h)("span",{class:"s-search-modal-spinner"},(0,a.h)("span",{class:"s-search-modal-spinner-loader"})))),(0,a.h)("div",{class:"s-search-modal-search-results"},"error"===this.fetchStatus&&(0,a.h)("p",{class:"s-search-modal-no-results error p-4 text-sm text-gray-text"},this.noResultsText),this.results&&this.results.map((s=>this.getProduct(s))))))))}get hostElement(){return(0,a.g)(this)}}}}]);