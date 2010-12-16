fluid_1_1=fluid_1_1||{};(function($,fluid){var insertAnchor=function(el){var a=$("<a name='"+el.text()+"' />",el[0].ownerDocument);el.before(a)};var createNode=function(id){var node={ID:id,children:[]};return node};var createTree=function(headings,levels){var generateTree=function(nodes,items,level){if(items.length===0){return }var item=items[0];if(level===item.level){nodes[nodes.length-1].push(item.leaf);items.shift();return generateTree(nodes,items,level)}if(level<item.level){var prefix=level>-1?"level"+(level+1)+":":"";var postfix=level===-1?"s:":"s";var name=prefix+"level"+(level+2)+postfix;var myNode=createNode(name);nodes[nodes.length-1].push(myNode);nodes.push(myNode.children);return generateTree(nodes,items,level+1)}if(level>item.level){nodes.pop();return generateTree(nodes,items,level-1)}};var tree={children:[]};var items=fluid.transform(headings,function(heading){var level=$.inArray(heading.tagName,levels);var text=$(heading).text();return{level:level,leaf:{ID:"level"+(level+1)+":item",children:[{ID:"link",linktext:text,target:"#"+text}]}}});generateTree([tree.children],items,-1);return tree};var buildTOC=function(container,headings,levels,templateURL,afterRender){headings.each(function(i,el){insertAnchor($(el))});var resources={toc:{href:templateURL}};fluid.fetchResources(resources,function(){var templates=fluid.parseTemplates(resources,["toc"],{});var node=$("<div></div>",container[0].ownerDocument);fluid.reRender(templates,node,createTree(headings,levels),{});container.prepend(node);afterRender.fire(node)})};fluid.tableOfContents=function(container,options){var that=fluid.initView("fluid.tableOfContents",container,options);that.events.afterRender.addListener(function(node){that.tocNode=$(node)});buildTOC(that.container,that.locate("headings"),that.options.levels,that.options.templateUrl,that.events.afterRender);that.hide=function(){if(that.tocNode){that.tocNode.hide()}};that.show=function(){if(that.tocNode){that.tocNode.show()}};return that};fluid.defaults("fluid.tableOfContents",{selectors:{headings:":header"},events:{afterRender:null},templateUrl:"../html/TableOfContents.html",levels:["H1","H2","H3","H4","H5","H6"]})})(jQuery,fluid_1_1);