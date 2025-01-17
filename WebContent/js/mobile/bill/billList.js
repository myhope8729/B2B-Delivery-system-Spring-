var searchForm = null;
var gridObj = null;
jQuery(document).ready(function(){
	
	var lastSel = 0;
	gridObj = $("#grid");
	var ajaxUrl = gridObj.attr("ajaxUrl");
	searchForm = $( gridObj.attr("searchForm") );
	
	searchForm.submit(function(){
		reloadGridByAjax(gridObj);
		return false;
	});
	
	CommonGrid.init('grid', {
		url: ajaxUrl,
		postData: searchForm.serialize(),
		datatype: "json",
		colNames:['单据类型', '单据编号', '订货方/供货方', '金额(元)', '单据状态', '制单日期', '制单人'],
		colModel:[ 
		          {name:'billTypeName', index:'bill_type',		sortable:true,  align:'center'	},
		          {name:'billId',  		index:'bill_id',		key:true,		sortable:true,	align:'center'	},
			      {name:'hostUserName', index:'host_user_name', sortable:false,	align:'left', 
			    	  formatter:function(cellvalue, options, rowObj){
			    			  return rowObj.custUserName + "<br/>" + rowObj.hostUserName;
			    	  }
			      },
			      {name:'total2',  		index:'total2',			sortable:false,	align:'right'},
			      {name:'stateName',  	index:'state',			sortable:false,	align:'center'},
			      {name:'createDate', 	index:'create_date', 	width:130,		sortable:true,	align:'left'  },
			      {name:'inputorName',	index:'inputor_name',	sortable:false, align:'center'}			      
			    ],
		pager: '#gridpager',
		sortname: gridPager.sortname || 'createDate',
		sortorder:'desc',
		radioOption:true,
		rownumbers:true
	});
	gridObj.jqGrid('navGrid','#gridpager',{edit:false,add:false,del:false,search:false, position:'right'});
	
	gridObj.on("jqGridSelectRow", function(event, id, orgEvent) {
		window.location.href = selectActionUrl + "&billId=" + id;
	});
	
	$(".btnReset").click(function(e){
		searchForm.submit();
	});
});

